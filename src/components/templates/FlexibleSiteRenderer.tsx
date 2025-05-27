
import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { ArrowUp } from 'lucide-react';
import { SiteSection } from '@/data/siteModels';
import { SectionRenderer } from './SectionRenderer';

interface SiteData {
  modelId: string;
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  whatsapp: string;
  layout: SiteSection[];
  [key: string]: any;
}

interface FlexibleSiteRendererProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const FlexibleSiteRenderer: React.FC<FlexibleSiteRendererProps> = ({
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

  return (
    <div className="min-h-screen" style={styles}>
      {siteData.layout
        .filter(secao => secao.enabled)
        .map((secao, index) => (
          <SectionRenderer
            key={`${secao.type}-${index}`}
            section={secao}
            siteData={siteData}
            isPreview={isPreview}
          />
        ))}

      {/* WhatsApp Button - apenas se não for preview */}
      {!isPreview && siteData.whatsapp && (
        <WhatsAppButton 
          whatsapp={siteData.whatsapp}
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
