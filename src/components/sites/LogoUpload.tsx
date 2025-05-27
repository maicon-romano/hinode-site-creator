
import React, { useState } from 'react';
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
  const [preview, setPreview] = useState<string | null>(currentLogo || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !clientId) return;

    setUploading(true);
    
    try {
      // Criar preview imediato
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        // Usar o data URL diretamente como logo path
        onLogoChange(result);
        console.log('Logo carregado com sucesso');
      };
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Erro ao fazer upload do logo:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = () => {
    setPreview(null);
    onLogoChange('');
  };

  return (
    <FormItem>
      <FormLabel>Logo do Site</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {preview ? (
            <div className="relative inline-block">
              <img 
                src={preview} 
                alt="Preview do logo" 
                className="w-32 h-32 object-contain border rounded-lg bg-white"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2"
                onClick={removeLogo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Clique para fazer upload do logo
              </p>
            </div>
          )}
          
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading || !clientId}
            className="cursor-pointer"
          />
          
          {uploading && (
            <p className="text-sm text-blue-600">
              Fazendo upload...
            </p>
          )}
          
          {!clientId && (
            <p className="text-sm text-orange-600">
              Selecione um cliente primeiro para fazer upload do logo
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
