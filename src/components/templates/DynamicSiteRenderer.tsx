
import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { SectionRenderer } from './SectionRenderer';

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
    texto: '#333333'
  };

  const cores = siteData.cores || defaultCores;

  const styles = {
    '--color-primary': cores.principal,
    '--color-background': cores.fundo,
    '--color-accent': cores.destaque,
    '--color-text': cores.texto,
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
  
  if (templateId) {
    // Pass the entire siteData as a section to trigger template rendering
    return (
      <div className="min-h-screen" style={styles}>
        <SectionRenderer
          section={{ type: 'template', templateId }}
          siteData={{ ...siteData, cores }}
          isPreview={isPreview}
        />

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
  }

  // Use layout if available, otherwise fallback to sections based on activeSections or sectionsOrder
  const sectionsToRender = siteData.layout || 
    (siteData.sectionsOrder || siteData.activeSections || []).map(sectionType => ({
      type: sectionType,
      enabled: siteData.activeSections ? siteData.activeSections.includes(sectionType) : true,
      conteudo: siteData[sectionType] || {}
    }));

  return (
    <div className="min-h-screen" style={styles}>
      {sectionsToRender
        .filter(section => section.enabled)
        .map((section, index) => (
          <SectionRenderer
            key={`${section.type}-${index}`}
            section={section}
            siteData={{ ...siteData, cores }}
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
