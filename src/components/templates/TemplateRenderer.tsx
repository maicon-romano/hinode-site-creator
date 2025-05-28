
import React from 'react';
import { DynamicSiteRenderer } from './DynamicSiteRenderer';

interface SiteData {
  templateId?: string;
  modelId?: string;
  template?: string;
  variation?: string;
  nomeDoSite: string;
  headline?: string;
  descricao?: string;
  videoUrl?: string;
  whatsapp?: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  secoes?: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
  [key: string]: any;
}

interface TemplateRendererProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  console.log('TemplateRenderer - Site data recebido:', siteData);

  // Ensure we have valid templateId, with proper fallback
  let templateId = siteData.templateId || siteData.modelId;
  
  // If we still don't have a templateId, construct one safely
  if (!templateId) {
    const template = siteData.template || 'landing-page-vendas'; // Default template
    templateId = `${template}-01`;
  }
  
  console.log('TemplateRenderer - Template ID determinado:', templateId);

  // Para modelos novos, usar diretamente o DynamicSiteRenderer
  if (['representante-hinode', 'site-institucional', 'landing-page-vendas', 'portfolio-profissional'].includes(templateId)) {
    console.log('TemplateRenderer - Usando modelo novo:', templateId);
    return <DynamicSiteRenderer siteData={{ ...siteData, templateId }} isPreview={isPreview} />;
  }

  // Para modelos antigos, converter formato se necessário
  const convertedData = {
    ...siteData,
    templateId,
    activeSections: siteData.activeSections || Object.keys(siteData.secoes || {}).filter(key => siteData.secoes?.[key]),
    hero: siteData.hero || {
      titulo: siteData.headline || 'Título do Site',
      subtitulo: siteData.descricao || 'Descrição do site',
      videoUrl: siteData.videoUrl,
      botaoTexto: 'Fale Conosco',
      botaoLink: siteData.whatsapp ? `https://wa.me/${siteData.whatsapp}` : '#'
    },
    contato: siteData.contato || {
      titulo: 'Entre em Contato',
      whatsapp: siteData.whatsapp
    }
  };

  console.log('TemplateRenderer - Dados convertidos:', convertedData);

  return <DynamicSiteRenderer siteData={convertedData} isPreview={isPreview} />;
};
