
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { DynamicFields } from './DynamicFields';
import { ColorSelector } from './ColorSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';
import { processImageData } from '@/lib/imageUtils';

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
  const [showPreview, setShowPreview] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(initialData?.logoPath || '');

  // Configuração dos modelos de site
  const modelConfigs = {
    'representante-hinode': {
      name: 'Site Representante Hinode',
      sections: [
        {
          id: 'hero-hinode',
          name: 'Apresentação Principal',
          fields: [
            { name: 'titulo', label: 'Título Principal', type: 'text', placeholder: 'Seu nome aqui', required: true },
            { name: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Seu cargo ou especialização' },
            { name: 'texto', label: 'Texto de Apresentação', type: 'textarea', placeholder: 'Conte um pouco sobre você...' },
            { name: 'video', label: 'Link do Vídeo YouTube', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
            { name: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Fale Comigo' },
            { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '5511999999999' }
          ]
        },
        {
          id: 'bio',
          name: 'Biografia',
          fields: [
            { name: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Sobre Mim', required: true },
            { name: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Representante Hinode' },
            { name: 'texto', label: 'Biografia', type: 'textarea', placeholder: 'Conte sua história...' },
            { name: 'imagem', label: 'Sua Foto', type: 'file', accept: 'image/*' },
            { name: 'experiencia', label: 'Anos de Experiência', type: 'text', placeholder: '5 anos' },
            { name: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Entre em Contato' }
          ]
        },
        {
          id: 'sobre-hinode',
          name: 'Sobre a Hinode',
          fields: [
            { name: 'titulo', label: 'Título', type: 'text', placeholder: 'Sobre a Hinode', required: true },
            { name: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Empresa japonesa líder em cosméticos' },
            { name: 'texto', label: 'Descrição da Empresa', type: 'textarea', placeholder: 'A Hinode é uma empresa...' },
            { name: 'imagem', label: 'Logo/Imagem Hinode', type: 'file', accept: 'image/*' }
          ]
        },
        {
          id: 'produtos-destaque',
          name: 'Produtos em Destaque',
          fields: [
            { name: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Produtos em Destaque', required: true },
            { name: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Conheça nossos principais produtos' },
            { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Descrição dos produtos...' }
          ]
        },
        {
          id: 'contato',
          name: 'Contato',
          fields: [
            { name: 'titulo', label: 'Título', type: 'text', placeholder: 'Entre em Contato', required: true },
            { name: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Estou aqui para ajudar você!' },
            { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '5511999999999' },
            { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '(11) 99999-9999' },
            { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
            { name: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Cidade, Estado' }
          ]
        }
      ]
    }
  };

  const currentModel = modelConfigs[templateId as keyof typeof modelConfigs] || modelConfigs['representante-hinode'];

  // Definir seções ativas e cores padrão
  const defaultColors = {
    principal: '#0067c7',
    fundo: '#ffffff',
    destaque: '#ff6b35',
    texto: '#333333',
    degradeHero: {
      inicio: '#0067c7',
      fim: '#00ffcc'
    }
  };

  const defaultValues = {
    templateId,
    modelId: templateId,
    clientId,
    clientName,
    nomeDoSite: clientName || 'Meu Site',
    logoPath: currentLogo,
    cores: initialData?.cores || defaultColors,
    activeSections: currentModel.sections.map(s => s.id),
    whatsapp: initialData?.whatsapp || '',
    // Inicializar cada seção com dados existentes ou vazios
    ...currentModel.sections.reduce((acc, section) => {
      acc[section.id] = initialData?.[section.id] || {};
      return acc;
    }, {} as any),
    ...initialData
  };

  const form = useForm({
    defaultValues
  });

  console.log('DynamicSiteEditor - Dados iniciais:', defaultValues);
  console.log('DynamicSiteEditor - Template ID:', templateId);

  // Preparar dados para preview em tempo real
  const currentFormData = form.watch();
  
  const previewData = {
    ...currentFormData,
    logoPath: currentLogo,
    cores: currentFormData.cores || defaultColors,
    activeSections: currentModel.sections.map(s => s.id)
  };

  const handleSubmit = async (data: any) => {
    console.log('DynamicSiteEditor - Iniciando handleSubmit com dados:', data);
    
    try {
      setIsSubmitting(true);

      // Coletar TODOS os dados do formulário
      const allFormData = form.getValues();
      console.log('DynamicSiteEditor - Todos os dados do form:', allFormData);

      // Construir objeto de dados completo
      const completeData = {
        templateId,
        modelId: templateId,
        clientId,
        clientName,
        nomeDoSite: allFormData.nomeDoSite || clientName || 'Meu Site',
        logoPath: currentLogo,
        cores: allFormData.cores || defaultColors,
        activeSections: currentModel.sections.map(s => s.id),
        whatsapp: allFormData.whatsapp || '',
        // Incluir dados de cada seção
        ...currentModel.sections.reduce((acc, section) => {
          const sectionData = allFormData[section.id] || {};
          console.log(`DynamicSiteEditor - Dados da seção ${section.id}:`, sectionData);
          acc[section.id] = sectionData;
          return acc;
        }, {} as any),
        // Garantir que outros dados sejam preservados
        ...allFormData
      };

      console.log('DynamicSiteEditor - Dados completos para processamento:', completeData);

      // Processar imagens e salvar
      const processedData = processImageData(completeData, clientId);
      console.log('DynamicSiteEditor - Dados processados:', processedData);

      await onSubmit(processedData);
      
      toast.success('Site salvo com sucesso!');
    } catch (error) {
      console.error('DynamicSiteEditor - Erro ao salvar:', error);
      toast.error('Erro ao salvar o site. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (logoPath: string) => {
    console.log('DynamicSiteEditor - Logo alterado:', logoPath);
    setCurrentLogo(logoPath);
    form.setValue('logoPath', logoPath);
  };

  const handleColorChange = (colors: any) => {
    console.log('DynamicSiteEditor - Cores alteradas:', colors);
    form.setValue('cores', colors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Painel de Edição */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <DynamicFields 
                  control={form.control}
                  fields={[
                    { name: 'nomeDoSite', label: 'Nome do Site', type: 'text', placeholder: clientName, required: true }
                  ]}
                />

                <LogoUpload
                  clientId={clientId}
                  currentLogo={currentLogo}
                  onLogoChange={handleLogoChange}
                />

                <ColorSelector
                  colors={form.watch('cores') || defaultColors}
                  onColorChange={handleColorChange}
                />
              </CardContent>
            </Card>

            {/* Seções do Template */}
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo do Site</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={currentModel.sections[0]?.id} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                    {currentModel.sections.map((section) => (
                      <TabsTrigger key={section.id} value={section.id} className="text-xs">
                        {section.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {currentModel.sections.map((section) => (
                    <TabsContent key={section.id} value={section.id} className="space-y-4">
                      <div className="py-4">
                        <h3 className="text-lg font-semibold mb-4">{section.name}</h3>
                        <DynamicFields 
                          control={form.control}
                          fields={section.fields}
                          prefix={section.id}
                        />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar Site' : 'Criar Site')}
            </Button>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-6">
            <TemplatePreview
              siteData={previewData}
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
