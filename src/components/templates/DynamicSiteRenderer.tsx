
import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { SectionRenderer } from './SectionRenderer';

// Import specific model components
import { RepresentanteHinodeSite } from './models/RepresentanteHinodeSite';
import { InstitucionalSite } from './models/InstitucionalSite';
import { LandingVendasSite } from './models/LandingVendasSite';
import { PortfolioSite } from './models/PortfolioSite';

interface SiteData {
  templateId?: string;
  modelId?: string;
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
    degradeHero?: {
      inicio: string;
      fim: string;
    };
  };
  layout?: any[];
  sectionsOrder?: string[];
  activeSections?: string[];
  whatsapp?: string;
  contato?: {
    whatsapp?: string;
  };
  [key: string]: any;
}

interface DynamicSiteRendererProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const DynamicSiteRenderer: React.FC<DynamicSiteRendererProps> = ({
  siteData,
  isPreview = false
}) => {
  console.log('DynamicSiteRenderer - Site data recebido:', siteData);

  // Add default values for cores to prevent undefined errors
  const defaultCores = {
    principal: '#0066cc',
    fundo: '#ffffff',
    destaque: '#ff6b35',
    texto: '#333333',
    degradeHero: {
      inicio: '#0067c7',
      fim: '#00ffcc'
    }
  };

  // Merge cores properly without duplication
  const coresFinais = {
    principal: siteData.cores?.principal || defaultCores.principal,
    fundo: siteData.cores?.fundo || defaultCores.fundo,
    destaque: siteData.cores?.destaque || defaultCores.destaque,
    texto: siteData.cores?.texto || defaultCores.texto,
    degradeHero: {
      inicio: siteData.cores?.degradeHero?.inicio || defaultCores.degradeHero.inicio,
      fim: siteData.cores?.degradeHero?.fim || defaultCores.degradeHero.fim
    }
  };

  // CSS Variables aplicadas CORRETAMENTE em TODO o site
  const styles = {
    '--cor-principal': coresFinais.principal,
    '--cor-fundo': coresFinais.fundo,
    '--cor-destaque': coresFinais.destaque,
    '--cor-texto': coresFinais.texto,
    '--cor-degrade-inicio': coresFinais.degradeHero.inicio,
    '--cor-degrade-fim': coresFinais.degradeHero.fim,
    // Aliases para compatibilidade
    '--color-primary': coresFinais.principal,
    '--color-background': coresFinais.fundo,
    '--color-accent': coresFinais.destaque,
    '--color-text': coresFinais.texto,
    '--gradient-start': coresFinais.degradeHero.inicio,
    '--gradient-end': coresFinais.degradeHero.fim,
  } as React.CSSProperties;

  // Get whatsapp number from various possible locations
  const getWhatsAppNumber = () => {
    return siteData.whatsapp || 
           siteData.contato?.whatsapp || 
           siteData['hero-hinode']?.whatsapp ||
           siteData['contato-hinode']?.whatsapp ||
           siteData.hero?.whatsapp;
  };

  // Check if we should render as a complete template
  const templateId = siteData.templateId || siteData.modelId;
  
  console.log('DynamicSiteRenderer - Template ID final:', templateId);
  console.log('DynamicSiteRenderer - Cores aplicadas:', coresFinais);
  console.log('DynamicSiteRenderer - Dados completos para template:', siteData);
  
  if (templateId) {
    // Use specific model components with complete siteData
    const completeData = { ...siteData, cores: coresFinais };
    
    switch (templateId.toLowerCase()) {
      case 'representante-hinode':
        console.log('Renderizando Representante Hinode com dados:', completeData);
        return (
          <div className="min-h-screen w-full" style={styles}>
            <RepresentanteHinodeSite siteData={completeData} isPreview={isPreview} />
            {!isPreview && getWhatsAppNumber() && (
              <WhatsAppButton 
                whatsapp={getWhatsAppNumber()!}
                isPreview={isPreview}
                color="#25D366"
              />
            )}
          </div>
        );
      
      case 'site-institucional':
        console.log('Renderizando Site Institucional com dados:', completeData);
        return (
          <div className="min-h-screen w-full" style={styles}>
            <InstitucionalSite siteData={completeData} isPreview={isPreview} />
            {!isPreview && getWhatsAppNumber() && (
              <WhatsAppButton 
                whatsapp={getWhatsAppNumber()!}
                isPreview={isPreview}
                color="#25D366"
              />
            )}
          </div>
        );
      
      case 'landing-vendas':
      case 'landing-page-vendas':
      case 'landing-page-vendas-01':
        console.log('Renderizando Landing de Vendas com dados:', completeData);
        return (
          <div className="min-h-screen w-full" style={styles}>
            <LandingVendasSite siteData={completeData} isPreview={isPreview} />
            {!isPreview && getWhatsAppNumber() && (
              <WhatsAppButton 
                whatsapp={getWhatsAppNumber()!}
                isPreview={isPreview}
                color="#25D366"
              />
            )}
          </div>
        );
      
      case 'portfolio-profissional':
        console.log('Renderizando Portfólio com dados:', completeData);
        return (
          <div className="min-h-screen w-full" style={styles}>
            <PortfolioSite siteData={completeData} isPreview={isPreview} />
            {!isPreview && getWhatsAppNumber() && (
              <WhatsAppButton 
                whatsapp={getWhatsAppNumber()!}
                isPreview={isPreview}
                color="#25D366"
              />
            )}
          </div>
        );
      
      default:
        // For other templates, pass as section to SectionRenderer
        return (
          <div className="min-h-screen w-full" style={styles}>
            <SectionRenderer
              section={{ type: 'template', templateId }}
              siteData={completeData}
              isPreview={isPreview}
            />
            {!isPreview && getWhatsAppNumber() && (
              <WhatsAppButton 
                whatsapp={getWhatsAppNumber()!}
                isPreview={isPreview}
                color="#25D366"
              />
            )}
          </div>
        );
    }
  }

  // Use layout if available, otherwise fallback to sections based on activeSections or sectionsOrder
  const sectionsToRender = siteData.layout || 
    (siteData.sectionsOrder || siteData.activeSections || []).map(sectionType => ({
      type: sectionType,
      enabled: siteData.activeSections ? siteData.activeSections.includes(sectionType) : true,
      conteudo: siteData[sectionType] || {}
    }));

  return (
    <div className="min-h-screen w-full" style={styles}>
      {sectionsToRender
        .filter(section => section.enabled)
        .map((section, index) => (
          <SectionRenderer
            key={`${section.type}-${index}`}
            section={section}
            siteData={{ ...siteData, cores: coresFinais }}
            isPreview={isPreview}
          />
        ))}

      {/* WhatsApp Button - apenas se não for preview e tiver whatsapp */}
      {!isPreview && getWhatsAppNumber() && (
        <WhatsAppButton 
          whatsapp={getWhatsAppNumber()!}
          isPreview={isPreview}
          color="#25D366"
        />
      )}
    </div>
  );
};
