
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
  activeSections?: string[];
  hero?: {
    titulo?: string;
    subtitulo?: string;
    videoUrl?: string;
    botaoTexto?: string;
    botaoLink?: string;
  };
  contato?: {
    titulo?: string;
    whatsapp?: string;
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

  // Ensure we have a valid siteData object with default values
  const safeSiteData = {
    nomeDoSite: 'Site em Desenvolvimento',
    cores: {
      principal: '#0066cc',
      fundo: '#ffffff',
      destaque: '#ff6b35',
      texto: '#333333'
    },
    ...siteData
  };

  // Ensure we have valid templateId, with proper fallback
  let templateId = safeSiteData.templateId || safeSiteData.modelId;
  
  // If we still don't have a templateId, construct one safely
  if (!templateId || typeof templateId !== 'string') {
    const template = safeSiteData.template || 'landing-page-vendas'; // Default template
    templateId = `${template}-01`;
  }
  
  console.log('TemplateRenderer - Template ID determinado:', templateId);

  // Para modelos novos, usar diretamente o DynamicSiteRenderer
  if (['representante-hinode', 'site-institucional', 'landing-page-vendas', 'portfolio-profissional'].includes(templateId)) {
    console.log('TemplateRenderer - Usando modelo novo:', templateId);
    return <DynamicSiteRenderer siteData={{ ...safeSiteData, templateId }} isPreview={isPreview} />;
  }

  // Para modelos antigos, converter formato se necessário
  const convertedData = {
    ...safeSiteData,
    templateId,
    activeSections: safeSiteData.activeSections || Object.keys(safeSiteData.secoes || {}).filter(key => safeSiteData.secoes?.[key]),
    hero: safeSiteData.hero || {
      titulo: safeSiteData.headline || 'Título do Site',
      subtitulo: safeSiteData.descricao || 'Descrição do site',
      videoUrl: safeSiteData.videoUrl,
      botaoTexto: 'Fale Conosco',
      botaoLink: safeSiteData.whatsapp ? `https://wa.me/${safeSiteData.whatsapp}` : '#'
    },
    contato: safeSiteData.contato || {
      titulo: 'Entre em Contato',
      whatsapp: safeSiteData.whatsapp
    }
  };

  console.log('TemplateRenderer - Dados convertidos:', convertedData);

  return <DynamicSiteRenderer siteData={convertedData} isPreview={isPreview} />;
};
