
import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { ArrowUp } from 'lucide-react';
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
  const scrollToTop = () => {
    if (!isPreview) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const styles = {
    '--color-primary': siteData.cores.principal,
    '--color-background': siteData.cores.fundo,
    '--color-accent': siteData.cores.destaque,
    '--color-text': siteData.cores.texto,
  } as React.CSSProperties;

  // Get whatsapp number from various possible locations
  const getWhatsAppNumber = () => {
    return siteData.whatsapp || 
           siteData.contato?.whatsapp || 
           siteData['hero-hinode']?.whatsapp ||
           siteData.hero?.whatsapp;
  };

  // Check if we should render as a complete template
  const templateId = siteData.templateId || siteData.modelId;
  
  if (templateId) {
    console.log('DynamicSiteRenderer - Renderizando template completo:', templateId);
    // Pass the entire siteData as a section to trigger template rendering
    return (
      <div className="min-h-screen" style={styles}>
        <SectionRenderer
          section={{ type: 'template', templateId }}
          siteData={siteData}
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

        {/* Back to Top Button - apenas se não for preview */}
        {!isPreview && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white"
            style={{ backgroundColor: siteData.cores.principal }}
            title="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
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
            siteData={siteData}
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

      {/* Back to Top Button - apenas se não for preview */}
      {!isPreview && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white"
          style={{ backgroundColor: siteData.cores.principal }}
          title="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
