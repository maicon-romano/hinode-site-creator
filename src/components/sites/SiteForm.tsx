
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorSelector } from './ColorSelector';
import { ContentEditor } from './ContentEditor';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { processImageData } from '@/lib/imageUtils';

const formSchema = z.object({
  clientId: z.string().min(1, 'ID do cliente é obrigatório'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  templateId: z.string().min(1, 'Template é obrigatório'),
  nomeDoSite: z.string().min(1, 'Nome do site é obrigatório'),
  logoPath: z.string().optional(),
  cores: z.object({
    principal: z.string(),
    fundo: z.string(),
    destaque: z.string(),
    texto: z.string(),
    degradeHero: z.object({
      inicio: z.string(),
      fim: z.string()
    }).optional()
  }),
  activeSections: z.array(z.string()),
});

interface SiteFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

export const SiteForm: React.FC<SiteFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(initialData?.templateId || '');
  const [siteData, setSiteData] = useState(initialData || {});
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: initialData?.clientId || '',
      clientName: initialData?.clientName || '',
      templateId: initialData?.templateId || '',
      nomeDoSite: initialData?.nomeDoSite || '',
      logoPath: initialData?.logoPath || '',
      cores: {
        principal: '#ff006f',
        fundo: '#ffffff', 
        destaque: '#0067c7',
        texto: '#333333',
        degradeHero: {
          inicio: '#0067c7',
          fim: '#00ffcc'
        },
        ...initialData?.cores
      },
      activeSections: initialData?.activeSections || ['hero', 'sobre', 'servicos', 'contato'],
      ...initialData
    }
  });

  const availableTemplates = [
    { id: 'landing-page-vendas', name: 'Landing Page de Vendas' },
    { id: 'site-institucional', name: 'Site Institucional' },
    { id: 'portfolio-profissional', name: 'Portfólio Profissional' },
    { id: 'representante-hinode', name: 'Representante Hinode' }
  ];

  const availableSections = [
    { id: 'hero', name: 'Seção Principal (Hero)' },
    { id: 'sobre', name: 'Sobre Nós' },
    { id: 'servicos', name: 'Serviços/Produtos' },
    { id: 'depoimentos', name: 'Depoimentos' },
    { id: 'contato', name: 'Contato' },
    { id: 'galeria', name: 'Galeria' },
    { id: 'equipe', name: 'Equipe' }
  ];

  useEffect(() => {
    const subscription = form.watch((data) => {
      setSiteData({ ...siteData, ...data });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, siteData]);

  const handleColorChange = (colorType: string, color: string) => {
    if (colorType === 'degradeHero') {
      const degradeData = JSON.parse(color);
      form.setValue('cores.degradeHero', degradeData);
      setSiteData(prev => ({
        ...prev,
        cores: {
          ...prev.cores,
          degradeHero: degradeData
        }
      }));
    } else {
      form.setValue(`cores.${colorType}` as any, color);
      setSiteData(prev => ({
        ...prev,
        cores: {
          ...prev.cores,
          [colorType]: color
        }
      }));
    }
  };

  const handleContentChange = (section: string, field: string, value: any) => {
    const newData = { ...siteData };
    if (!newData[section]) newData[section] = {};
    newData[section][field] = value;
    
    setSiteData(newData);
    form.setValue(section, newData[section]);
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      const fieldParts = field.split('.');
      
      if (fieldParts.length === 1) {
        // Campo simples como 'logoPath'
        form.setValue(field as any, imageData);
        setSiteData(prev => ({ ...prev, [field]: imageData }));
      } else {
        // Campo nested como 'hero.imagem' ou 'cards.0.imagem'
        const newData = { ...siteData };
        let current = newData;
        
        for (let i = 0; i < fieldParts.length - 1; i++) {
          const part = fieldParts[i];
          if (!current[part]) current[part] = {};
          current = current[part];
        }
        
        current[fieldParts[fieldParts.length - 1]] = imageData;
        setSiteData(newData);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSectionToggle = (sectionId: string, enabled: boolean) => {
    const currentSections = form.getValues('activeSections');
    let newSections;
    
    if (enabled) {
      newSections = [...currentSections, sectionId];
    } else {
      newSections = currentSections.filter(id => id !== sectionId);
    }
    
    form.setValue('activeSections', newSections);
  };

  const handleSubmit = (data: any) => {
    const completeData = { ...siteData, ...data };
    onSubmit(completeData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {/* Formulário de Edição */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações Básicas</h3>
              
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="cliente-123" {...field} />
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
                      <Input placeholder="João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nomeDoSite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Site</FormLabel>
                    <FormControl>
                      <Input placeholder="Minha Empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedTemplate(value);
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload do Logo */}
              <FormItem>
                <FormLabel>Logo do Site</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('logoPath', file);
                      }}
                    />
                    {siteData.logoPath && (
                      <img 
                        src={siteData.logoPath} 
                        alt="Logo Preview" 
                        className="w-32 h-32 object-contain border rounded"
                      />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="colors">Cores</TabsTrigger>
                <TabsTrigger value="sections">Seções</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                {form.getValues('activeSections').map((sectionId) => (
                  <ContentEditor
                    key={sectionId}
                    sectionType={sectionId}
                    sectionData={siteData[sectionId] || {}}
                    onContentChange={(field, value) => handleContentChange(sectionId, field, value)}
                    onImageUpload={handleImageUpload}
                  />
                ))}
              </TabsContent>

              <TabsContent value="colors">
                <ColorSelector
                  colors={form.getValues('cores')}
                  onColorChange={handleColorChange}
                />
              </TabsContent>

              <TabsContent value="sections" className="space-y-4">
                <h3 className="text-lg font-medium">Seções Ativas</h3>
                {availableSections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-3 border rounded">
                    <span>{section.name}</span>
                    <Switch
                      checked={form.getValues('activeSections').includes(section.id)}
                      onCheckedChange={(checked) => handleSectionToggle(section.id, checked)}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full">
              {isEditing ? 'Atualizar Site' : 'Criar Site'}
            </Button>
          </form>
        </Form>
      </div>

      {/* Preview do Site */}
      <div className="lg:sticky lg:top-4">
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="p-3 bg-gray-50 border-b">
            <h4 className="font-medium">Preview do Site</h4>
          </div>
          <div className="h-[600px] overflow-y-auto">
            <TemplateRenderer siteData={siteData} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
