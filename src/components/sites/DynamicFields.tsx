
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

interface DynamicFieldsProps {
  fields: FieldConfig[];
  prefix?: string;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({ 
  fields,
  prefix = ''
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const fieldName = prefix ? `${prefix}.${field.name}` : field.name;
        
        return (
          <div key={fieldName} className="space-y-2">
            <Label className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea 
                placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                className="min-h-[80px]"
                {...register(fieldName, { 
                  required: field.required ? `${field.label} é obrigatório` : false 
                })}
              />
            ) : (
              <Input 
                placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                {...register(fieldName, { 
                  required: field.required ? `${field.label} é obrigatório` : false 
                })}
              />
            )}
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            {errors[fieldName] && (
              <p className="text-sm font-medium text-destructive">
                {String(errors[fieldName]?.message) || `${field.label} é obrigatório`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
