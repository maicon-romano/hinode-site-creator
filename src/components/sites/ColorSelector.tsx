
import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ColorSelectorProps {
  colors: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  onColorChange: (colorType: string, color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onColorChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personalização de Cores</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Cor Principal</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                type="color"
                value={colors.principal}
                onChange={(e) => onColorChange('principal', e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={colors.principal}
                onChange={(e) => onColorChange('principal', e.target.value)}
                placeholder="#ff6b35"
              />
            </div>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Cor de Fundo</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                type="color"
                value={colors.fundo}
                onChange={(e) => onColorChange('fundo', e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={colors.fundo}
                onChange={(e) => onColorChange('fundo', e.target.value)}
                placeholder="#ffffff"
              />
            </div>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Cor de Destaque (Botões)</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                type="color"
                value={colors.destaque}
                onChange={(e) => onColorChange('destaque', e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={colors.destaque}
                onChange={(e) => onColorChange('destaque', e.target.value)}
                placeholder="#0066cc"
              />
            </div>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Cor do Texto</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                type="color"
                value={colors.texto}
                onChange={(e) => onColorChange('texto', e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={colors.texto}
                onChange={(e) => onColorChange('texto', e.target.value)}
                placeholder="#333333"
              />
            </div>
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
};
