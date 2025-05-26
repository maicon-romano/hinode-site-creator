import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface SiteData {
  id?: string;
  clientId: string;
  clientName: string;
  siteName: string;
  headline: string;
  description: string;
  videoUrl: string;
  whatsappNumber: string;
  logoUrl: string;
  themeColor: string;
  createdAt: Date;
}

interface SiteForm {
  clientId: string;
  clientName: string;
  siteName: string;
  headline: string;
  description: string;
  videoUrl: string;
  whatsappNumber: string;
  logoUrl: string;
  themeColor: string;
}

const ManageSites = () => {
  const { userData } = useAuth();
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<SiteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SiteForm>({
    defaultValues: {
      clientId: '',
      clientName: '',
      siteName: '',
      headline: '',
      description: '',
      videoUrl: '',
      whatsappNumber: '',
      logoUrl: '',
      themeColor: '#ff6b35'
    }
  });

  const fetchSites = async () => {
    try {
      setError(null);
      console.log('Tentando carregar sites...');
      
      const sitesCollection = collection(db, 'sites');
      const sitesSnapshot = await getDocs(sitesCollection);
      const sitesList = sitesSnapshot.docs.map(doc => {
        const data = {
          id: doc.id,
          ...doc.data()
        } as SiteData;
        console.log('Site carregado:', data);
        return data;
      });
      
      setSites(sitesList);
      console.log('Total de sites carregados:', sitesList.length);
    } catch (error: any) {
      console.error('Erro ao carregar sites:', error);
      
      let errorMessage = "Não foi possível carregar os sites";
      
      if (error.code === 'permission-denied') {
        errorMessage = "Permissão negada. Verifique as regras de segurança do Firestore.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Serviço temporariamente indisponível. Tente novamente.";
      }
      
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const onSubmit = async (data: SiteForm) => {
    try {
      if (editingSite) {
        // Atualizar site existente
        await updateDoc(doc(db, 'sites', editingSite.id!), {
          ...data,
          updatedAt: new Date()
        });
        toast({
          title: "Sucesso",
          description: "Site atualizado com sucesso!"
        });
      } else {
        // Criar novo site
        await addDoc(collection(db, 'sites'), {
          ...data,
          createdAt: new Date()
        });
        toast({
          title: "Sucesso",
          description: "Site criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      setEditingSite(null);
      form.reset();
      fetchSites();
    } catch (error) {
      console.error('Erro ao salvar site:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o site",
        variant: "destructive"
      });
    }
  };

  const handleEditSite = (site: SiteData) => {
    setEditingSite(site);
    form.reset({
      clientId: site.clientId,
      clientName: site.clientName,
      siteName: site.siteName,
      headline: site.headline,
      description: site.description,
      videoUrl: site.videoUrl,
      whatsappNumber: site.whatsappNumber,
      logoUrl: site.logoUrl,
      themeColor: site.themeColor
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSite = async (siteId: string) => {
    if (confirm('Tem certeza que deseja excluir este site?')) {
      try {
        await deleteDoc(doc(db, 'sites', siteId));
        toast({
          title: "Sucesso",
          description: "Site excluído com sucesso!"
        });
        fetchSites();
      } catch (error) {
        console.error('Erro ao excluir site:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o site",
          variant: "destructive"
        });
      }
    }
  };

  const openCreateDialog = () => {
    setEditingSite(null);
    form.reset();
    setIsDialogOpen(true);
  };

  if (userData?.tipo !== 'admin') {
    return <div>Acesso negado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciar Sites</h1>
              <p className="text-gray-600">Criar, editar e excluir sites dos clientes</p>
            </div>
          </div>
          
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Site
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSite ? 'Editar Site' : 'Criar Novo Site'}
              </DialogTitle>
              <DialogDescription>
                {editingSite ? 'Edite as informações do site.' : 'Preencha os dados para criar um novo site.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientId"
                    rules={{ required: "ID do cliente é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="cliente123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientName"
                    rules={{ required: "Nome do cliente é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do Cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="siteName"
                  rules={{ required: "Nome do site é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Site</FormLabel>
                      <FormControl>
                        <Input placeholder="Site do Cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="headline"
                  rules={{ required: "Headline é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Transforme sua vida com Hinode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <textarea 
                          className="w-full p-2 border rounded-md min-h-[100px]" 
                          placeholder="Descrição do negócio..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Vídeo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/embed/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    rules={{ required: "WhatsApp é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="5511999999999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="themeColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor do Tema</FormLabel>
                        <FormControl>
                          <Input type="color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Logo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com/logo.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {editingSite ? 'Atualizar Site' : 'Criar Site'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Sites</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os sites dos clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchSites} variant="outline">
                  Tentar Novamente
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Site</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>ID do Cliente</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="font-medium">{site.siteName}</TableCell>
                      <TableCell>{site.clientName}</TableCell>
                      <TableCell>{site.clientId}</TableCell>
                      <TableCell>{site.whatsappNumber}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/cliente/${site.clientId}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSite(site)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSite(site.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageSites;
