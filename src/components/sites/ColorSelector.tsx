
import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ColorSelectorProps {
  colors: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
    degradeHero?: {
      inicio: string;
      fim: string;
    };
  };
  onColorChange: (colorType: string, color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onColorChange }) => {
  const handleDegradeChange = (position: 'inicio' | 'fim', color: string) => {
    const currentDegrade = colors.degradeHero || { inicio: '#0067c7', fim: '#00ffcc' };
    const newDegrade = { ...currentDegrade, [position]: color };
    onColorChange('degradeHero', newDegrade);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personalização de Cores</h3>
      
      {/* Cores Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="#ff006f"
              />
            </div>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Cor de Destaque</FormLabel>
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
                placeholder="#0067c7"
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

      {/* Degradê Hero */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Degradê da Seção Hero</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Cor Inicial do Degradê</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors.degradeHero?.inicio || '#0067c7'}
                  onChange={(e) => handleDegradeChange('inicio', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={colors.degradeHero?.inicio || '#0067c7'}
                  onChange={(e) => handleDegradeChange('inicio', e.target.value)}
                  placeholder="#0067c7"
                />
              </div>
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Cor Final do Degradê</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors.degradeHero?.fim || '#00ffcc'}
                  onChange={(e) => handleDegradeChange('fim', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={colors.degradeHero?.fim || '#00ffcc'}
                  onChange={(e) => handleDegradeChange('fim', e.target.value)}
                  placeholder="#00ffcc"
                />
              </div>
            </FormControl>
          </FormItem>
        </div>

        {/* Preview do Degradê */}
        <div className="mt-4">
          <FormLabel>Preview do Degradê</FormLabel>
          <div 
            className="w-full h-12 rounded-lg border mt-2"
            style={{
              background: `linear-gradient(135deg, ${colors.degradeHero?.inicio || '#0067c7'}, ${colors.degradeHero?.fim || '#00ffcc'})`
            }}
          />
        </div>
      </div>
    </div>
  );
};
