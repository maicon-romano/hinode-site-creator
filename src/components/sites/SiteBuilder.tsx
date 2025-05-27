
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ClientSelector } from './ClientSelector';
import { ModelSelector } from './ModelSelector';
import { FlexibleSiteEditor } from './FlexibleSiteEditor';

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
  const [selectedModel, setSelectedModel] = useState(initialData?.modelId || '');

  const form = useForm({
    defaultValues: {
      clientId: selectedClient,
      clientName: clientName,
      modelId: selectedModel,
      ...initialData
    }
  });

  const steps = [
    { number: 1, title: 'Cliente', description: 'Selecione o cliente' },
    { number: 2, title: 'Modelo', description: 'Escolha o modelo do site' },
    { number: 3, title: 'Conteúdo', description: 'Configure o site' }
  ];

  const canProceedToStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 2: return !!selectedClient;
      case 3: return !!selectedClient && !!selectedModel;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < 3 && canProceedToStep(step + 1)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Form {...form}>
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
              <ModelSelector
                selectedModel={selectedModel}
                onModelSelect={setSelectedModel}
              />
            )}

            {step === 3 && selectedModel && (
              <FlexibleSiteEditor
                modelId={selectedModel}
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
        {step < 3 && (
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
    </Form>
  );
};
