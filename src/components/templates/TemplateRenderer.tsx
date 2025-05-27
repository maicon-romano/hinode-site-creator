
import React from 'react';
import { DynamicSiteRenderer } from './DynamicSiteRenderer';

interface SiteData {
  templateId?: string;
  template?: string;
  variation?: string;
  nomeDoSite: string;
  headline: string;
  descricao: string;
  videoUrl?: string;
  whatsapp: string;
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
  // Convert old format to new format if needed
  const convertedData = {
    ...siteData,
    templateId: siteData.templateId || `${siteData.template}-01`,
    activeSections: siteData.activeSections || Object.keys(siteData.secoes || {}).filter(key => siteData.secoes?.[key]),
    hero: {
      titulo: siteData.headline,
      subtitulo: siteData.descricao,
      videoUrl: siteData.videoUrl,
      botaoTexto: 'Fale Conosco',
      botaoLink: `https://wa.me/${siteData.whatsapp}`
    },
    contato: {
      titulo: 'Entre em Contato',
      whatsapp: siteData.whatsapp
    }
  };

  return <DynamicSiteRenderer siteData={convertedData} isPreview={isPreview} />;
};
