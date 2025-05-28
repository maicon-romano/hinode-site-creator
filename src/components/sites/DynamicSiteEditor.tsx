
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Trash2, GripVertical, ChevronUp, ChevronDown, Plus, X, ExternalLink } from 'lucide-react';
import { getSiteModel, SiteModel } from '@/data/siteModels';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';
import { convertYouTubeToEmbed } from '@/lib/imageUtils';
import { debounce } from 'lodash';
import { useToast } from '@/hooks/use-toast';

interface DynamicSiteEditorProps {
  templateId: string;
  clientId: string;
  clientName: string;
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

export const DynamicSiteEditor: React.FC<DynamicSiteEditorProps> = ({
  templateId,
  clientId,
  clientName,
  initialData,
  onSubmit,
  isEditing = false
}) => {
  const { toast } = useToast();
  const siteModel = getSiteModel(templateId);
  const [activeSections, setActiveSections] = useState<Set<string>>(
    new Set(initialData?.activeSections || siteModel?.secoesPadrao.map(s => s.type) || [])
  );
  const [sectionsOrder, setSectionsOrder] = useState<string[]>(
    initialData?.sectionsOrder || siteModel?.secoesPadrao.map(s => s.type) || []
  );
  const [showPreview, setShowPreview] = useState(true);
  const [colors, setColors] = useState({
    principal: initialData?.cores?.principal || '#ff6b35',
    fundo: initialData?.cores?.fundo || '#ffffff',
    destaque: initialData?.cores?.destaque || '#0066cc',
    texto: initialData?.cores?.texto || '#333333',
    degradeHero: initialData?.cores?.degradeHero || {
      inicio: '#0067c7',
      fim: '#00ffcc'
    }
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useFormContext();

  // Debounced function para update do preview
  const debouncedUpdatePreview = useCallback(
    debounce((data) => {
      console.log('Atualizando preview com dados:', data);
      setPreviewData(data);
    }, 1500),
    []
  );

  // Watch campos essenciais
  const nomeDoSite = form.watch('nomeDoSite');
  const logoPath = form.watch('logoPath');

  // Update preview quando campos importantes mudam
  useEffect(() => {
    if (isInitialized) {
      const currentData = getCurrentSiteData();
      debouncedUpdatePreview(currentData);
    }
  }, [nomeDoSite, logoPath, activeSections, sectionsOrder]);

  // Função para atualizar cores imediatamente no preview
  const handleColorChange = useCallback((colorType: string, color: string | { inicio: string; fim: string }) => {
    let newColors = { ...colors };
    
    if (colorType === 'degradeHero') {
      newColors.degradeHero = typeof color === 'string' ? JSON.parse(color) : color;
    } else {
      newColors[colorType] = color as string;
    }
    
    setColors(newColors);
    form.setValue(`cores.${colorType}`, colorType === 'degradeHero' ? newColors.degradeHero : color);
    
    // Atualizar preview imediatamente para cores
    const currentData = getCurrentSiteData();
    setPreviewData({ ...currentData, cores: newColors });
  }, [form, colors]);

  useEffect(() => {
    if (!isInitialized && siteModel) {
      console.log('Inicializando formulário com dados:', { clientId, clientName, templateId, initialData });
      
      form.setValue('clientId', clientId);
      form.setValue('clientName', clientName);
      form.setValue('modelId', templateId);
      form.setValue('cores', colors);
      form.setValue('activeSections', Array.from(activeSections));
      form.setValue('sectionsOrder', sectionsOrder);
      
      // Set initial values for sections if editing
      if (initialData) {
        // Set basic fields
        if (initialData.nomeDoSite) {
          form.setValue('nomeDoSite', initialData.nomeDoSite);
        }
        if (initialData.logoPath) {
          form.setValue('logoPath', initialData.logoPath);
        }
        
        // Set section data
        Object.keys(initialData).forEach(key => {
          if (!['clientId', 'clientName', 'modelId', 'nomeDoSite', 'logoPath', 'cores', 'activeSections', 'sectionsOrder', 'layout'].includes(key)) {
            form.setValue(key, initialData[key]);
          }
        });
      }
      
      setIsInitialized(true);
    }
  }, [siteModel, form, clientId, clientName, templateId, initialData, colors, activeSections, sectionsOrder, isInitialized]);

  // Update sections when template changes
  useEffect(() => {
    if (siteModel && isInitialized) {
      const newSections = new Set(siteModel.secoesPadrao.map(s => s.type));
      const newOrder = siteModel.secoesPadrao.map(s => s.type);
      
      setActiveSections(newSections);
      setSectionsOrder(newOrder);
      
      form.setValue('activeSections', Array.from(newSections));
      form.setValue('sectionsOrder', newOrder);
      
      // Clear existing section data when changing template
      if (!isEditing) {
        newOrder.forEach(sectionType => {
          form.setValue(sectionType, {});
        });
      }
    }
  }, [templateId, siteModel, isInitialized, form, isEditing]);

  // Memoized section toggle handler
  const toggleSection = useCallback((sectionType: string) => {
    setActiveSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionType)) {
        newSet.delete(sectionType);
      } else {
        newSet.add(sectionType);
      }
      form.setValue('activeSections', Array.from(newSet));
      return newSet;
    });
  }, [form]);

  // Memoized move section handlers
  const moveSectionUp = useCallback((sectionType: string) => {
    setSectionsOrder(prev => {
      const currentIndex = prev.indexOf(sectionType);
      if (currentIndex > 0) {
        const newOrder = [...prev];
        [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
        form.setValue('sectionsOrder', newOrder);
        return newOrder;
      }
      return prev;
    });
  }, [form]);

  const moveSectionDown = useCallback((sectionType: string) => {
    setSectionsOrder(prev => {
      const currentIndex = prev.indexOf(sectionType);
      if (currentIndex < prev.length - 1) {
        const newOrder = [...prev];
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
        form.setValue('sectionsOrder', newOrder);
        return newOrder;
      }
      return prev;
    });
  }, [form]);

  if (!siteModel) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Modelo de site não encontrado: {templateId}</p>
      </div>
    );
  }

  // Mapeamento completo de campos específicos por modelo
  const getModelSpecificFields = (modelId: string) => {
    const fieldMappings = {
      'representante-hinode': {
        'hero-hinode': [
          { key: 'titulo', label: 'Título Principal', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'texto', label: 'Texto Descritivo', type: 'textarea' },
          { key: 'video', label: 'URL do Vídeo', type: 'url' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
          { key: 'imagem', label: 'Imagem de Fundo', type: 'image' }
        ],
        'sobre-hinode': [
          { key: 'titulo', label: 'Título da Seção', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'texto', label: 'Texto Sobre a Hinode', type: 'textarea' },
          { key: 'imagem', label: 'Logo/Imagem Hinode', type: 'image' }
        ],
        'biografia-representante': [
          { key: 'nome', label: 'Nome do Representante', type: 'text' },
          { key: 'titulo', label: 'Título/Cargo', type: 'text' },
          { key: 'texto', label: 'Biografia', type: 'textarea' },
          { key: 'foto', label: 'Foto do Representante', type: 'image' },
          { key: 'experiencia', label: 'Anos de Experiência', type: 'text' },
          { key: 'botaoTexto', label: 'Texto do Botão CTA', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' }
        ],
        'produtos-hinode': [
          { key: 'titulo', label: 'Título dos Produtos', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'produtos', label: 'Lista de Produtos (um por linha)', type: 'textarea' }
        ],
        'contato-hinode': [
          { key: 'titulo', label: 'Título do Contato', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'email', label: 'E-mail', type: 'email' }
        ],
        'rodape-hinode': [
          { key: 'texto', label: 'Texto do Rodapé', type: 'textarea' }
        ]
      },
      'site-institucional': {
        'banner-institucional': [
          { key: 'titulo', label: 'Título Principal', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'imagem', label: 'Imagem de Fundo', type: 'image' }
        ],
        'sobre': [
          { key: 'titulo', label: 'Título Sobre Nós', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'texto', label: 'Texto Sobre a Empresa', type: 'textarea' },
          { key: 'imagem', label: 'Imagem da Empresa', type: 'image' }
        ],
        'servicos': [
          { key: 'titulo', label: 'Título dos Serviços', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'lista', label: 'Lista de Serviços (um por linha)', type: 'textarea' }
        ],
        'equipe': [
          { key: 'titulo', label: 'Título da Equipe', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' }
        ],
        'contato': [
          { key: 'titulo', label: 'Título do Contato', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'email', label: 'E-mail', type: 'email' },
          { key: 'endereco', label: 'Endereço', type: 'textarea' }
        ]
      },
      'landing-page-vendas': {
        'hero': [
          { key: 'titulo', label: 'Título Principal', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'video', label: 'URL do Vídeo', type: 'url' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' }
        ],
        'beneficios': [
          { key: 'titulo', label: 'Título dos Benefícios', type: 'text' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'lista', label: 'Lista de Benefícios (um por linha)', type: 'textarea' }
        ],
        'produto': [
          { key: 'titulo', label: 'Nome do Produto', type: 'text' },
          { key: 'texto', label: 'Descrição do Produto', type: 'textarea' },
          { key: 'imagem', label: 'Imagem do Produto', type: 'image' },
          { key: 'preco', label: 'Preço', type: 'price' },
          { key: 'botaoTexto', label: 'Texto do Botão de Compra', type: 'text' },
          { key: 'botaoLink', label: 'Link de Compra', type: 'url' }
        ],
        'depoimentos': [
          { key: 'titulo', label: 'Título dos Depoimentos', type: 'text' }
        ],
        'contato': [
          { key: 'titulo', label: 'Título do Contato', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' }
        ]
      },
      'portfolio-profissional': {
        'bio': [
          { key: 'titulo', label: 'Seu Nome', type: 'text' },
          { key: 'subtitulo', label: 'Sua Profissão/Título', type: 'text' },
          { key: 'texto', label: 'Sua Biografia', type: 'textarea' },
          { key: 'imagem', label: 'Sua Foto', type: 'image' }
        ],
        'habilidades': [
          { key: 'titulo', label: 'Título das Habilidades', type: 'text' },
          { key: 'lista', label: 'Lista de Habilidades (uma por linha)', type: 'textarea' }
        ],
        'projetos': [
          { key: 'titulo', label: 'Título dos Projetos', type: 'text' }
        ],
        'contato': [
          { key: 'titulo', label: 'Título do Contato', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
          { key: 'email', label: 'E-mail', type: 'email' }
        ]
      }
    };

    return fieldMappings[modelId] || {};
  };

  const renderSectionField = (field: any, sectionType: string) => {
    const fieldName = `${sectionType}.${field.key}`;

    switch (field.type) {
      case 'textarea':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Digite ${field.label.toLowerCase()}`}
                    className="min-h-[100px]"
                    {...formField}
                    value={formField.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'url':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com"
                    {...formField}
                    value={formField.value || ''}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value && (value.includes('youtube.com') || value.includes('youtu.be'))) {
                        const convertedUrl = convertYouTubeToEmbed(value);
                        formField.onChange(convertedUrl);
                      } else {
                        formField.onBlur();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'email':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    {...formField}
                    value={formField.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'image':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            formField.onChange(event.target?.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {formField.value && (
                      <img
                        src={formField.value}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'price':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 97,00"
                    {...formField}
                    value={formField.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Digite ${field.label.toLowerCase()}`}
                    {...formField}
                    value={formField.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  const renderSectionFields = (sectionType: string) => {
    const modelFields = getModelSpecificFields(templateId);
    const fieldsForSection = modelFields[sectionType] || [];
    
    if (fieldsForSection.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          <p>Nenhum campo específico definido para esta seção.</p>
          <p className="text-sm">Modelo: {templateId}, Seção: {sectionType}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {fieldsForSection.map(field => renderSectionField(field, sectionType))}
      </div>
    );
  };

  const getSectionDisplayName = (sectionType: string) => {
    const sectionNames: { [key: string]: string } = {
      'hero': 'Seção Principal',
      'hero-hinode': 'Seção Principal Hinode',
      'apresentacao-pessoal': 'Apresentação Pessoal',
      'beneficios': 'Benefícios',
      'sobre': 'Sobre',
      'sobre-hinode': 'Sobre Hinode',
      'sobre-negocio': 'Sobre o Negócio',
      'sobre-distribuidor': 'Sobre Distribuidor',
      'biografia-representante': 'Biografia do Representante',
      'bio': 'Biografia',
      'servicos': 'Serviços',
      'habilidades': 'Habilidades',
      'produtos-destaque': 'Produtos em Destaque',
      'produtos-hinode': 'Produtos Hinode',
      'como-funciona': 'Como Funciona',
      'etapas-comecar': 'Etapas para Começar',
      'depoimentos': 'Depoimentos',
      'faq': 'Perguntas Frequentes',
      'equipe': 'Equipe',
      'projetos': 'Projetos',
      'mapa': 'Mapa',
      'contato': 'Contato',
      'contato-hinode': 'Contato Hinode',
      'rodape': 'Rodapé',
      'rodape-hinode': 'Rodapé Hinode',
      'banner-institucional': 'Banner Institucional',
      'produto': 'Produto'
    };
    return sectionNames[sectionType] || sectionType;
  };

  const handleSubmit = useCallback(async (data: any) => {
    console.log('DynamicSiteEditor - Iniciando submissão...', data);
    setIsSubmitting(true);
    
    try {
      const processedData = {
        clientId,
        clientName,
        templateId,
        modelId: templateId,
        nomeDoSite: data.nomeDoSite,
        logoPath: data.logoPath,
        cores: colors,
        activeSections: Array.from(activeSections),
        sectionsOrder,
        whatsapp: data.hero?.whatsapp || data['hero-hinode']?.whatsapp || data.contato?.whatsapp,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      };

      console.log('DynamicSiteEditor - Dados processados para submissão:', processedData);
      
      await onSubmit(processedData);
      
      toast({
        title: "Sucesso!",
        description: `Site ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
      });
      
    } catch (error) {
      console.error('Erro na submissão:', error);
      toast({
        title: "Erro",
        description: `Erro ao ${isEditing ? 'atualizar' : 'criar'} o site. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [templateId, clientId, clientName, colors, activeSections, sectionsOrder, onSubmit, isEditing, toast]);

  const getCurrentSiteData = useCallback(() => {
    const formData = form.getValues();
    const layout = sectionsOrder.map(sectionType => {
      const secao = siteModel.secoesPadrao.find(s => s.type === sectionType);
      return {
        ...secao,
        enabled: activeSections.has(sectionType),
        conteudo: formData[sectionType] || {}
      };
    });

    return {
      modelId: templateId,
      templateId: templateId,
      nomeDoSite: formData.nomeDoSite || 'Exemplo Site',
      logoPath: formData.logoPath,
      cores: colors,
      layout,
      whatsapp: formData.hero?.whatsapp || formData['hero-hinode']?.whatsapp || formData.contato?.whatsapp || '5511999999999',
      sectionsOrder,
      activeSections: Array.from(activeSections),
      ...formData
    };
  }, [form, sectionsOrder, siteModel, activeSections, templateId, colors]);

  const openFullPreview = () => {
    const currentData = getCurrentSiteData();
    const previewUrl = `/preview/${clientId}?data=${encodeURIComponent(JSON.stringify(currentData))}`;
    window.open(previewUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Formulário */}
      <div className="space-y-6 max-h-[85vh] overflow-y-auto">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Informações Básicas
              <Badge variant="secondary">{siteModel.nome}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="nomeDoSite"
              rules={{ required: "Nome do site é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Site</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Meu Site Incrível" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LogoUpload
              clientId={clientId}
              currentLogo={form.watch('logoPath')}
              onLogoChange={(logoPath) => form.setValue('logoPath', logoPath)}
            />
          </CardContent>
        </Card>

        {/* Cores do Site */}
        <ColorSelector
          colors={colors}
          onColorChange={handleColorChange}
        />

        {/* Seções do Site */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Conteúdo do Site</h3>
          <p className="text-sm text-gray-600">
            Configure cada seção do seu site. Use os controles para ativar/desativar e reordenar seções.
          </p>

          {sectionsOrder.map((sectionType) => {
            const isActive = activeSections.has(sectionType);
            const sectionDisplayName = getSectionDisplayName(sectionType);
            const currentIndex = sectionsOrder.indexOf(sectionType);
            
            return (
              <Card key={sectionType} className={!isActive ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveSectionUp(sectionType)}
                          disabled={currentIndex === 0}
                          title="Mover para cima"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveSectionDown(sectionType)}
                          disabled={currentIndex === sectionsOrder.length - 1}
                          title="Mover para baixo"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <div>
                        <CardTitle className="text-base">{sectionDisplayName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Configurar seção {sectionDisplayName.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSection(sectionType)}
                        title={isActive ? 'Ocultar seção' : 'Mostrar seção'}
                      >
                        {isActive ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {isActive && (
                  <CardContent className="space-y-4">
                    {renderSectionFields(sectionType)}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button 
            type="button" 
            onClick={form.handleSubmit(handleSubmit)} 
            className="flex-1" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar Site' : 'Criar Site')}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={openFullPreview}
            size="lg"
            title="Abrir preview em tela cheia"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="xl:sticky xl:top-6 xl:self-start">
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
            <h4 className="font-medium">Preview do Site</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          {showPreview && (
            <div className="h-[75vh] overflow-y-auto bg-gray-100">
              <TemplatePreview
                siteData={previewData || getCurrentSiteData()}
                showPreview={true}
                onTogglePreview={() => setShowPreview(!showPreview)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
