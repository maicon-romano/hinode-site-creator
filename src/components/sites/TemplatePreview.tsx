
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';

interface TemplatePreviewProps {
  siteData: any;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  siteData,
  showPreview,
  onTogglePreview
}) => {
  // Dados padrão para preview
  const previewData = {
    nomeDoSite: siteData.nomeDoSite || 'Exemplo Site',
    headline: siteData.headline || 'Seu Headline Aqui',
    descricao: siteData.descricao || 'Descrição do seu negócio aqui.',
    videoUrl: siteData.videoUrl || '',
    whatsapp: siteData.whatsapp || '5511999999999',
    template: siteData.template || 'landing',
    logoPath: siteData.logoPath || '',
    cores: {
      principal: siteData.cores?.principal || '#ff6b35',
      fundo: siteData.cores?.fundo || '#ffffff',
      destaque: siteData.cores?.destaque || '#0066cc',
      texto: siteData.cores?.texto || '#333333',
    },
    secoes: {
      video: siteData.secoes?.video ?? true,
      formulario: siteData.secoes?.formulario ?? true,
      depoimentos: siteData.secoes?.depoimentos ?? true,
      sobre: siteData.secoes?.sobre ?? true,
      contato: siteData.secoes?.contato ?? true,
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview do Template</h3>
        <Button
          type="button"
          variant="outline"
          onClick={onTogglePreview}
        >
          <Eye className="h-4 w-4 mr-2" />
          {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
        </Button>
      </div>

      {showPreview && (
        <Card className="max-h-[600px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              Preview - {previewData.template === 'landing' ? 'Landing Page' : 'Institucional'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="transform scale-50 origin-top-left w-[200%] h-[120%] overflow-hidden">
              <TemplateRenderer siteData={previewData} isPreview={true} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
