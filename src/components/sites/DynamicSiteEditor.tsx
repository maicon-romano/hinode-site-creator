
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
import { Eye, EyeOff, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { getSiteModel, SiteModel } from '@/data/siteModels';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';

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
    new Set(siteModel?.secoesPadrao.map(s => s.type) || [])
  );
  const [sectionsOrder, setSectionsOrder] = useState<string[]>(
    siteModel?.secoesPadrao.map(s => s.type) || []
  );
  const [showPreview, setShowPreview] = useState(false);
  const [colors, setColors] = useState({
    principal: initialData?.cores?.principal || '#ff6b35',
    fundo: initialData?.cores?.fundo || '#ffffff',
    destaque: initialData?.cores?.destaque || '#0066cc',
    texto: initialData?.cores?.texto || '#333333'
  });

  // Use the form context from the parent SiteBuilder
  const form = useFormContext();

  // Update form values when props change
  useEffect(() => {
    form.setValue('clientId', clientId);
    form.setValue('clientName', clientName);
    form.setValue('modelId', templateId);
    form.setValue('nomeDoSite', initialData?.nomeDoSite || '');
    form.setValue('logoPath', initialData?.logoPath || '');
    form.setValue('cores', colors);
    
    // Set initial values for all sections
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        if (!['clientId', 'clientName', 'modelId', 'nomeDoSite', 'logoPath', 'cores'].includes(key)) {
          form.setValue(key, initialData[key]);
        }
      });
    }
  }, [clientId, clientName, templateId, initialData, colors, form]);

  if (!siteModel) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Modelo de site não encontrado: {templateId}</p>
      </div>
    );
  }

  const handleColorChange = (colorType: string, color: string) => {
    setColors(prev => ({ ...prev, [colorType]: color }));
    form.setValue('cores', { ...colors, [colorType]: color });
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
    const layout = sectionsOrder.map(sectionType => {
      const secao = siteModel.secoesPadrao.find(s => s.type === sectionType);
      return {
        ...secao,
        enabled: activeSections.has(sectionType),
        conteudo: data[sectionType] || {}
      };
    });

    onSubmit({
      ...data,
      cores: colors,
      layout,
      modelId: templateId,
      sectionsOrder
    });
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
                    <Input placeholder="Meu Site Incrível" {...field} />
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
