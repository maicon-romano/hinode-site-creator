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
import { Eye, EyeOff, Trash2, GripVertical, ChevronUp, ChevronDown, Plus, X } from 'lucide-react';
import { getSiteModel, SiteModel } from '@/data/siteModels';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';
import { convertYouTubeToEmbed } from '@/lib/imageUtils';
import { debounce } from 'lodash';

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

  const form = useFormContext();

  // Debounced function para update do preview - mais conservador
  const debouncedUpdatePreview = useCallback(
    debounce((data) => {
      console.log('Atualizando preview com dados:', data);
      setPreviewData(data);
    }, 2000), // 2 segundos
    []
  );

  // Watch apenas campos essenciais
  const nomeDoSite = form.watch('nomeDoSite');
  const logoPath = form.watch('logoPath');

  // Update preview apenas quando campos importantes mudam
  useEffect(() => {
    if (isInitialized) {
      const currentData = getCurrentSiteData();
      debouncedUpdatePreview(currentData);
    }
  }, [nomeDoSite, logoPath, activeSections, sectionsOrder]);

  // Função para atualizar cores imediatamente no preview
  const handleColorChange = useCallback((colorType: string, color: string) => {
    let newColors = { ...colors };
    
    if (colorType === 'degradeHero') {
      try {
        const degradeObj = typeof color === 'string' ? JSON.parse(color) : color;
        newColors.degradeHero = degradeObj;
      } catch (error) {
        console.error('Erro ao processar degradê:', error);
        return;
      }
    } else {
      newColors[colorType] = color;
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

  // Mapeamento de campos específicos por modelo
  const getModelSpecificFields = (modelId: string) => {
    const commonFields = {
      hero: ['titulo', 'subtitulo', 'texto', 'video', 'botaoTexto', 'botaoLink', 'whatsapp', 'imagem'],
      sobre: ['titulo', 'subtitulo', 'texto', 'imagem'],
      contato: ['titulo', 'subtitulo', 'whatsapp', 'telefone', 'email', 'endereco'],
      rodape: ['texto']
    };

    const modelSpecificFields = {
      'representante-hinode': {
        'hero-hinode': ['titulo', 'subtitulo', 'texto', 'video', 'botaoTexto', 'botaoLink', 'whatsapp', 'imagem'],
        'sobre-hinode': ['titulo', 'subtitulo', 'texto', 'imagem'],
        'biografia-representante': ['nome', 'titulo', 'texto', 'foto', 'experiencia', 'botaoTexto', 'botaoLink'],
        'produtos-hinode': ['titulo', 'subtitulo', 'descricao', 'produtos'],
        'contato-hinode': ['titulo', 'subtitulo', 'whatsapp', 'telefone', 'email'],
        'rodape-hinode': ['texto']
      },
      'site-institucional': {
        'banner-institucional': ['titulo', 'subtitulo', 'imagem'],
        'sobre': ['titulo', 'subtitulo', 'texto', 'imagem'],
        'servicos': ['titulo', 'subtitulo', 'lista'],
        'equipe': ['titulo', 'subtitulo'],
        'contato': ['titulo', 'subtitulo', 'whatsapp', 'telefone', 'email', 'endereco']
      },
      'landing-page-vendas': {
        'hero': ['titulo', 'subtitulo', 'video', 'botaoTexto', 'botaoLink'],
        'beneficios': ['titulo', 'subtitulo', 'lista'],
        'produto': ['titulo', 'texto', 'imagem', 'preco', 'botaoTexto', 'botaoLink'],
        'depoimentos': ['titulo'],
        'contato': ['titulo', 'whatsapp']
      },
      'portfolio-profissional': {
        'bio': ['titulo', 'subtitulo', 'texto', 'imagem'],
        'habilidades': ['titulo', 'lista'],
        'projetos': ['titulo'],
        'contato': ['titulo', 'whatsapp', 'email']
      }
    };

    return modelSpecificFields[modelId] || commonFields;
  };

  const renderSectionField = (fieldKey: string, sectionType: string, fieldLabel: string, fieldType: 'text' | 'textarea' | 'url' | 'image' | 'price' = 'text') => {
    const fieldName = `${sectionType}.${fieldKey}`;

    switch (fieldType) {
      case 'textarea':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Digite ${fieldLabel.toLowerCase()}`}
                    className="min-h-[100px]"
                    {...field}
                    value={field.value || ''}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com"
                    {...field}
                    value={field.value || ''}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value && (value.includes('youtube.com') || value.includes('youtu.be'))) {
                        const convertedUrl = convertYouTubeToEmbed(value);
                        field.onChange(convertedUrl);
                      } else {
                        field.onBlur();
                      }
                    }}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
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
                            field.onChange(event.target?.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {field.value && (
                      <img
                        src={field.value}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 97,00"
                    {...field}
                    value={field.value || ''}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Digite ${fieldLabel.toLowerCase()}`}
                    {...field}
                    value={field.value || ''}
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
    
    const fieldLabels = {
      titulo: 'Título',
      subtitulo: 'Subtítulo',
      texto: 'Texto/Descrição',
      descricao: 'Descrição',
      video: 'URL do Vídeo',
      botaoTexto: 'Texto do Botão',
      botaoLink: 'Link do Botão',
      whatsapp: 'WhatsApp',
      telefone: 'Telefone',
      email: 'E-mail',
      endereco: 'Endereço',
      imagem: 'Imagem',
      foto: 'Foto',
      nome: 'Nome',
      experiencia: 'Anos de Experiência',
      produtos: 'Lista de Produtos (um por linha)',
      lista: 'Lista de Itens (um por linha)',
      preco: 'Preço'
    };

    const fieldTypes = {
      texto: 'textarea',
      descricao: 'textarea',
      produtos: 'textarea',
      lista: 'textarea',
      video: 'url',
      botaoLink: 'url',
      imagem: 'image',
      foto: 'image',
      preco: 'price'
    };

    return (
      <div className="space-y-4">
        {fieldsForSection.map(fieldKey => 
          renderSectionField(
            fieldKey, 
            sectionType, 
            fieldLabels[fieldKey] || fieldKey,
            fieldTypes[fieldKey] || 'text'
          )
        )}
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

  // Helper function to manage cards (for produtos, etc)
  const addCard = (sectionType: string) => {
    const currentCards = form.getValues(`${sectionType}.cards`) || [];
    const newCard = {
      id: Date.now().toString(),
      titulo: '',
      texto: '',
      imagem: '',
      ordem: currentCards.length + 1
    };
    form.setValue(`${sectionType}.cards`, [...currentCards, newCard]);
  };

  const removeCard = (sectionType: string, cardId: string) => {
    const currentCards = form.getValues(`${sectionType}.cards`) || [];
    const updatedCards = currentCards.filter((card: any) => card.id !== cardId);
    form.setValue(`${sectionType}.cards`, updatedCards);
  };

  const renderCardEditor = (sectionType: string, fieldLabel: string) => {
    const cards = form.watch(`${sectionType}.cards`) || [];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>{fieldLabel}</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addCard(sectionType)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>
        
        {cards.map((card: any, index: number) => (
          <Card key={card.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Item {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCard(sectionType, card.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name={`${sectionType}.cards.${index}.titulo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do item" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${sectionType}.cards.${index}.texto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição do item" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${sectionType}.cards.${index}.imagem`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
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
                                field.onChange(event.target?.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {field.value && (
                          <img
                            src={field.value}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded border"
                          />
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const handleSubmit = useCallback((data: any) => {
    console.log('DynamicSiteEditor - Dados do formulário:', data);
    console.log('DynamicSiteEditor - Template ID:', templateId);
    
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
      ...data
    };

    console.log('DynamicSiteEditor - Dados processados:', processedData);
    onSubmit(processedData);
  }, [templateId, clientId, clientName, colors, activeSections, sectionsOrder, onSubmit]);

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
      whatsapp: formData.hero?.whatsapp || formData.contato?.whatsapp || '5511999999999',
      sectionsOrder,
      activeSections: Array.from(activeSections),
      ...formData
    };
  }, [form, sectionsOrder, siteModel, activeSections, templateId, colors]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Formulário */}
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
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

        <Button 
          type="button" 
          onClick={form.handleSubmit(handleSubmit)} 
          className="w-full" 
          size="lg"
        >
          {isEditing ? 'Atualizar Site' : 'Criar Site'}
        </Button>
      </div>

      {/* Preview */}
      <div className="xl:sticky xl:top-6 xl:self-start">
        <TemplatePreview
          siteData={previewData || getCurrentSiteData()}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
      </div>
    </div>
  );
};

// Helper functions fora do componente para evitar re-renders
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

const toggleSection = (sectionType: string, activeSections: Set<string>, setActiveSections: any, form: any) => {
  setActiveSections((prev: Set<string>) => {
    const newSet = new Set(prev);
    if (newSet.has(sectionType)) {
      newSet.delete(sectionType);
    } else {
      newSet.add(sectionType);
    }
    form.setValue('activeSections', Array.from(newSet));
    return newSet;
  });
};
