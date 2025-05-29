import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LogoUpload } from './LogoUpload';
import { DynamicSiteRenderer } from '../templates/DynamicSiteRenderer';
import { 
  Eye, 
  Plus, 
  Trash2, 
  Move, 
  Settings, 
  Palette, 
  Layout, 
  Save,
  X
} from 'lucide-react';

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
  [key: string]: any;
}

interface DynamicSiteEditorProps {
  initialData?: SiteData;
  onSubmit: (data: any) => Promise<void>;
  isEditing?: boolean;
}

const MODELS_CONFIG = {
  'representante-hinode': {
    name: 'Representante Hinode',
    defaultSections: ['hero-hinode', 'bio', 'sobre-hinode', 'produtos-destaque', 'contato', 'rodape-hinode'],
    sections: [
      { id: 'hero-hinode', name: 'Hero' },
      { id: 'bio', name: 'Biografia' },
      { id: 'sobre-hinode', name: 'Sobre Hinode' },
      { id: 'produtos-destaque', name: 'Produtos em Destaque' },
      { id: 'contato', name: 'Contato' },
      { id: 'rodape-hinode', name: 'Rodapé' },
    ],
  },
  'site-institucional': {
    name: 'Site Institucional',
    defaultSections: ['hero', 'sobre-nos', 'servicos', 'contato', 'rodape'],
    sections: [
      { id: 'hero', name: 'Hero' },
      { id: 'sobre-nos', name: 'Sobre Nós' },
      { id: 'servicos', name: 'Serviços' },
      { id: 'contato', name: 'Contato' },
      { id: 'rodape', name: 'Rodapé' },
    ],
  },
  'landing-page-vendas': {
    name: 'Landing Page de Vendas',
    defaultSections: ['hero', 'vantagens', 'produtos', 'depoimentos', 'contato'],
    sections: [
      { id: 'hero', name: 'Hero' },
      { id: 'vantagens', name: 'Vantagens' },
      { id: 'produtos', name: 'Produtos' },
      { id: 'depoimentos', name: 'Depoimentos' },
      { id: 'contato', name: 'Contato' },
    ],
  },
  'portfolio-profissional': {
    name: 'Portfólio Profissional',
    defaultSections: ['hero', 'sobre', 'projetos', 'contato', 'rodape'],
    sections: [
      { id: 'hero', name: 'Hero' },
      { id: 'sobre', name: 'Sobre' },
      { id: 'projetos', name: 'Projetos' },
      { id: 'contato', name: 'Contato' },
      { id: 'rodape', name: 'Rodapé' },
    ],
  },
};

export const DynamicSiteEditor: React.FC<DynamicSiteEditorProps> = ({
  initialData,
  onSubmit,
  isEditing = false
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    initialData?.templateId || initialData?.modelId || 'representante-hinode'
  );
  const [activeSections, setActiveSections] = useState<string[]>(
    initialData?.activeSections || MODELS_CONFIG[selectedTemplate]?.defaultSections || []
  );
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const availableSections = MODELS_CONFIG[selectedTemplate]?.sections || [];

  const form = useForm<any>({
    defaultValues: {
      clientId: initialData?.clientId || '',
      clientName: initialData?.clientName || '',
      nomeDoSite: initialData?.nomeDoSite || '',
      logoPath: initialData?.logoPath || '',
      cores: {
        principal: initialData?.cores?.principal || '#0066cc',
        fundo: initialData?.cores?.fundo || '#ffffff',
        destaque: initialData?.cores?.destaque || '#ff6b35',
        texto: initialData?.cores?.texto || '#333333',
        degradeHero: {
          inicio: initialData?.cores?.degradeHero?.inicio || '#0067c7',
          fim: initialData?.cores?.degradeHero?.fim || '#00ffcc'
        }
      },
      // Inicializar dados das seções
      ...initialData
    }
  });

  useEffect(() => {
    // Atualizar activeSections com base no template selecionado
    setActiveSections(MODELS_CONFIG[selectedTemplate]?.defaultSections || []);
    
    // Resetar os valores do formulário para as seções padrão
    const defaultSectionValues = {};
    MODELS_CONFIG[selectedTemplate]?.sections?.forEach(section => {
      defaultSectionValues[section.id] = {}; // Ou valores padrão específicos
    });
    form.reset({
      ...form.getValues(),
      ...defaultSectionValues
    });
  }, [selectedTemplate, form]);

  const handleShowPreview = () => {
    const formData = form.getValues();
    
    // Coletar dados das seções dinamicamente
    const sectionData = {};
    activeSections.forEach((section) => {
      const sectionValues = form.getValues(section);
      if (sectionValues && Object.keys(sectionValues).length > 0) {
        sectionData[section] = sectionValues;
      }
    });

    const completeData = {
      ...formData,
      templateId: selectedTemplate,
      modelId: selectedTemplate,
      activeSections,
      sectionsOrder: activeSections,
      ...sectionData
    };

    console.log('Preview data completo:', completeData);
    setPreviewData(completeData);
    setShowPreview(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      console.log('Dados do formulário antes da coleta:', data);
      
      // Coletar dados das seções dinamicamente
      const sectionData = {};
      activeSections.forEach((section) => {
        const sectionValues = form.getValues(section);
        console.log(`Dados da seção ${section}:`, sectionValues);
        
        if (sectionValues && Object.keys(sectionValues).length > 0) {
          sectionData[section] = sectionValues;
        } else {
          // Se não há dados específicos, criar objeto vazio para manter a estrutura
          sectionData[section] = {};
        }
      });

      // Montar payload final
      const payload = {
        clientId: data.clientId,
        clientName: data.clientName,
        nomeDoSite: data.nomeDoSite,
        logoPath: data.logoPath,
        templateId: selectedTemplate,
        modelId: selectedTemplate,
        cores: data.cores,
        activeSections,
        sectionsOrder: activeSections,
        ...sectionData
      };

      console.log('Payload final para envio:', payload);
      console.log('Dados das seções coletados:', sectionData);

      await onSubmit(payload);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero-hinode':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Hero Hinode</CardTitle>
              <CardDescription>Configure a seção principal do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="hero-hinode.titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título principal do site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero-hinode.subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo do site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero-hinode.texto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Texto descritivo do site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero-hinode.video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vídeo (URL do YouTube)</FormLabel>
                    <FormControl>
                      <Input placeholder="URL do vídeo do YouTube" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero-hinode.botaoTexto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do Botão</FormLabel>
                    <FormControl>
                      <Input placeholder="Texto do botão" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero-hinode.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do WhatsApp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 'bio':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Biografia</CardTitle>
              <CardDescription>Informações sobre você</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bio.titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da biografia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio.subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo da biografia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio.texto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Texto da biografia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio.imagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="URL da imagem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio.experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiência</FormLabel>
                    <FormControl>
                      <Input placeholder="Tempo de experiência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 'sobre-hinode':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Sobre Hinode</CardTitle>
              <CardDescription>Informações sobre a empresa Hinode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="sobre-hinode.titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título sobre a Hinode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sobre-hinode.subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo sobre a Hinode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sobre-hinode.texto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Texto sobre a Hinode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sobre-hinode.imagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="URL da imagem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 'produtos-destaque':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Produtos em Destaque</CardTitle>
              <CardDescription>Destaque seus produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="produtos-destaque.titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título dos produtos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="produtos-destaque.subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo dos produtos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="produtos-destaque.descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição dos produtos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="produtos-destaque.lista"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lista de Produtos (um por linha)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Lista de produtos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 'contato':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Contato</CardTitle>
              <CardDescription>Informações de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contato.titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do contato" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contato.subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo do contato" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contato.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do WhatsApp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contato.telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="contato.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contato.endereco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>
        );

      case 'rodape-hinode':
        return (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Rodapé</CardTitle>
              <CardDescription>Texto do rodapé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="rodape-hinode.texto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Texto do rodapé" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      default:
        return <div key={sectionId}>Seção não encontrada: {sectionId}</div>;
    }
  };

  const handleLogoChange = (logoPath: string) => {
    form.setValue('logoPath', logoPath);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {isEditing ? 'Editar Site' : 'Criar Novo Site'}
              </h2>
              <p className="text-gray-600">
                Configure seu site usando o modelo {selectedTemplate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleShowPreview}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                🔍 Ver Preview
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Site
              </Button>
            </div>
          </div>

          {/* Configurações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Básicas
              </CardTitle>
              <CardDescription>
                Defina as configurações gerais do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="ID único do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="nomeDoSite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Site</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LogoUpload
                clientId={form.getValues('clientId')}
                currentLogo={form.getValues('logoPath')}
                onLogoChange={handleLogoChange}
              />
            </CardContent>
          </Card>

          {/* Configurações de Cores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configurações de Cores
              </CardTitle>
              <CardDescription>
                Personalize as cores do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="cores.principal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor Principal</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#0066cc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cores.fundo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor de Fundo</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#ffffff" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cores.destaque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor de Destaque</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#ff6b35" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cores.texto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor do Texto</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#333333" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cores.degradeHero.inicio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degrade Hero Início</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#0067c7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cores.degradeHero.fim"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degrade Hero Fim</FormLabel>
                      <FormControl>
                        <Input type="color" defaultValue="#00ffcc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Seções do Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Conteúdo das Seções
              </CardTitle>
              <CardDescription>
                Configure o conteúdo de cada seção do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeSections.map((sectionId) => renderSection(sectionId))}
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Preview do Site</DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[80vh]">
            {previewData && (
              <DynamicSiteRenderer 
                siteData={previewData} 
                isPreview={true} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
