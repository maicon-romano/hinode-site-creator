
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
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        console.log('Logo carregada como base64:', result.substring(0, 100) + '...');
        onLogoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoChange('');
  };

  return (
    <FormItem>
      <FormLabel>Logo do Site</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {currentLogo ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={currentLogo} 
                  alt="Logo atual" 
                  className="w-20 h-20 object-contain border rounded-lg bg-white p-2"
                  onError={(e) => {
                    console.error('Erro ao carregar logo:', currentLogo);
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMyNC40MTgzIDI4IDI4IDI0LjQxODMgMjggMjBDMjggMTUuNTgxNyAyNC40MTgzIDEyIDIwIDEyQzE1LjU4MTcgMTIgMTIgMTUuNTgxNyAxMiAyMEMxMiAyNC40MTgzIDE1LjU4MTcgMjggMjAgMjhaIiBmaWxsPSIjOUI5QkE0Ii8+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
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
