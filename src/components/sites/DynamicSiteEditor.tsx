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
import { Eye, EyeOff, Trash2, GripVertical } from 'lucide-react';
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

  const handleSubmit = (data: any) => {
    const layout = siteModel.secoesPadrao.map(secao => ({
      ...secao,
      enabled: activeSections.has(secao.type),
      conteudo: data[secao.type] || {}
    }));

    onSubmit({
      ...data,
      cores: colors,
      layout,
      modelId: templateId
    });
  };

  const getCurrentSiteData = () => {
    const formData = form.getValues();
    const layout = siteModel.secoesPadrao.map(secao => ({
      ...secao,
      enabled: activeSections.has(secao.type),
      conteudo: formData[secao.type] || {}
    }));

    return {
      modelId: templateId,
      nomeDoSite: formData.nomeDoSite || 'Exemplo Site',
      logoPath: formData.logoPath,
      cores: colors,
      layout,
      whatsapp: formData.hero?.whatsapp || '5511999999999',
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
            Configure cada seção do seu site. Use os controles para ativar/desativar seções.
          </p>

          {siteModel.secoesPadrao.map((secao) => {
            const isActive = activeSections.has(secao.type);
            
            return (
              <Card key={secao.type} className={!isActive ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <div>
                        <CardTitle className="text-base">{secao.nome}</CardTitle>
                        {secao.descricao && (
                          <p className="text-sm text-gray-600 mt-1">{secao.descricao}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSection(secao.type)}
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
                    {/* Campos básicos para cada tipo de seção */}
                    {secao.type === 'hero' && (
                      <>
                        {renderSectionField('titulo', 'hero', 'Título Principal')}
                        {renderSectionField('subtitulo', 'hero', 'Subtítulo', 'textarea')}
                        {renderSectionField('botaoTexto', 'hero', 'Texto do Botão')}
                        {renderSectionField('whatsapp', 'hero', 'WhatsApp')}
                        {renderSectionField('imagem', 'hero', 'Imagem Principal', 'image')}
                      </>
                    )}

                    {secao.type === 'beneficios' && (
                      <>
                        {renderSectionField('titulo', 'beneficios', 'Título da Seção')}
                        {renderSectionField('lista', 'beneficios', 'Lista de Benefícios (um por linha)', 'textarea')}
                      </>
                    )}

                    {secao.type === 'sobre' && (
                      <>
                        {renderSectionField('titulo', 'sobre', 'Título')}
                        {renderSectionField('texto', 'sobre', 'Descrição', 'textarea')}
                        {renderSectionField('imagem', 'sobre', 'Imagem da Seção', 'image')}
                      </>
                    )}

                    {secao.type === 'servicos' && (
                      <>
                        {renderSectionField('titulo', 'servicos', 'Título da Seção')}
                        {renderSectionField('descricao', 'servicos', 'Descrição', 'textarea')}
                        {renderSectionField('lista', 'servicos', 'Lista de Serviços (um por linha)', 'textarea')}
                      </>
                    )}

                    {secao.type === 'depoimentos' && (
                      <>
                        {renderSectionField('titulo', 'depoimentos', 'Título da Seção')}
                        {renderSectionField('lista', 'depoimentos', 'Depoimentos (Nome: Texto; separados por nova linha)', 'textarea')}
                      </>
                    )}

                    {secao.type === 'contato' && (
                      <>
                        {renderSectionField('titulo', 'contato', 'Título')}
                        {renderSectionField('whatsapp', 'contato', 'WhatsApp')}
                        {renderSectionField('telefone', 'contato', 'Telefone')}
                        {renderSectionField('email', 'contato', 'E-mail')}
                        {renderSectionField('endereco', 'contato', 'Endereço')}
                      </>
                    )}

                    {/* Adicionar campos para outros tipos de seção conforme necessário */}
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
