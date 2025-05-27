
import React from 'react';
import { LandingPageTemplate } from './LandingPageTemplate';
import { InstitucionalTemplate } from './InstitucionalTemplate';

interface SiteData {
  template: string;
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
  secoes: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
}

interface TemplateRendererProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const renderTemplate = () => {
    switch (siteData.template) {
      case 'landing':
        return <LandingPageTemplate siteData={siteData} isPreview={isPreview} />;
      case 'institucional':
        return <InstitucionalTemplate siteData={siteData} isPreview={isPreview} />;
      default:
        return <LandingPageTemplate siteData={siteData} isPreview={isPreview} />;
    }
  };

  return (
    <div className="template-container">
      {renderTemplate()}
    </div>
  );
};
