
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { getSiteModelsByCategory, SiteModel } from '@/data/siteModels';
import { FlexibleSiteRenderer } from '@/components/templates/FlexibleSiteRenderer';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelSelect
}) => {
  const [previewModel, setPreviewModel] = useState<string | null>(null);
  const models = getSiteModelsByCategory();

  const getPreviewData = (model: SiteModel) => ({
    modelId: model.id,
    nomeDoSite: 'Preview - ' + model.nome,
    logoPath: '',
    cores: {
      principal: '#0066cc',
      fundo: '#ffffff',
      destaque: '#ff6b35',
      texto: '#333333',
    },
    whatsapp: '5511999999999',
    layout: model.secoesPadrao
  });

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'vendas': return 'bg-green-100 text-green-800';
      case 'institucional': return 'bg-blue-100 text-blue-800';
      case 'portfolio': return 'bg-purple-100 text-purple-800';
      case 'hinode': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModelPreview = (model: SiteModel) => {
    const colors = {
      vendas: 'from-green-500 to-emerald-600',
      institucional: 'from-blue-500 to-blue-600',
      portfolio: 'from-purple-500 to-purple-600',
      hinode: 'from-orange-500 to-orange-600'
    };

    return (
      <div className={`w-full h-32 bg-gradient-to-r ${colors[model.categoria]} rounded-t relative overflow-hidden`}>
        <div className="absolute inset-0 p-3">
          <div className="bg-white/20 rounded text-xs text-white text-center py-1 mb-2">
            {model.nome}
          </div>
          <div className="space-y-1">
            {model.secoesPadrao.slice(0, 3).map((secao, index) => (
              <div key={index} className="bg-white/20 rounded h-2"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">
          Escolha o Modelo do Seu Site
        </h3>
        <p className="text-sm text-gray-600">
          Selecione o modelo que melhor se adequa ao seu objetivo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model: SiteModel) => (
          <Card 
            key={model.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedModel === model.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onModelSelect(model.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{model.nome}</CardTitle>
                <Badge className={getCategoryColor(model.categoria)}>
                  {model.categoria}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {model.descricao}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getModelPreview(model)}
              <div className="flex gap-2 mt-3">
                <Button 
                  variant={selectedModel === model.id ? "default" : "outline"}
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onModelSelect(model.id);
                  }}
                >
                  {selectedModel === model.id ? 'Selecionado' : 'Selecionar'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewModel(model.id);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!previewModel} onOpenChange={() => setPreviewModel(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Preview - {models.find(m => m.id === previewModel)?.nome}
            </DialogTitle>
          </DialogHeader>
          {previewModel && (
            <div className="w-full h-[600px] overflow-hidden bg-white border rounded">
              <div className="transform scale-[0.3] origin-top-left w-[333.33%] h-[333.33%] overflow-auto">
                <FlexibleSiteRenderer 
                  siteData={getPreviewData(models.find(m => m.id === previewModel)!)} 
                  isPreview={true} 
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
