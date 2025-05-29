
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, Save, Loader2 } from 'lucide-react';
import { DynamicFields } from './DynamicFields';
import { ColorSelector } from './ColorSelector';
import { ClientSelector } from './ClientSelector';
import { LogoUpload } from './LogoUpload';
import { TemplatePreview } from './TemplatePreview';
import { useAuth } from '@/contexts/AuthContext';

interface DynamicSiteEditorProps {
  modelConfig: any;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  clientId?: string;
}

export const DynamicSiteEditor: React.FC<DynamicSiteEditorProps> = ({
  modelConfig,
  onSubmit,
  initialData,
  clientId: propClientId
}) => {
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState(propClientId || '');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [previewData, setPreviewData] = useState(null);

  const methods = useForm({
    defaultValues: {
      nomeDoSite: initialData?.nomeDoSite || '',
      logoPath: initialData?.logoPath || '',
      cores: {
        principal: '#0066cc',
        fundo: '#ffffff',
        destaque: '#ff6b35',
        texto: '#333333',
        degradeHero: {
          inicio: '#0067c7',
          fim: '#00ffcc'
        }
      },
      activeSections: initialData?.activeSections || modelConfig.sections?.map((s: any) => s.id) || [],
      sectionsOrder: initialData?.sectionsOrder || modelConfig.sections?.map((s: any) => s.id) || [],
      templateId: initialData?.templateId || modelConfig.id,
      ...initialData
    }
  });

  const { handleSubmit, getValues, setValue, watch } = methods;

  // Watch for form changes to update preview
  const formData = watch();

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  // Update preview data when form changes
  useEffect(() => {
    const currentValues = getValues();
    const activeSections = currentValues.activeSections || [];
    
    // Collect section data dynamically
    const sectionData: any = {};
    activeSections.forEach((sectionId: string) => {
      const sectionValues = getValues(sectionId);
      if (sectionValues && Object.keys(sectionValues).length > 0) {
        sectionData[sectionId] = sectionValues;
      }
    });

    const previewPayload = {
      ...currentValues,
      ...sectionData,
      clientId: selectedClientId,
    };

    setPreviewData(previewPayload);
  }, [formData, selectedClientId, getValues]);

  const onFormSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting form data:', data);

      const activeSections = data.activeSections || [];
      
      // Collect section data dynamically
      const sectionData: any = {};
      activeSections.forEach((sectionId: string) => {
        const sectionValues = getValues(sectionId);
        console.log(`Section ${sectionId} values:`, sectionValues);
        if (sectionValues && Object.keys(sectionValues).length > 0) {
          sectionData[sectionId] = sectionValues;
        }
      });

      // Prepare final payload
      const payload = {
        nomeDoSite: data.nomeDoSite,
        logoPath: data.logoPath,
        cores: {
          principal: data.cores?.principal || '#0066cc',
          fundo: data.cores?.fundo || '#ffffff',
          destaque: data.cores?.destaque || '#ff6b35',
          texto: data.cores?.texto || '#333333',
          degradeHero: {
            inicio: data.cores?.degradeHero?.inicio || '#0067c7',
            fim: data.cores?.degradeHero?.fim || '#00ffcc'
          }
        },
        activeSections,
        sectionsOrder: data.sectionsOrder || activeSections,
        templateId: data.templateId,
        modelId: modelConfig.id,
        clientId: selectedClientId,
        ...sectionData
      };

      console.log('Final payload being sent:', payload);
      await onSubmit(payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (logoPath: string) => {
    setValue('logoPath', logoPath);
    console.log('Logo updated:', logoPath);
  };

  const handlePreviewClick = () => {
    const currentValues = getValues();
    const activeSections = currentValues.activeSections || [];
    
    // Collect all current form data including sections
    const sectionData: any = {};
    activeSections.forEach((sectionId: string) => {
      const sectionValues = getValues(sectionId);
      if (sectionValues && Object.keys(sectionValues).length > 0) {
        sectionData[sectionId] = sectionValues;
      }
    });

    const previewPayload = {
      ...currentValues,
      ...sectionData,
      clientId: selectedClientId,
    };

    setPreviewData(previewPayload);
    setShowPreview(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="space-y-6 overflow-y-auto max-h-screen">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {modelConfig.name}
              <Badge variant="outline">{modelConfig.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Client Selector for Admin */}
                {userData?.tipo === 'admin' && (
                  <>
                    <ClientSelector
                      value={selectedClientId}
                      onValueChange={setSelectedClientId}
                      onClientDataChange={setSelectedClientName}
                    />
                    <Separator />
                  </>
                )}

                {/* Basic Site Info */}
                <DynamicFields
                  fields={[
                    {
                      name: 'nomeDoSite',
                      label: 'Nome do Site',
                      type: 'text',
                      placeholder: 'Digite o nome do seu site',
                      required: true
                    }
                  ]}
                />

                {/* Logo Upload */}
                <LogoUpload
                  clientId={selectedClientId}
                  currentLogo={getValues('logoPath')}
                  onLogoChange={handleLogoChange}
                />

                <Separator />

                {/* Color Selector */}
                <ColorSelector />

                <Separator />

                {/* Dynamic Sections */}
                {modelConfig.sections?.map((section: any) => (
                  <div key={section.id} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      <Badge variant="secondary">{section.id}</Badge>
                    </div>
                    <DynamicFields fields={section.fields} prefix={section.id} />
                    <Separator />
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviewClick}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Site
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="lg:block">
        <TemplatePreview
          siteData={previewData}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
      </div>
    </div>
  );
};
