
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
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
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
              <img 
                src={currentLogo} 
                alt="Logo atual" 
                className="w-20 h-20 object-contain border rounded-lg bg-white p-2"
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
