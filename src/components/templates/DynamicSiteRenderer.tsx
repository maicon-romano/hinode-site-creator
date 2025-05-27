
import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { ArrowUp } from 'lucide-react';

interface SiteData {
  templateId: string;
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  activeSections: string[];
  alertaTopo?: {
    ativo: boolean;
    texto: string;
    cor: string;
  };
  hero?: {
    titulo: string;
    subtitulo?: string;
    botaoTexto?: string;
    botaoLink?: string;
    imagemHero?: string;
    posicao?: string;
    videoUrl?: string;
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

  const renderAlertaTopo = () => {
    if (!siteData.alertaTopo?.ativo || !siteData.activeSections?.includes('alertaTopo')) {
      return null;
    }

    return (
      <div 
        className="w-full py-3 px-4 text-center text-sm font-medium"
        style={{ backgroundColor: siteData.alertaTopo.cor || siteData.cores.destaque }}
      >
        {siteData.alertaTopo.texto}
      </div>
    );
  };

  const renderHero = () => {
    if (!siteData.activeSections?.includes('hero') || !siteData.hero) {
      return null;
    }

    const { titulo, subtitulo, botaoTexto, botaoLink, imagemHero, posicao = 'center', videoUrl } = siteData.hero;
    
    const textAlign = posicao === 'left' ? 'text-left' : posicao === 'right' ? 'text-right' : 'text-center';
    const flexDirection = posicao === 'left' ? 'flex-row' : posicao === 'right' ? 'flex-row-reverse' : 'flex-col';

    return (
      <section 
        className={`py-20 px-4 min-h-screen flex items-center`}
        style={{ backgroundColor: siteData.cores.fundo, color: siteData.cores.texto }}
      >
        <div className="container mx-auto">
          <div className={`flex ${flexDirection} items-center gap-12`}>
            <div className={`flex-1 space-y-6 ${textAlign}`}>
              {siteData.logoPath && (
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-16 w-auto mb-8 mx-auto"
                />
              )}
              
              <h1 
                className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in"
                style={{ color: siteData.cores.principal }}
              >
                {titulo}
              </h1>
              
              {subtitulo && (
                <p className="text-xl md:text-2xl opacity-90 animate-fade-in">
                  {subtitulo}
                </p>
              )}
              
              {botaoTexto && botaoLink && (
                <div className="animate-fade-in">
                  <a
                    href={botaoLink}
                    className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-transform hover:scale-105"
                    style={{ 
                      backgroundColor: siteData.cores.destaque, 
                      color: 'white'
                    }}
                    target={botaoLink.includes('wa.me') ? '_blank' : '_self'}
                  >
                    {botaoTexto}
                  </a>
                </div>
              )}
            </div>
            
            {(imagemHero || videoUrl) && (
              <div className="flex-1">
                {videoUrl ? (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={videoUrl.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : imagemHero ? (
                  <img 
                    src={imagemHero} 
                    alt="Hero" 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderSection = (sectionKey: string) => {
    if (!siteData.activeSections?.includes(sectionKey) || !siteData[sectionKey]) {
      return null;
    }

    const section = siteData[sectionKey];

    switch (sectionKey) {
      case 'sobre':
        return (
          <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
            <div className="container mx-auto">
              {section.titulo && (
                <h2 className="text-3xl font-bold text-center mb-8" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              {section.texto && (
                <div className="max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: siteData.cores.texto }}>
                  {section.texto.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
              {section.imagem && (
                <div className="mt-8 text-center">
                  <img src={section.imagem} alt="Sobre" className="mx-auto rounded-lg shadow-lg max-w-2xl w-full" />
                </div>
              )}
            </div>
          </section>
        );

      case 'beneficios':
        return (
          <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
            <div className="container mx-auto">
              {section.titulo && (
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              {section.lista && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {section.lista.split('\n').filter((item: string) => item.trim()).map((benefit: string, index: number) => (
                    <div key={index} className="text-center p-6 rounded-lg" style={{ backgroundColor: `${siteData.cores.destaque}20` }}>
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: siteData.cores.destaque }}>
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>{benefit}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'contato':
        return (
          <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}10` }}>
            <div className="container mx-auto text-center">
              {section.titulo && (
                <h2 className="text-3xl font-bold mb-8" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {section.whatsapp && (
                  <div className="text-center">
                    <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>WhatsApp</h4>
                    <a href={`https://wa.me/${section.whatsapp}`} className="text-green-600 hover:underline">
                      {section.whatsapp}
                    </a>
                  </div>
                )}
                {section.telefone && (
                  <div className="text-center">
                    <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>Telefone</h4>
                    <p style={{ color: siteData.cores.texto }}>{section.telefone}</p>
                  </div>
                )}
                {section.email && (
                  <div className="text-center">
                    <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>E-mail</h4>
                    <a href={`mailto:${section.email}`} className="hover:underline" style={{ color: siteData.cores.destaque }}>
                      {section.email}
                    </a>
                  </div>
                )}
                {section.endereco && (
                  <div className="text-center">
                    <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>Endereço</h4>
                    <p style={{ color: siteData.cores.texto }}>{section.endereco}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={styles}>
      {renderAlertaTopo()}
      
      {renderHero()}
      
      {siteData.activeSections?.map((sectionKey) => {
        if (sectionKey === 'hero' || sectionKey === 'alertaTopo') return null;
        return (
          <div key={sectionKey}>
            {renderSection(sectionKey)}
          </div>
        );
      })}

      {/* WhatsApp Button */}
      {siteData.contato?.whatsapp && (
        <WhatsAppButton 
          whatsapp={siteData.contato.whatsapp}
          isPreview={isPreview}
          color="#25D366"
        />
      )}

      {/* Back to Top Button */}
      {!isPreview && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          style={{ backgroundColor: siteData.cores.principal }}
          title="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
};
