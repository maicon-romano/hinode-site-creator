
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClientSelector } from './ClientSelector';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';
import { DynamicFields } from './DynamicFields';

interface SiteFormData {
  clientId: string;
  clientName: string;
  nomeDoSite: string;
  headline: string;
  descricao: string;
  videoUrl: string;
  whatsapp: string;
  template: string;
  variation: string;
  logoPath: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  secoes: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
  // Campos dinâmicos
  [key: string]: any;
}

interface SiteFormProps {
  initialData?: Partial<SiteFormData>;
  onSubmit: (data: SiteFormData) => void;
  isEditing?: boolean;
}

export const SiteForm: React.FC<SiteFormProps> = ({ 
  initialData, 
  onSubmit, 
  isEditing = false 
}) => {
  const [colors, setColors] = useState({
    principal: initialData?.cores?.principal || '#ff6b35',
    fundo: initialData?.cores?.fundo || '#ffffff',
    destaque: initialData?.cores?.destaque || '#0066cc',
    texto: initialData?.cores?.texto || '#333333'
  });

  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<SiteFormData>({
    defaultValues: {
      clientId: initialData?.clientId || '',
      clientName: initialData?.clientName || '',
      nomeDoSite: initialData?.nomeDoSite || '',
      headline: initialData?.headline || '',
      descricao: initialData?.descricao || '',
      videoUrl: initialData?.videoUrl || '',
      whatsapp: initialData?.whatsapp || '',
      template: initialData?.template || 'landing',
      variation: initialData?.variation || 'default',
      logoPath: initialData?.logoPath || '',
      cores: colors,
      secoes: {
        video: initialData?.secoes?.video ?? true,
        formulario: initialData?.secoes?.formulario ?? true,
        depoimentos: initialData?.secoes?.depoimentos ?? true,
        sobre: initialData?.secoes?.sobre ?? true,
        contato: initialData?.secoes?.contato ?? true,
        ...initialData?.secoes
      },
      // Inicializar campos dinâmicos se existirem
      ...initialData
    }
  });

  const handleColorChange = (colorType: string, color: string) => {
    setColors(prev => ({ ...prev, [colorType]: color }));
    form.setValue('cores', { ...colors, [colorType]: color });
  };

  const handleSubmit = (data: SiteFormData) => {
    onSubmit({ ...data, cores: colors });
  };

  const selectedTemplate = form.watch('template');
  const selectedVariation = form.watch('variation');

  const getVariationOptions = (template: string) => {
    if (template === 'landing') {
      return [
        { value: 'default', label: 'Padrão' },
        { value: 'video', label: 'Com Vídeo' },
        { value: 'minimal', label: 'Minimalista' },
        { value: 'modern', label: 'Moderno' }
      ];
    } else if (template === 'institucional') {
      return [
        { value: 'default', label: 'Padrão' },
        { value: 'banner', label: 'Com Banner' },
        { value: 'corporate', label: 'Corporativo' },
        { value: 'creative', label: 'Criativo' }
      ];
    }
    return [{ value: 'default', label: 'Padrão' }];
  };

  // Dados atuais do formulário para preview
  const currentFormData = {
    ...form.watch(),
    cores: colors
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="clientId"
          rules={{ required: "Cliente é obrigatório" }}
          render={({ field }) => (
            <ClientSelector
              value={field.value}
              onValueChange={field.onChange}
              onClientDataChange={(clientName) => form.setValue('clientName', clientName)}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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

          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Template</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('variation', 'default');
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="institucional">Institucional</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="variation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variação do Template</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma variação" />
                  </SelectTrigger>
                  <SelectContent>
                    {getVariationOptions(selectedTemplate).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preview do Template */}
        <TemplatePreview
          siteData={currentFormData}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />

        {/* Campos dinâmicos baseados no template e variação */}
        <DynamicFields 
          template={selectedTemplate}
          variation={selectedVariation}
          form={form}
        />

        <LogoUpload
          clientId={form.watch('clientId')}
          currentLogo={form.watch('logoPath')}
          onLogoChange={(logoPath) => form.setValue('logoPath', logoPath)}
        />

        <ColorSelector
          colors={colors}
          onColorChange={handleColorChange}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Seções do Site</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'video', label: 'Seção de Vídeo' },
              { key: 'formulario', label: 'Formulário de Contato' },
              { key: 'depoimentos', label: 'Depoimentos' },
              { key: 'sobre', label: 'Sobre Nós' },
              { key: 'contato', label: 'Contato' }
            ].map(({ key, label }) => (
              <FormField
                key={key}
                control={form.control}
                name={`secoes.${key}` as any}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          {isEditing ? 'Atualizar Site' : 'Criar Site'}
        </Button>
      </form>
    </Form>
  );
};
