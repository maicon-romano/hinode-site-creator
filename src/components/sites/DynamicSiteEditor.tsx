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
  const [showPreview, setShowPreview] = useState(false); // Desativar preview automático
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useFormContext();

  // Função para atualizar cores imediatamente
  const handleColorChange = useCallback((colorType: string, color: string | { inicio: string; fim: string }) => {
    let newColors = { ...colors };
    
    if (colorType === 'degradeHero') {
      newColors.degradeHero = typeof color === 'string' ? JSON.parse(color) : color;
    } else {
      newColors[colorType] = color as string;
    }
    
    setColors(newColors);
    form.setValue(`cores.${colorType}`, colorType === 'degradeHero' ? newColors.degradeHero : color);
  }, [form, colors]);

  useEffect(() => {
    if (!isInitialized && siteModel) {
      console.log('Inicializando formulário com dados:', { clientId, clientName, templateId, initialData });
      
      form.setValue('clientId', clientId);
      form.setValue('clientName', clientName);
      form.setValue('modelId', templateId);
      form.setValue('templateId', templateId);
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
          if (!['clientId', 'clientName', 'modelId', 'templateId', 'nomeDoSite', 'logoPath', 'cores', 'activeSections', 'sectionsOrder', 'layout'].includes(key)) {
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

  // Mapeamento COMPLETO de campos específicos por modelo - INCLUINDO BIO
  const getModelSpecificFields = (modelId: string) => {
    const fieldMappings = {
      'representante-hinode': {
        'hero-hinode': [
          { key: 'titulo', label: 'Título Principal', type: 'text', placeholder: 'Seja um Representante de Sucesso' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Conquiste sua independência financeira' },
          { key: 'texto', label: 'Texto Descritivo', type: 'textarea', placeholder: 'Descrição do seu negócio...' },
          { key: 'video', label: 'URL do Vídeo (YouTube)', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Fale Comigo' },
          { key: 'botaoLink', label: 'Link do Botão (WhatsApp)', type: 'url', placeholder: 'https://wa.me/5511999999999' },
          { key: 'whatsapp', label: 'Número WhatsApp', type: 'text', placeholder: '5511999999999' },
          { key: 'imagem', label: 'Imagem de Fundo', type: 'image' }
        ],
        'sobre-hinode': [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Sobre a Hinode' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Empresa líder em cosméticos' },
          { key: 'texto', label: 'Texto Sobre a Hinode', type: 'textarea', placeholder: 'A Hinode é uma empresa brasileira...' },
          { key: 'imagem', label: 'Logo/Imagem Hinode', type: 'image' }
        ],
        'biografia-representante': [
          { key: 'nome', label: 'Nome do Representante', type: 'text', placeholder: 'Seu nome completo' },
          { key: 'titulo', label: 'Título/Cargo', type: 'text', placeholder: 'Representante Hinode' },
          { key: 'texto', label: 'Biografia', type: 'textarea', placeholder: 'Conte sua história...' },
          { key: 'foto', label: 'Foto do Representante', type: 'image' },
          { key: 'experiencia', label: 'Anos de Experiência', type: 'text', placeholder: '5 anos' },
          { key: 'botaoTexto', label: 'Texto do Botão CTA', type: 'text', placeholder: 'Saiba Mais' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url', placeholder: 'https://wa.me/...' }
        ],
        'bio': [
          { key: 'titulo', label: 'Seu Nome', type: 'text', placeholder: 'Maria Silva' },
          { key: 'subtitulo', label: 'Sua Profissão/Título', type: 'text', placeholder: 'Representante Hinode' },
          { key: 'texto', label: 'Sua Biografia', type: 'textarea', placeholder: 'Conte sua história e experiência...' },
          { key: 'imagem', label: 'Sua Foto', type: 'image' },
          { key: 'experiencia', label: 'Tempo de Experiência', type: 'text', placeholder: '3 anos' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Entre em Contato' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url', placeholder: 'https://wa.me/...' }
        ],
        'produtos-hinode': [
          { key: 'titulo', label: 'Título dos Produtos', type: 'text', placeholder: 'Produtos Hinode' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Conheça nossa linha completa' },
          { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Os melhores produtos de beleza...' },
          { key: 'produtos', label: 'Lista de Produtos (um por linha)', type: 'textarea', placeholder: 'Perfumes\nCosméticos\nCuidados com a pele' }
        ],
        'contato-hinode': [
          { key: 'titulo', label: 'Título do Contato', type: 'text', placeholder: 'Entre em Contato' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Estou aqui para te ajudar' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', placeholder: '5511999999999' },
          { key: 'telefone', label: 'Telefone', type: 'text', placeholder: '(11) 99999-9999' },
          { key: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' }
        ],
        'rodape-hinode': [
          { key: 'texto', label: 'Texto do Rodapé', type: 'textarea', placeholder: '© 2024 - Todos os direitos reservados' }
        ]
      },
      'site-institucional': {
        'banner-institucional': [
          { key: 'titulo', label: 'Título Principal', type: 'text', placeholder: 'Nossa Empresa' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Excelência em serviços' },
          { key: 'imagem', label: 'Imagem de Fundo', type: 'image' }
        ],
        'sobre': [
          { key: 'titulo', label: 'Título Sobre Nós', type: 'text', placeholder: 'Sobre Nossa Empresa' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Nossa história e missão' },
          { key: 'texto', label: 'Texto Sobre a Empresa', type: 'textarea', placeholder: 'Somos uma empresa...' },
          { key: 'imagem', label: 'Imagem da Empresa', type: 'image' }
        ],
        'servicos': [
          { key: 'titulo', label: 'Título dos Serviços', type: 'text', placeholder: 'Nossos Serviços' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'O que oferecemos' },
          { key: 'lista', label: 'Lista de Serviços (um por linha)', type: 'textarea', placeholder: 'Consultoria\nDesenvolvimento\nSuporte' }
        ],
        'equipe': [
          { key: 'titulo', label: 'Título da Equipe', type: 'text', placeholder: 'Nossa Equipe' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Profissionais qualificados' }
        ],
        'contato': [
          { key: 'titulo', label: 'Título do Contato', type: 'text', placeholder: 'Fale Conosco' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Estamos prontos para atender' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', placeholder: '5511999999999' },
          { key: 'telefone', label: 'Telefone', type: 'text', placeholder: '(11) 99999-9999' },
          { key: 'email', label: 'E-mail', type: 'email', placeholder: 'contato@empresa.com' },
          { key: 'endereco', label: 'Endereço', type: 'textarea', placeholder: 'Rua Example, 123\nSão Paulo - SP' }
        ]
      },
      'landing-page-vendas': [
        // ... keep existing code for landing-page-vendas
      ],
      'portfolio-profissional': [
        // ... keep existing code for portfolio-profissional
      ]
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
                    placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
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
                    placeholder={field.placeholder || "https://exemplo.com"}
                    {...formField}
                    value={formField.value || ''}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value && (value.includes('youtube.com') || value.includes('youtu.be'))) {
                        const convertedUrl = convertYouTubeToEmbed(value);
                        formField.onChange(convertedUrl);
                        console.log('URL do vídeo convertida:', convertedUrl);
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
                    placeholder={field.placeholder || "exemplo@email.com"}
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
                            const result = event.target?.result as string;
                            formField.onChange(result);
                            console.log('Imagem carregada para:', fieldName);
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
                    placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
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
      console.warn(`Nenhum campo encontrado para: ${templateId} - ${sectionType}`);
      return (
        <div className="text-center py-4 text-orange-600 bg-orange-50 rounded-lg">
          <p className="font-medium">⚠️ Seção não configurada completamente</p>
          <p className="text-sm">Modelo: {templateId}, Seção: {sectionType}</p>
          <p className="text-xs mt-2">Esta seção precisa ter campos definidos no mapeamento.</p>
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
      'bio': 'Biografia Pessoal',
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
      // Validação básica
      if (!data.nomeDoSite || data.nomeDoSite.trim() === '') {
        toast({
          title: "Erro de Validação",
          description: "Nome do site é obrigatório.",
          variant: "destructive",
        });
        return;
      }

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
        whatsapp: data['hero-hinode']?.whatsapp || data.hero?.whatsapp || data['contato-hinode']?.whatsapp || data.contato?.whatsapp,
        createdAt: isEditing ? initialData?.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      };

      console.log('DynamicSiteEditor - Dados processados para submissão:', processedData);
      
      await onSubmit(processedData);
      
      toast({
        title: "✅ Sucesso!",
        description: `Site ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
      });
      
    } catch (error) {
      console.error('Erro na submissão:', error);
      toast({
        title: "❌ Erro",
        description: `Erro ao ${isEditing ? 'atualizar' : 'criar'} o site. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [templateId, clientId, clientName, colors, activeSections, sectionsOrder, onSubmit, isEditing, toast, initialData]);

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
      whatsapp: formData['hero-hinode']?.whatsapp || formData.hero?.whatsapp || formData['contato-hinode']?.whatsapp || formData.contato?.whatsapp || '5511999999999',
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

  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
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
            onClick={handlePreviewClick}
            size="lg"
            title="Visualizar site"
          >
            <Eye className="h-4 w-4 mr-2" />
            🔍 Visualizar
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

      {/* Preview - Apenas quando solicitado */}
      {showPreview && (
        <div className="xl:sticky xl:top-6 xl:self-start">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
              <h4 className="font-medium">Preview do Site</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-[75vh] overflow-y-auto bg-gray-100">
              <TemplatePreview
                siteData={getCurrentSiteData()}
                showPreview={true}
                onTogglePreview={() => setShowPreview(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
