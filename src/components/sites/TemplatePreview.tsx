
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : 'sticky top-6'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Preview do Site</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Sair do modo tela cheia' : 'Modo tela cheia'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
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
            
            <div className="relative bg-white" style={{ 
              height: isFullscreen ? 'calc(100vh - 200px)' : '600px' 
            }}>
              {/* Container com escala reduzida para simular preview */}
              <div 
                className={`transform origin-top-left overflow-hidden ${
                  isFullscreen 
                    ? 'scale-75 w-[133%] h-[133%]' 
                    : 'scale-[0.4] w-[250%] h-[250%]'
                }`}
                style={{
                  position: 'relative',
                  width: isFullscreen ? '133%' : '250%',
                  height: isFullscreen ? '133%' : '250%'
                }}
              >
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
              {!isFullscreen && (
                <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
