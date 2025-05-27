
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Trash2, GripVertical } from 'lucide-react';
import { getTemplateSchema, TemplateSchema, SectionSchema, FieldSchema } from '@/data/templateSchemas';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';

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
  const templateSchema = getTemplateSchema(templateId);
  const [activeSections, setActiveSections] = useState<Set<string>>(
    new Set(templateSchema?.sections.map(s => s.key) || [])
  );
  const [colors, setColors] = useState({
    principal: initialData?.cores?.principal || '#ff6b35',
    fundo: initialData?.cores?.fundo || '#ffffff',
    destaque: initialData?.cores?.destaque || '#0066cc',
    texto: initialData?.cores?.texto || '#333333'
  });

  // Move useForm() para dentro deste componente para garantir o contexto adequado
  const methods = useForm({
    defaultValues: {
      clientId,
      clientName,
      templateId,
      nomeDoSite: initialData?.nomeDoSite || '',
      logoPath: initialData?.logoPath || '',
      cores: colors,
      ...initialData
    }
  });

  if (!templateSchema) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Template não encontrado</p>
      </div>
    );
  }

  const handleColorChange = (colorType: string, color: string) => {
    setColors(prev => ({ ...prev, [colorType]: color }));
    methods.setValue('cores', { ...colors, [colorType]: color });
  };

  const toggleSection = (sectionKey: string) => {
    const newActiveSections = new Set(activeSections);
    if (newActiveSections.has(sectionKey)) {
      newActiveSections.delete(sectionKey);
    } else {
      newActiveSections.add(sectionKey);
    }
    setActiveSections(newActiveSections);
  };

  const renderField = (field: FieldSchema, sectionKey: string) => {
    const fieldName = `${sectionKey}.${field.key}`;

    switch (field.type) {
      case 'boolean':
        return (
          <FormField
            key={fieldName}
            control={methods.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.label}</FormLabel>
                  {field.description && (
                    <p className="text-xs text-gray-500">{field.description}</p>
                  )}
                </div>
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            key={fieldName}
            control={methods.control}
            name={fieldName}
            rules={{ required: field.required ? `${field.label} é obrigatório` : false }}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Select value={formField.value} onValueChange={formField.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
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
        );

      case 'textarea':
        return (
          <FormField
            key={fieldName}
            control={methods.control}
            name={fieldName}
            rules={{ required: field.required ? `${field.label} é obrigatório` : false }}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    className="min-h-[100px]"
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <p className="text-xs text-gray-500">{field.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'color':
        return (
          <FormField
            key={fieldName}
            control={methods.control}
            name={fieldName}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={formField.value || '#000000'}
                      onChange={formField.onChange}
                      className="w-16 h-10 border rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formField.value || ''}
                      onChange={formField.onChange}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
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
            control={methods.control}
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

      default:
        return (
          <FormField
            key={fieldName}
            control={methods.control}
            name={fieldName}
            rules={{ required: field.required ? `${field.label} é obrigatório` : false }}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type === 'url' ? 'url' : 'text'}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <p className="text-xs text-gray-500">{field.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  const handleSubmit = (data: any) => {
    onSubmit({
      ...data,
      cores: colors,
      activeSections: Array.from(activeSections)
    });
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Informações Básicas
                <Badge variant="secondary">{templateSchema.name}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
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
                currentLogo={methods.watch('logoPath')}
                onLogoChange={(logoPath) => methods.setValue('logoPath', logoPath)}
              />
            </CardContent>
          </Card>

          {/* Cores do Site */}
          <ColorSelector
            colors={colors}
            onColorChange={handleColorChange}
          />

          {/* Seções do Template */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Conteúdo do Site</h3>
            <p className="text-sm text-gray-600">
              Configure cada seção do seu site. Use os controles para ativar/desativar ou remover seções.
            </p>

            {templateSchema.sections.map((section: SectionSchema) => {
              const isActive = activeSections.has(section.key);
              
              return (
                <Card key={section.key} className={!isActive ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <div>
                          <CardTitle className="text-base">{section.label}</CardTitle>
                          {section.description && (
                            <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSection(section.key)}
                        >
                          {isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        {section.removable && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSection(section.key)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isActive && (
                    <CardContent className="space-y-4">
                      {section.fields.map((field: FieldSchema) => renderField(field, section.key))}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Separator />

          <Button type="submit" className="w-full" size="lg">
            {isEditing ? 'Atualizar Site' : 'Criar Site'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};
