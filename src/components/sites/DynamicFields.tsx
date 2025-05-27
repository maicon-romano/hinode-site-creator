
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface DynamicFieldsProps {
  template: string;
  variation: string;
  form: UseFormReturn<any>;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({ 
  template, 
  variation, 
  form 
}) => {
  const getFieldsForTemplate = () => {
    const baseFields = [
      { key: 'headline', label: 'Título Principal', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea', required: true },
      { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
    ];

    // Campos específicos para Landing Page
    if (template === 'landing') {
      if (variation === 'video') {
        return [
          ...baseFields,
          { key: 'videoUrl', label: 'URL do Vídeo (YouTube)', type: 'text', required: false, placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'beneficios', label: 'Benefícios (separados por vírgula)', type: 'text', required: false }
        ];
      } else if (variation === 'minimal') {
        return [
          ...baseFields,
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', required: false },
          { key: 'chamadaAcao', label: 'Texto do Botão', type: 'text', required: false }
        ];
      } else if (variation === 'modern') {
        return [
          ...baseFields,
          { key: 'caracteristicas', label: 'Características (separadas por vírgula)', type: 'text', required: false },
          { key: 'destaques', label: 'Destaques (separados por vírgula)', type: 'text', required: false }
        ];
      }
    }

    // Campos específicos para Institucional
    if (template === 'institucional') {
      const institucionalBase = [
        ...baseFields,
        { key: 'missao', label: 'Missão', type: 'textarea', required: false },
        { key: 'visao', label: 'Visão', type: 'textarea', required: false },
        { key: 'valores', label: 'Valores', type: 'textarea', required: false }
      ];

      if (variation === 'banner') {
        return [
          ...institucionalBase,
          { key: 'imagemBanner', label: 'URL da Imagem do Banner', type: 'text', required: false }
        ];
      } else if (variation === 'corporate') {
        return [
          ...institucionalBase,
          { key: 'anoFundacao', label: 'Ano de Fundação', type: 'text', required: false },
          { key: 'numeroFuncionarios', label: 'Número de Funcionários', type: 'text', required: false }
        ];
      } else if (variation === 'creative') {
        return [
          ...institucionalBase,
          { key: 'slogan', label: 'Slogan', type: 'text', required: false },
          { key: 'palavrasChave', label: 'Palavras-chave (separadas por vírgula)', type: 'text', required: false }
        ];
      }
    }

    return baseFields;
  };

  const fields = getFieldsForTemplate();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Conteúdo do Site</h3>
      {fields.map((field) => (
        <FormField
          key={field.key}
          control={form.control}
          name={field.key}
          rules={{ required: field.required ? `${field.label} é obrigatório` : false }}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                {field.type === 'textarea' ? (
                  <textarea 
                    className="w-full p-3 border rounded-md min-h-[120px] resize-y"
                    placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                    {...formField}
                  />
                ) : (
                  <Input 
                    placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                    {...formField} 
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};
