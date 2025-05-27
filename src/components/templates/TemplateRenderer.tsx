
import React from 'react';
import { LandingPageTemplate } from './LandingPageTemplate';
import { InstitucionalTemplate } from './InstitucionalTemplate';
import { LandingPageVideoTemplate } from './variations/LandingPageVideoTemplate';
import { LandingPageMinimalTemplate } from './variations/LandingPageMinimalTemplate';
import { LandingPageModernTemplate } from './variations/LandingPageModernTemplate';
import { InstitucionalBannerTemplate } from './variations/InstitucionalBannerTemplate';
import { InstitucionalCorporateTemplate } from './variations/InstitucionalCorporateTemplate';
import { InstitucionalCreativeTemplate } from './variations/InstitucionalCreativeTemplate';

interface SiteData {
  template: string;
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
    const variation = siteData.variation || 'default';
    
    console.log('Rendering template:', siteData.template, 'variation:', variation);
    
    switch (siteData.template) {
      case 'landing':
        switch (variation) {
          case 'video':
            return <LandingPageVideoTemplate siteData={siteData} isPreview={isPreview} />;
          case 'minimal':
            return <LandingPageMinimalTemplate siteData={siteData} isPreview={isPreview} />;
          case 'modern':
            return <LandingPageModernTemplate siteData={siteData} isPreview={isPreview} />;
          default:
            return <LandingPageTemplate siteData={siteData} isPreview={isPreview} />;
        }
      case 'institucional':
        switch (variation) {
          case 'banner':
            return <InstitucionalBannerTemplate siteData={siteData} isPreview={isPreview} />;
          case 'corporate':
            return <InstitucionalCorporateTemplate siteData={siteData} isPreview={isPreview} />;
          case 'creative':
            return <InstitucionalCreativeTemplate siteData={siteData} isPreview={isPreview} />;
          default:
            return <InstitucionalTemplate siteData={siteData} isPreview={isPreview} />;
        }
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
