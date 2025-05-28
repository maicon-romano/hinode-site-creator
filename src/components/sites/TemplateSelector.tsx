
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTemplatesByType, TemplateSchema } from '@/data/templateSchemas';

interface TemplateSelectorProps {
  selectedType: 'landing' | 'institucional' | 'portfolio' | 'hinode';
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedType,
  selectedTemplate,
  onTemplateSelect
}) => {
  const templates = getTemplatesByType(selectedType);

  const getTypeDisplayName = (type: string) => {
    const names = {
      'landing': 'Landing Page',
      'institucional': 'Institucional',
      'portfolio': 'Portfólio',
      'hinode': 'Representante Hinode'
    };
    return names[type] || type;
  };

  const getTemplatePreview = (template: TemplateSchema) => {
    const colors = {
      'landing': 'from-blue-500 to-blue-600',
      'institucional': 'from-gray-500 to-gray-600', 
      'portfolio': 'from-purple-500 to-purple-600',
      'hinode': 'from-pink-500 to-rose-500'
    };

    const icons = {
      'landing-premium': '⚡',
      'landing-conversion': '🎯',
      'institucional-corporate': '🏢',
      'portfolio-creative': '🎨',
      'portfolio-developer': '💻',
      'hinode-premium': '💄',
      'hinode-landing': '🌹'
    };

    return (
      <div className={`aspect-video bg-gradient-to-br ${colors[template.type]} rounded-lg mb-3 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10 text-center text-white">
          <div className="text-4xl mb-2">{icons[template.id] || '📄'}</div>
          <div className="text-xs font-medium mb-2">{template.name}</div>
          <div className="space-y-1">
            <div className="w-16 h-1 bg-white/50 rounded mx-auto"></div>
            <div className="w-12 h-1 bg-white/30 rounded mx-auto"></div>
            <div className="w-20 h-1 bg-white/30 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  };

  console.log('TemplateSelector - Tipo selecionado:', selectedType);
  console.log('TemplateSelector - Templates disponíveis:', templates);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">
          Escolha um Template {getTypeDisplayName(selectedType)}
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
                <Badge variant="secondary" className="text-xs capitalize">
                  {template.type}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getTemplatePreview(template)}
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
