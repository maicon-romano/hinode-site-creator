import React, { useState, useEffect } from 'react';
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
  const [showPreview, setShowPreview] = useState(false);
  const [colors, setColors] = useState({
    principal: initialData?.cores?.principal || '#ff6b35',
    fundo: initialData?.cores?.fundo || '#ffffff',
    destaque: initialData?.cores?.destaque || '#0066cc',
    texto: initialData?.cores?.texto || '#333333'
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Use the form context from the parent SiteBuilder
  const form = useFormContext();

  // Initialize form values only once
  useEffect(() => {
    if (!isInitialized) {
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
  }, []);

  // Update colors in form when they change
  useEffect(() => {
    form.setValue('cores', colors);
  }, [colors, form]);

  // Update activeSections in form when they change
  useEffect(() => {
    form.setValue('activeSections', Array.from(activeSections));
  }, [activeSections, form]);

  // Update sectionsOrder in form when they change
  useEffect(() => {
    form.setValue('sectionsOrder', sectionsOrder);
  }, [sectionsOrder, form]);

  if (!siteModel) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Modelo de site não encontrado: {templateId}</p>
      </div>
    );
  }

  const handleColorChange = (colorType: string, color: string) => {
    setColors(prev => ({ ...prev, [colorType]: color }));
  };

  const toggleSection = (sectionType: string) => {
    const newActiveSections = new Set(activeSections);
    if (newActiveSections.has(sectionType)) {
      newActiveSections.delete(sectionType);
    } else {
      newActiveSections.add(sectionType);
    }
    setActiveSections(newActiveSections);
  };

  const moveSectionUp = (sectionType: string) => {
    const currentIndex = sectionsOrder.indexOf(sectionType);
    if (currentIndex > 0) {
      const newOrder = [...sectionsOrder];
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      setSectionsOrder(newOrder);
    }
  };

  const moveSectionDown = (sectionType: string) => {
    const currentIndex = sectionsOrder.indexOf(sectionType);
    if (currentIndex < sectionsOrder.length - 1) {
      const newOrder = [...sectionsOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      setSectionsOrder(newOrder);
    }
  };

  // Helper function to get section display name
  const getSectionDisplayName = (sectionType: string) => {
    const sectionNames: { [key: string]: string } = {
      'hero': 'Seção Principal',
      'hero-hinode': 'Seção Principal Hinode',
      'apresentacao-pessoal': 'Apresentação Pessoal',
      'beneficios': 'Benefícios',
      'sobre': 'Sobre',
      'sobre-hinode': 'Sobre Hinode',
      'sobre-distribuidor': 'Sobre Distribuidor',
      'bio': 'Biografia',
      'servicos': 'Serviços',
      'habilidades': 'Habilidades',
      'produtos-destaque': 'Produtos em Destaque',
      'como-funciona': 'Como Funciona',
      'etapas-comecar': 'Etapas para Começar',
      'depoimentos': 'Depoimentos',
      'faq': 'Perguntas Frequentes',
      'equipe': 'Equipe',
      'projetos': 'Projetos',
      'mapa': 'Mapa',
      'contato': 'Contato',
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

  // ... keep existing code (renderCardEditor function)

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

  const renderSectionField = (fieldKey: string, sectionType: string, fieldLabel: string, fieldType: 'text' | 'textarea' | 'url' | 'image' = 'text') => {
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
                    onBlur={(e) => {
                      // Auto-convert YouTube URLs to embed format
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
                {field.value && (field.value.includes('youtube.com') || field.value.includes('youtu.be')) && (
                  <p className="text-sm text-blue-600 mt-1">
                    ✓ URL do YouTube será convertida automaticamente para formato de embed
                  </p>
                )}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  // ... keep existing code (renderSectionFields function and all other remaining methods)

  const renderSectionFields = (sectionType: string) => {
    switch (sectionType) {
      case 'hero':
      case 'hero-hinode':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título Principal')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo', 'textarea')}
            {renderSectionField('texto', sectionType, 'Texto Adicional', 'textarea')}
            {renderSectionField('video', sectionType, 'URL do Vídeo', 'url')}
            {renderSectionField('botaoTexto', sectionType, 'Texto do Botão')}
            {renderSectionField('botaoLink', sectionType, 'Link do Botão', 'url')}
            {renderSectionField('whatsapp', sectionType, 'WhatsApp')}
            {renderSectionField('imagem', sectionType, 'Imagem Principal', 'image')}
          </>
        );

      case 'sobre':
      case 'sobre-hinode':
      case 'sobre-distribuidor':
      case 'bio':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('texto', sectionType, 'Descrição', 'textarea')}
            {renderSectionField('imagem', sectionType, 'Imagem da Seção', 'image')}
          </>
        );

      case 'produtos-destaque':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título da Seção')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('descricao', sectionType, 'Descrição', 'textarea')}
            {renderCardEditor(sectionType, 'Produtos')}
            {renderSectionField('lista', sectionType, 'Lista de Produtos (fallback - um por linha)', 'textarea')}
          </>
        );

      case 'beneficios':
      case 'servicos':
      case 'habilidades':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título da Seção')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('descricao', sectionType, 'Descrição', 'textarea')}
            {renderSectionField('lista', sectionType, 'Lista de Itens (um por linha)', 'textarea')}
          </>
        );

      case 'como-funciona':
      case 'etapas-comecar':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título da Seção')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('descricao', sectionType, 'Descrição', 'textarea')}
            {renderSectionField('lista', sectionType, 'Etapas (uma por linha)', 'textarea')}
          </>
        );

      case 'depoimentos':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título da Seção')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('lista', sectionType, 'Depoimentos (Nome: Texto; separados por nova linha)', 'textarea')}
          </>
        );

      case 'contato':
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título')}
            {renderSectionField('subtitulo', sectionType, 'Subtítulo')}
            {renderSectionField('whatsapp', sectionType, 'WhatsApp')}
            {renderSectionField('telefone', sectionType, 'Telefone')}
            {renderSectionField('email', sectionType, 'E-mail')}
            {renderSectionField('endereco', sectionType, 'Endereço')}
          </>
        );

      case 'rodape':
      case 'rodape-hinode':
        return (
          <>
            {renderSectionField('texto', sectionType, 'Texto do Rodapé', 'textarea')}
          </>
        );

      default:
        return (
          <>
            {renderSectionField('titulo', sectionType, 'Título')}
            {renderSectionField('texto', sectionType, 'Texto', 'textarea')}
          </>
        );
    }
  };

  const handleSubmit = (data: any) => {
    console.log('DynamicSiteEditor - Dados do formulário:', data);
    console.log('DynamicSiteEditor - Template ID:', templateId);
    
    // Criar estrutura de dados específica para cada modelo
    const processedData = {
      clientId,
      clientName,
      templateId, // Garantir que templateId está presente
      modelId: templateId, // Manter compatibilidade
      nomeDoSite: data.nomeDoSite,
      logoPath: data.logoPath,
      cores: colors,
      activeSections: Array.from(activeSections),
      sectionsOrder,
      whatsapp: data.hero?.whatsapp || data['hero-hinode']?.whatsapp || data.contato?.whatsapp,
    };

    // Mapear dados específicos por modelo
    if (templateId === 'representante-hinode') {
      processedData['hero-hinode'] = {
        titulo: data['hero-hinode']?.titulo || data.titulo || 'Transforme Sua Beleza',
        subtitulo: data['hero-hinode']?.subtitulo || data.subtitulo || 'Descubra produtos de luxo',
        video: data['hero-hinode']?.video || data.video,
        botaoTexto: data['hero-hinode']?.botaoTexto || 'QUERO CONHECER OS PRODUTOS',
        whatsapp: data['hero-hinode']?.whatsapp || data.whatsapp
      };
      
      processedData['sobre-negocio'] = {
        titulo: data['sobre-negocio']?.titulo || 'Sobre a Hinode',
        texto: data['sobre-negocio']?.texto || 'A Hinode é líder em cosméticos...',
        imagem: data['sobre-negocio']?.imagem,
        botaoTexto: data['sobre-negocio']?.botaoTexto || 'Conhecer Oportunidade'
      };
      
      processedData['biografia-representante'] = {
        nome: data['biografia-representante']?.nome || clientName,
        titulo: data['biografia-representante']?.titulo || 'Consultora de Beleza',
        texto: data['biografia-representante']?.texto || 'Especialista em produtos Hinode...',
        foto: data['biografia-representante']?.foto,
        experiencia: data['biografia-representante']?.experiencia || '5+',
        botaoTexto: data['biografia-representante']?.botaoTexto || 'Falar Comigo Agora'
      };
      
      processedData['produtos-hinode'] = {
        titulo: data['produtos-hinode']?.titulo || 'Linha Completa Hinode',
        subtitulo: data['produtos-hinode']?.subtitulo || 'Produtos premium...',
        produtos: data['produtos-hinode']?.produtos || 'Perfumes Premium\nMaquiagem Professional\nCuidados com a Pele'
      };
      
      processedData['contato-hinode'] = {
        titulo: data['contato-hinode']?.titulo || 'Vamos Conversar?',
        subtitulo: data['contato-hinode']?.subtitulo || 'Entre em contato...',
        whatsapp: data['contato-hinode']?.whatsapp || data.whatsapp
      };
    } else if (templateId === 'site-institucional') {
      processedData['hero'] = {
        titulo: data.hero?.titulo || data.titulo || 'Sua Empresa',
        subtitulo: data.hero?.subtitulo || data.subtitulo || 'Confiança e qualidade',
        imagem: data.hero?.imagem,
        botaoTexto: data.hero?.botaoTexto || 'Saiba Mais',
        botaoLink: data.hero?.botaoLink
      };
      
      processedData['sobre'] = {
        titulo: data.sobre?.titulo || 'Sobre Nós',
        texto: data.sobre?.texto || 'Nossa história e valores...',
        imagem: data.sobre?.imagem
      };
      
      processedData['servicos'] = {
        titulo: data.servicos?.titulo || 'Nossos Serviços',
        lista: data.servicos?.lista || 'Serviço 1\nServiço 2\nServiço 3'
      };
    } else if (templateId === 'landing-page-vendas') {
      processedData['hero'] = {
        titulo: data.hero?.titulo || data.titulo || 'Produto Incrível',
        subtitulo: data.hero?.subtitulo || data.subtitulo || 'A solução que você procura',
        video: data.hero?.video || data.video,
        botaoTexto: data.hero?.botaoTexto || 'COMPRAR AGORA',
        botaoLink: data.hero?.botaoLink || `https://wa.me/${data.whatsapp}`
      };
      
      processedData['beneficios'] = {
        titulo: data.beneficios?.titulo || 'Por que escolher?',
        lista: data.beneficios?.lista || 'Benefício 1\nBenefício 2\nBenefício 3'
      };
      
      processedData['produto'] = {
        titulo: data.produto?.titulo || 'Nosso Produto',
        texto: data.produto?.texto || 'Descrição do produto...',
        imagem: data.produto?.imagem,
        preco: data.produto?.preco || 'R$ 97,00'
      };
    } else if (templateId === 'portfolio-profissional') {
      processedData['bio'] = {
        titulo: data.bio?.titulo || clientName,
        subtitulo: data.bio?.subtitulo || 'Profissional',
        texto: data.bio?.texto || 'Minha biografia profissional...',
        imagem: data.bio?.imagem
      };
      
      processedData['habilidades'] = {
        titulo: data.habilidades?.titulo || 'Minhas Habilidades',
        lista: data.habilidades?.lista || 'Habilidade 1\nHabilidade 2\nHabilidade 3'
      };
      
      processedData['projetos'] = {
        titulo: data.projetos?.titulo || 'Meus Projetos',
        cards: data.projetos?.cards || []
      };
    }

    // Adicionar dados genéricos que todos os modelos podem ter
    if (data.contato && !processedData['contato-hinode']) {
      processedData['contato'] = {
        titulo: data.contato?.titulo || 'Entre em Contato',
        whatsapp: data.contato?.whatsapp || data.whatsapp,
        telefone: data.contato?.telefone,
        email: data.contato?.email,
        endereco: data.contato?.endereco
      };
    }

    console.log('DynamicSiteEditor - Dados processados:', processedData);
    onSubmit(processedData);
  };

  const getCurrentSiteData = () => {
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
      nomeDoSite: formData.nomeDoSite || 'Exemplo Site',
      logoPath: formData.logoPath,
      cores: colors,
      layout,
      whatsapp: formData.hero?.whatsapp || formData.contato?.whatsapp || '5511999999999',
      sectionsOrder,
      activeSections: Array.from(activeSections),
      ...formData
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Formulário */}
      <div className="space-y-6">
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
      <div className="lg:sticky lg:top-6 lg:self-start">
        <TemplatePreview
          siteData={getCurrentSiteData()}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
      </div>
    </div>
  );
};
