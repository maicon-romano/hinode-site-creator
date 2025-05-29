
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface LogoUploadProps {
  clientId: string;
  currentLogo?: string;
  onLogoChange: (logoPath: string) => void;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({
  clientId,
  currentLogo,
  onLogoChange
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('LogoUpload - Arquivo selecionado:', file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        console.log('LogoUpload - Arquivo convertido para base64');
        
        // Criar uma URL blob para preview imediato
        const blob = new Blob([file], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        
        // Armazenar a URL blob para uso imediato
        if (!window.logoCache) {
          window.logoCache = new Map();
        }
        
        const logoPath = `/sites/${clientId}/logo_${Date.now()}.${file.name.split('.').pop()}`;
        window.logoCache.set(logoPath, blobUrl);
        
        console.log('LogoUpload - Logo salvo em cache:', logoPath, '->', blobUrl);
        
        // Retornar o base64 para processamento posterior
        onLogoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    console.log('LogoUpload - Removendo logo');
    onLogoChange('');
  };

  // Obter URL real para exibição
  const getLogoUrl = (logoPath: string): string => {
    if (!logoPath) return '';
    
    // Se é base64, usar diretamente
    if (logoPath.startsWith('data:image/')) {
      return logoPath;
    }
    
    // Se é blob URL, usar diretamente
    if (logoPath.startsWith('blob:')) {
      return logoPath;
    }
    
    // Verificar cache de logos
    if (window.logoCache && window.logoCache.has(logoPath)) {
      return window.logoCache.get(logoPath);
    }
    
    // Verificar cache de imagens geral
    if (window.imageCache && window.imageCache.has(logoPath)) {
      return window.imageCache.get(logoPath);
    }
    
    return logoPath;
  };

  const displayLogo = getLogoUrl(currentLogo || '');

  return (
    <FormItem>
      <FormLabel>Logo do Site</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {displayLogo ? (
            <div className="flex items-center gap-4">
              <img 
                src={displayLogo} 
                alt="Logo atual" 
                className="w-20 h-20 object-contain border rounded-lg bg-white p-2"
                onError={(e) => {
                  console.log('LogoUpload - Erro ao carregar imagem:', displayLogo);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeLogo}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remover Logo
                </Button>
                <label className="cursor-pointer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Logo
                    </span>
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Clique para fazer upload do logo
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG ou SVG até 5MB
                </p>
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

// Estender interface global para TypeScript
declare global {
  interface Window {
    logoCache: Map<string, string>;
  }
}
