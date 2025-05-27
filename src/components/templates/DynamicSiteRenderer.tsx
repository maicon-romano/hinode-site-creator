
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
        className="w-full py-3 px-4 text-center text-sm font-medium text-white"
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
    const flexDirection = posicao === 'left' ? 'lg:flex-row' : posicao === 'right' ? 'lg:flex-row-reverse' : 'flex-col';

    return (
      <section 
        className={`py-16 lg:py-20 px-4 ${isPreview ? 'min-h-[400px]' : 'min-h-screen'} flex items-center`}
        style={{ backgroundColor: siteData.cores.fundo, color: siteData.cores.texto }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className={`flex ${flexDirection} items-center gap-8 lg:gap-12`}>
            <div className={`flex-1 space-y-4 lg:space-y-6 ${textAlign}`}>
              {siteData.logoPath && (
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-12 lg:h-16 w-auto mb-4 lg:mb-8 mx-auto"
                />
              )}
              
              <h1 
                className="text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight"
                style={{ color: siteData.cores.principal }}
              >
                {titulo}
              </h1>
              
              {subtitulo && (
                <p className="text-lg lg:text-xl xl:text-2xl opacity-90">
                  {subtitulo}
                </p>
              )}
              
              {botaoTexto && botaoLink && (
                <div className="pt-4">
                  <a
                    href={botaoLink}
                    className="inline-block px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-lg transition-transform hover:scale-105 text-white"
                    style={{ backgroundColor: siteData.cores.destaque }}
                    target={botaoLink.includes('wa.me') ? '_blank' : '_self'}
                  >
                    {botaoTexto}
                  </a>
                </div>
              )}
            </div>
            
            {(imagemHero || videoUrl) && (
              <div className="flex-1 mt-8 lg:mt-0">
                {videoUrl ? (
                  <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
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
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Imagem do Hero</span>
                  </div>
                )}
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
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
            <div className="container mx-auto max-w-6xl">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  {section.texto && (
                    <div className="text-base lg:text-lg leading-relaxed" style={{ color: siteData.cores.texto }}>
                      {section.texto.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  {section.imagem ? (
                    <img src={section.imagem} alt="Sobre" className="w-full rounded-lg shadow-lg" />
                  ) : (
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                      <span className="text-gray-400">Imagem da empresa</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'beneficios':
        return (
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
            <div className="container mx-auto max-w-6xl">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              {section.lista && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {section.lista.split('\n').filter((item: string) => item.trim()).map((benefit: string, index: number) => (
                    <div key={index} className="text-center p-4 lg:p-6 rounded-lg bg-white shadow-sm border">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center text-white font-bold text-lg lg:text-xl" style={{ backgroundColor: siteData.cores.destaque }}>
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-sm lg:text-base" style={{ color: siteData.cores.texto }}>{benefit}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'servicos':
        return (
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
            <div className="container mx-auto max-w-6xl">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              {section.descricao && (
                <p className="text-center text-base lg:text-lg mb-8 lg:mb-12 max-w-3xl mx-auto" style={{ color: siteData.cores.texto }}>
                  {section.descricao}
                </p>
              )}
              {section.lista && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {section.lista.split('\n').filter((item: string) => item.trim()).map((service: string, index: number) => (
                    <div key={index} className="text-center p-4 lg:p-6 rounded-lg border" style={{ backgroundColor: `${siteData.cores.destaque}10` }}>
                      <h3 className="font-semibold text-base lg:text-lg mb-2" style={{ color: siteData.cores.texto }}>{service}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'contato':
        return (
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}10` }}>
            <div className="container mx-auto max-w-6xl text-center">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
                {section.whatsapp && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-sm lg:text-base" style={{ color: siteData.cores.texto }}>WhatsApp</h4>
                    <a href={`https://wa.me/${section.whatsapp}`} className="text-green-600 hover:underline text-sm lg:text-base">
                      {section.whatsapp}
                    </a>
                  </div>
                )}
                {section.telefone && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-sm lg:text-base" style={{ color: siteData.cores.texto }}>Telefone</h4>
                    <p className="text-sm lg:text-base" style={{ color: siteData.cores.texto }}>{section.telefone}</p>
                  </div>
                )}
                {section.email && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-sm lg:text-base" style={{ color: siteData.cores.texto }}>E-mail</h4>
                    <a href={`mailto:${section.email}`} className="hover:underline text-sm lg:text-base" style={{ color: siteData.cores.destaque }}>
                      {section.email}
                    </a>
                  </div>
                )}
                {section.endereco && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-2 text-sm lg:text-base" style={{ color: siteData.cores.texto }}>Endereço</h4>
                    <p className="text-sm lg:text-base" style={{ color: siteData.cores.texto }}>{section.endereco}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      // Outras seções específicas dos templates
      case 'recursos':
      case 'caracteristicas':
        return (
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
            <div className="container mx-auto max-w-6xl">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12" style={{ color: siteData.cores.principal }}>
                  {section.titulo}
                </h2>
              )}
              {section.lista && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {section.lista.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => (
                    <div key={index} className="text-center p-4 lg:p-6">
                      <h3 className="font-semibold text-base lg:text-lg" style={{ color: siteData.cores.texto }}>{item}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'cta':
        return (
          <section className="py-12 lg:py-16 px-4" style={{ backgroundColor: siteData.cores.principal }}>
            <div className="container mx-auto max-w-6xl text-center text-white">
              {section.titulo && (
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                  {section.titulo}
                </h2>
              )}
              {section.texto && (
                <p className="text-base lg:text-lg mb-6 lg:mb-8 opacity-90">
                  {section.texto}
                </p>
              )}
              {section.botaoTexto && section.botaoLink && (
                <a
                  href={section.botaoLink}
                  className="inline-block px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: siteData.cores.destaque, color: 'white' }}
                  target={section.botaoLink.includes('wa.me') ? '_blank' : '_self'}
                >
                  {section.botaoTexto}
                </a>
              )}
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

      {/* WhatsApp Button - apenas se não for preview */}
      {!isPreview && siteData.contato?.whatsapp && (
        <WhatsAppButton 
          whatsapp={siteData.contato.whatsapp}
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
