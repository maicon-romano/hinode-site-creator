
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTemplatesByType, TemplateSchema } from '@/data/templateSchemas';

interface TemplateSelectorProps {
  selectedType: 'landing' | 'institucional';
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedType,
  selectedTemplate,
  onTemplateSelect
}) => {
  const templates = getTemplatesByType(selectedType);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">
          Escolha um Template {selectedType === 'landing' ? 'de Landing Page' : 'Institucional'}
        </h3>
        <p className="text-sm text-gray-600">
          Selecione o design que melhor se adequa ao seu projeto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template: TemplateSchema) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {template.type}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Preview</span>
              </div>
              <Button 
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateSelect(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selecionado' : 'Selecionar'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
