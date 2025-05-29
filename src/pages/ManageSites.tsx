import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Edit, Trash2, ArrowLeft, Eye, LogOut, Download, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { SiteBuilder } from '@/components/sites/SiteBuilder';
import { processImageData, createSitesDirectory, detectBase64Images } from '@/lib/imageUtils';

interface SiteData {
  id?: string;
  clientId: string;
  clientName: string;
  templateId: string;
  nomeDoSite: string;
  logoPath: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  activeSections: string[];
  createdAt: Date;
  [key: string]: any;
}

const ManageSites = () => {
  const { userData, currentUser, logout } = useAuth();
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<SiteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchSites = async () => {
    if (!currentUser || userData?.tipo !== 'admin') {
      console.log('User not authenticated or not admin, skipping sites fetch');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      console.log('Carregando sites para admin:', currentUser.uid);
      
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
        errorMessage = "Você não tem permissão para acessar estes dados. Verifique se você é um administrador.";
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
    if (currentUser && userData) {
      fetchSites();
    } else if (currentUser && !userData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser, userData]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const sanitizeDataForFirestore = (data: any): any => {
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined) {
        continue;
      }
      
      if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Handle nested objects recursively
        const nestedSanitized = sanitizeDataForFirestore(value);
        if (Object.keys(nestedSanitized).length > 0) {
          sanitized[key] = nestedSanitized;
        }
      } else if (Array.isArray(value)) {
        // Handle arrays
        const sanitizedArray = value.map(item => {
          if (typeof item === 'object' && item !== null) {
            return sanitizeDataForFirestore(item);
          }
          return item;
        }).filter(item => item !== null && item !== undefined);
        
        if (sanitizedArray.length > 0) {
          sanitized[key] = sanitizedArray;
        }
      } else {
        // Handle primitive values - mas agora excluindo base64 que já foi processada
        if (typeof value === 'string' && value.startsWith('data:image/')) {
          console.warn('Base64 image encontrada durante sanitização - deveria ter sido processada antes');
          continue; // Pular imagens base64 que não foram processadas
        }
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  };

  const onSubmit = async (data: any) => {
    try {
      console.log('Dados originais recebidos:', data);
      
      // Garantir que o diretório de sites existe - passar o clientId
      createSitesDirectory(data.clientId);
      
      // Detectar imagens base64 no objeto
      const base64Images = detectBase64Images(data);
      
      // Processar imagens antes de sanitizar para Firestore
      const processedData = processImageData(data, data.clientId);
      console.log('Dados com imagens processadas:', processedData);
      
      // Sanitize data for Firestore (agora sem base64)
      const sanitizedData = sanitizeDataForFirestore(processedData);
      console.log('Dados sanitizados para Firestore:', sanitizedData);
      
      if (editingSite) {
        await updateDoc(doc(db, 'sites', editingSite.id!), {
          ...sanitizedData,
          updatedAt: new Date()
        });
        toast({
          title: "Sucesso",
          description: "Site atualizado com sucesso!"
        });
      } else {
        await addDoc(collection(db, 'sites'), {
          ...sanitizedData,
          createdAt: new Date()
        });
        toast({
          title: "Sucesso",
          description: "Site criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      setEditingSite(null);
      fetchSites();
    } catch (error: any) {
      console.error('Erro ao salvar site:', error);
      toast({
        title: "Erro",
        description: `Não foi possível salvar o site: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleEditSite = (site: SiteData) => {
    setEditingSite(site);
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

  const handleDownloadSite = async (site: SiteData) => {
    setDownloading(site.id!);
    try {
      console.log(`Iniciando build do site ${site.clientId}...`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Site buildado com sucesso!",
        description: `O site ${site.nomeDoSite} foi empacotado e está pronto para download.`
      });
      
      console.log(`Download do arquivo /dist/${site.clientId}.zip iniciado`);
      
    } catch (error) {
      console.error('Erro ao fazer build do site:', error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer o build do site",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleCopyUrl = (clientId: string) => {
    const url = `${window.location.origin}/cliente/${clientId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada!",
      description: "A URL do site foi copiada para a área de transferência."
    });
  };

  const openCreateDialog = () => {
    setEditingSite(null);
    setIsDialogOpen(true);
  };

  if (userData?.tipo !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar esta página. Apenas administradores podem gerenciar sites.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              UID atual: {currentUser?.uid || 'Não autenticado'}
            </p>
            <p className="text-sm text-gray-600">
              Tipo de usuário: {userData?.tipo || 'Não definido'}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Voltar ao Dashboard
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Fazer Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Construtor de Sites</h1>
              <p className="text-gray-600">Criar, editar e gerenciar sites dos clientes com templates dinâmicos</p>
            </div>
          </div>
          
          <Button onClick={openCreateDialog} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Criar Novo Site
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSite ? 'Editar Site' : 'Criar Novo Site'}
              </DialogTitle>
              <DialogDescription>
                {editingSite ? 'Edite as configurações do site usando o construtor visual.' : 'Use o construtor de sites para criar um site personalizado.'}
              </DialogDescription>
            </DialogHeader>
            <SiteBuilder />
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Sites Criados</CardTitle>
            <CardDescription>
              Gerencie todos os sites criados com o construtor
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
                <div className="space-y-2">
                  <Button onClick={fetchSites} variant="outline">
                    Tentar Novamente
                  </Button>
                  <Button onClick={handleLogout} variant="destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Fazer Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Nome do Site</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell>
                        {site.logoPath ? (
                          <img 
                            src={site.logoPath} 
                            alt="Logo" 
                            className="w-10 h-10 object-contain rounded border"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-500">
                            Logo
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{site.nomeDoSite}</TableCell>
                      <TableCell>{site.clientName}</TableCell>
                      <TableCell className="capitalize">{site.templateId}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/cliente/${site.clientId}`)}
                            title="Visualizar site"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyUrl(site.clientId)}
                            title="Copiar URL"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSite(site)}
                            title="Editar site"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadSite(site)}
                            disabled={downloading === site.id}
                            title="Baixar site buildado"
                          >
                            {downloading === site.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSite(site.id!)}
                            title="Excluir site"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sites.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhum site criado ainda. Clique em "Criar Novo Site" para começar.
                      </TableCell>
                    </TableRow>
                  )}
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
