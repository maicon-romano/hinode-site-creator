
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ClientSelector } from './ClientSelector';
import { TemplateSelector } from './TemplateSelector';
import { DynamicSiteEditor } from './DynamicSiteEditor';

interface SiteBuilderProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

export const SiteBuilder: React.FC<SiteBuilderProps> = ({
  initialData,
  onSubmit,
  isEditing = false
}) => {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(initialData?.clientId || '');
  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [siteType, setSiteType] = useState<'landing' | 'institucional'>(
    initialData?.templateId?.startsWith('landing') ? 'landing' : 'institucional'
  );
  const [selectedTemplate, setSelectedTemplate] = useState(initialData?.templateId || '');

  const steps = [
    { number: 1, title: 'Cliente', description: 'Selecione o cliente' },
    { number: 2, title: 'Tipo', description: 'Escolha o tipo de site' },
    { number: 3, title: 'Template', description: 'Selecione o design' },
    { number: 4, title: 'Conteúdo', description: 'Configure o site' }
  ];

  const canProceedToStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 2: return !!selectedClient;
      case 3: return !!selectedClient && !!siteType;
      case 4: return !!selectedClient && !!siteType && !!selectedTemplate;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < 4 && canProceedToStep(step + 1)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSiteTypeChange = (type: 'landing' | 'institucional') => {
    setSiteType(type);
    setSelectedTemplate(''); // Reset template when type changes
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= stepItem.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className="text-sm font-medium">{stepItem.title}</p>
                  <p className="text-xs text-gray-500">{stepItem.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step > stepItem.number ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {steps[step - 1].title}: {steps[step - 1].description}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <ClientSelector
              value={selectedClient}
              onValueChange={setSelectedClient}
              onClientDataChange={setClientName}
            />
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Que tipo de site você quer criar?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    siteType === 'landing' ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSiteTypeChange('landing')}
                >
                  <CardContent className="p-6 text-center">
                    <h4 className="font-medium mb-2">Landing Page</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Página focada em conversão, ideal para campanhas e produtos específicos
                    </p>
                    <Button 
                      variant={siteType === 'landing' ? "default" : "outline"}
                      size="sm"
                    >
                      {siteType === 'landing' ? 'Selecionado' : 'Selecionar'}
                    </Button>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    siteType === 'institucional' ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSiteTypeChange('institucional')}
                >
                  <CardContent className="p-6 text-center">
                    <h4 className="font-medium mb-2">Site Institucional</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Site completo da empresa com informações detalhadas e seções corporativas
                    </p>
                    <Button 
                      variant={siteType === 'institucional' ? "default" : "outline"}
                      size="sm"
                    >
                      {siteType === 'institucional' ? 'Selecionado' : 'Selecionar'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 3 && siteType && (
            <TemplateSelector
              selectedType={siteType}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
          )}

          {step === 4 && selectedTemplate && (
            <DynamicSiteEditor
              templateId={selectedTemplate}
              clientId={selectedClient}
              clientName={clientName}
              initialData={initialData}
              onSubmit={onSubmit}
              isEditing={isEditing}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceedToStep(step + 1)}
          >
            Próximo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};
