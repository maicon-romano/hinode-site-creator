
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
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
  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Preview do Site</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onTogglePreview}
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Ocultar
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Mostrar
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {showPreview && (
        <CardContent className="p-0">
          <div className="border-t">
            <div className="bg-gray-100 px-3 py-2 border-b">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-xs text-gray-600 font-mono">
                  {siteData?.nomeDoSite || 'Preview do Site'}
                </div>
              </div>
            </div>
            
            <div className="relative bg-white">
              {/* Container com escala reduzida para simular preview */}
              <div className="transform scale-[0.4] origin-top-left w-[250%] h-[600px] overflow-hidden">
                <div style={{ 
                  position: 'relative',
                  width: '100vw',
                  height: '100vh',
                  overflow: 'hidden'
                }}>
                  <TemplateRenderer 
                    siteData={siteData} 
                    isPreview={true}
                  />
                </div>
              </div>
              
              {/* Overlay para capturar cliques no preview */}
              <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
