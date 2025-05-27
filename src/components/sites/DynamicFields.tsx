import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FieldConfig {
  key: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  description?: string;
}

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
  const { register, formState: { errors } } = form;

  const getFieldsForTemplate = (): FieldConfig[] => {
    // Campos base que aparecem em todos os templates
    const baseFields: FieldConfig[] = [
      { key: 'headline', label: 'Título Principal', type: 'text', required: true, placeholder: 'Ex: Transforme seu negócio hoje!' },
      { key: 'descricao', label: 'Descrição Principal', type: 'textarea', required: true, placeholder: 'Descreva seu produto ou serviço...' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true, placeholder: '5511999999999' }
    ];

    // Campos específicos para Landing Page
    if (template === 'landing') {
      const landingBaseFields: FieldConfig[] = [
        ...baseFields,
        { key: 'subtitulo', label: 'Subtítulo', type: 'text', required: false, placeholder: 'Um subtítulo complementar' },
        { key: 'textoBotaoPrincipal', label: 'Texto do Botão Principal', type: 'text', required: false, placeholder: 'Fale Conosco' },
        { key: 'beneficios', label: 'Benefícios (separados por vírgula)', type: 'textarea', required: false, placeholder: 'Rapidez, Qualidade, Preço justo' },
        { key: 'depoimentos', label: 'Depoimentos (separados por ponto e vírgula)', type: 'textarea', required: false, placeholder: 'João: Excelente serviço!; Maria: Recomendo muito!' },
        { key: 'tituloSobre', label: 'Título da Seção Sobre', type: 'text', required: false, placeholder: 'Sobre Nós' },
        { key: 'textoSobre', label: 'Texto da Seção Sobre', type: 'textarea', required: false, placeholder: 'Nossa história e missão...' },
        { key: 'tituloContato', label: 'Título da Seção Contato', type: 'text', required: false, placeholder: 'Entre em Contato' },
        { key: 'endereco', label: 'Endereço', type: 'text', required: false, placeholder: 'Rua das Flores, 123 - São Paulo/SP' },
        { key: 'telefone', label: 'Telefone', type: 'text', required: false, placeholder: '(11) 99999-9999' },
        { key: 'email', label: 'E-mail', type: 'text', required: false, placeholder: 'contato@empresa.com' }
      ];

      if (variation === 'video') {
        return [
          ...landingBaseFields,
          { key: 'videoUrl', label: 'URL do Vídeo (YouTube)', type: 'text', required: false, placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'tituloVideo', label: 'Título da Seção de Vídeo', type: 'text', required: false, placeholder: 'Veja nosso vídeo' }
        ];
      } else if (variation === 'minimal') {
        return [
          ...landingBaseFields,
          { key: 'textoMinimal', label: 'Texto Minimalista', type: 'text', required: false, placeholder: 'Simplicidade e elegância' },
          { key: 'fraseDestaque', label: 'Frase de Destaque', type: 'text', required: false, placeholder: 'A solução que você procura' }
        ];
      } else if (variation === 'modern') {
        return [
          ...landingBaseFields,
          { key: 'caracteristicas', label: 'Características (separadas por vírgula)', type: 'textarea', required: false, placeholder: 'Moderno, Inovador, Eficiente' },
          { key: 'destaques', label: 'Destaques (separados por vírgula)', type: 'textarea', required: false, placeholder: 'Tecnologia avançada, Suporte 24h' },
          { key: 'chamadaModerna', label: 'Chamada Moderna', type: 'text', required: false, placeholder: 'O futuro é agora!' }
        ];
      }

      return landingBaseFields;
    }

    // Campos específicos para Institucional
    if (template === 'institucional') {
      const institucionalBaseFields: FieldConfig[] = [
        ...baseFields,
        { key: 'missao', label: 'Missão', type: 'textarea', required: false, placeholder: 'Nossa missão é...' },
        { key: 'visao', label: 'Visão', type: 'textarea', required: false, placeholder: 'Nossa visão é...' },
        { key: 'valores', label: 'Valores', type: 'textarea', required: false, placeholder: 'Nossos valores são...' },
        { key: 'historia', label: 'Nossa História', type: 'textarea', required: false, placeholder: 'A empresa foi fundada em...' },
        { key: 'tituloEquipe', label: 'Título da Seção Equipe', type: 'text', required: false, placeholder: 'Nossa Equipe' },
        { key: 'textoEquipe', label: 'Texto da Equipe', type: 'textarea', required: false, placeholder: 'Conheça nossos profissionais...' },
        { key: 'tituloServicos', label: 'Título dos Serviços', type: 'text', required: false, placeholder: 'Nossos Serviços' },
        { key: 'servicos', label: 'Lista de Serviços (separados por vírgula)', type: 'textarea', required: false, placeholder: 'Consultoria, Desenvolvimento, Suporte' },
        { key: 'endereco', label: 'Endereço', type: 'text', required: false, placeholder: 'Rua das Flores, 123 - São Paulo/SP' },
        { key: 'telefone', label: 'Telefone', type: 'text', required: false, placeholder: '(11) 99999-9999' },
        { key: 'email', label: 'E-mail', type: 'text', required: false, placeholder: 'contato@empresa.com' }
      ];

      if (variation === 'banner') {
        return [
          ...institucionalBaseFields,
          { key: 'imagemBanner', label: 'URL da Imagem do Banner', type: 'text', required: false, placeholder: 'https://exemplo.com/banner.jpg' },
          { key: 'textoBanner', label: 'Texto do Banner', type: 'text', required: false, placeholder: 'Bem-vindos à nossa empresa!' }
        ];
      } else if (variation === 'corporate') {
        return [
          ...institucionalBaseFields,
          { key: 'anoFundacao', label: 'Ano de Fundação', type: 'text', required: false, placeholder: '2010' },
          { key: 'numeroFuncionarios', label: 'Número de Funcionários', type: 'text', required: false, placeholder: '50+' },
          { key: 'numeroClientes', label: 'Número de Clientes', type: 'text', required: false, placeholder: '200+' },
          { key: 'certificacoes', label: 'Certificações', type: 'text', required: false, placeholder: 'ISO 9001, ISO 14001' }
        ];
      } else if (variation === 'creative') {
        return [
          ...institucionalBaseFields,
          { key: 'slogan', label: 'Slogan', type: 'text', required: false, placeholder: 'Criatividade sem limites!' },
          { key: 'palavrasChave', label: 'Palavras-chave (separadas por vírgula)', type: 'text', required: false, placeholder: 'Criativo, Inovador, Único' },
          { key: 'fraseInspiradora', label: 'Frase Inspiradora', type: 'text', required: false, placeholder: 'Transformando ideias em realidade' }
        ];
      }

      return institucionalBaseFields;
    }

    return baseFields;
  };

  const fields = getFieldsForTemplate();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Conteúdo do Site</h3>
      <p className="text-sm text-gray-600">
        Preencha os campos abaixo para personalizar completamente seu site. 
        Todos os textos aqui definidos aparecerão no site final.
      </p>
      
      <div className="grid gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea 
                placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                className="min-h-[80px]"
                {...register(field.key, { 
                  required: field.required ? `${field.label} é obrigatório` : false 
                })}
              />
            ) : (
              <Input 
                placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                {...register(field.key, { 
                  required: field.required ? `${field.label} é obrigatório` : false 
                })}
              />
            )}
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            {errors[field.key] && (
              <p className="text-sm font-medium text-destructive">
                {String(errors[field.key]?.message) || `${field.label} é obrigatório`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
