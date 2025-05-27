
import React from 'react';
import { SiteSection } from '@/data/siteModels';
import { ContactForm } from './ContactForm';

interface SectionRendererProps {
  section: SiteSection;
  siteData: any;
  isPreview?: boolean;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  siteData,
  isPreview = false
}) => {
  const { type, conteudo } = section;

  const renderCards = (cards: any[], className: string = "grid grid-cols-1 md:grid-cols-3 gap-6") => {
    if (!cards || cards.length === 0) return null;
    
    return (
      <div className={className}>
        {cards.sort((a, b) => a.ordem - b.ordem).map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-lg shadow-sm border">
            {card.imagem && (
              <img src={card.imagem} alt={card.titulo} className="w-full h-32 object-cover rounded-lg mb-4" />
            )}
            <h3 className="font-semibold text-lg mb-2" style={{ color: siteData.cores.texto }}>
              {card.titulo}
            </h3>
            {card.texto && (
              <p className="text-gray-600">{card.texto}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  switch (type) {
    case 'hero':
    case 'hero-hinode':
    case 'apresentacao-pessoal':
      return (
        <section 
          className={`py-16 lg:py-20 px-4 ${isPreview ? 'min-h-[300px]' : 'min-h-screen'} flex items-center`}
          style={{ backgroundColor: siteData.cores.fundo, color: siteData.cores.texto }}
        >
          <div className="container mx-auto max-w-6xl text-center">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-16 w-auto mb-8 mx-auto"
              />
            )}
            
            <h1 
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: siteData.cores.principal }}
            >
              {conteudo.titulo}
            </h1>
            
            {conteudo.subtitulo && (
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                {conteudo.subtitulo}
              </p>
            )}

            {conteudo.texto && (
              <p className="text-lg opacity-80 mb-8">
                {conteudo.texto}
              </p>
            )}

            {conteudo.video && (
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl mb-8 max-w-2xl mx-auto">
                <iframe
                  src={conteudo.video.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {conteudo.imagem && (
              <img 
                src={conteudo.imagem} 
                alt="Hero" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-xl mb-8"
              />
            )}
            
            {conteudo.botaoTexto && conteudo.botaoLink && (
              <a
                href={conteudo.botaoLink}
                className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-transform hover:scale-105 text-white"
                style={{ backgroundColor: siteData.cores.destaque }}
                target={conteudo.botaoLink.includes('wa.me') ? '_blank' : '_self'}
              >
                {conteudo.botaoTexto}
              </a>
            )}
          </div>
        </section>
      );

    case 'beneficios':
    case 'servicos':
    case 'habilidades':
    case 'produtos-destaque':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-6xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            {renderCards(conteudo.cards)}
          </div>
        </section>
      );

    case 'como-funciona':
    case 'etapas-comecar':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            {renderCards(conteudo.cards, "grid grid-cols-1 md:grid-cols-3 gap-8")}
          </div>
        </section>
      );

    case 'sobre':
    case 'sobre-hinode':
    case 'sobre-distribuidor':
    case 'bio':
    case 'produto':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {conteudo.titulo && (
                  <h2 className="text-3xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
                    {conteudo.titulo}
                  </h2>
                )}
                {conteudo.texto && (
                  <div className="text-lg leading-relaxed" style={{ color: siteData.cores.texto }}>
                    {conteudo.texto.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {conteudo.imagem ? (
                  <img src={conteudo.imagem} alt="Seção" className="w-full rounded-lg shadow-lg" />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-400">Imagem da seção</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'depoimentos':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.destaque}10` }}>
          <div className="container mx-auto max-w-6xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            {renderCards(conteudo.cards, "grid grid-cols-1 md:grid-cols-2 gap-8")}
          </div>
        </section>
      );

    case 'equipe':
    case 'projetos':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            {renderCards(conteudo.cards, "grid grid-cols-1 md:grid-cols-3 gap-8")}
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-4xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            <div className="space-y-4">
              {conteudo.cards?.sort((a, b) => a.ordem - b.ordem).map((faq) => (
                <div key={faq.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: siteData.cores.texto }}>
                    {faq.titulo}
                  </h3>
                  <p className="text-gray-600">{faq.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'banner-institucional':
      return (
        <section 
          className="py-20 px-4 relative"
          style={{ 
            backgroundColor: siteData.cores.principal,
            backgroundImage: conteudo.imagem ? `url(${conteudo.imagem})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto max-w-6xl text-center text-white relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {conteudo.titulo}
            </h1>
            {conteudo.subtitulo && (
              <p className="text-xl lg:text-2xl opacity-90">
                {conteudo.subtitulo}
              </p>
            )}
          </div>
        </section>
      );

    case 'mapa':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Mapa: {conteudo.endereco}</p>
            </div>
          </div>
        </section>
      );

    case 'contato':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}10` }}>
          <div className="container mx-auto max-w-4xl">
            {conteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-6" style={{ color: siteData.cores.principal }}>
                {conteudo.titulo}
              </h2>
            )}
            {conteudo.subtitulo && (
              <p className="text-center text-lg mb-12" style={{ color: siteData.cores.texto }}>
                {conteudo.subtitulo}
              </p>
            )}
            <ContactForm 
              clientId={siteData.clientId || ''} 
              isPreview={isPreview}
              cores={siteData.cores}
            />
          </div>
        </section>
      );

    case 'rodape':
    case 'rodape-hinode':
      return (
        <footer className="py-8 px-4" style={{ backgroundColor: siteData.cores.principal }}>
          <div className="container mx-auto max-w-6xl text-center text-white">
            <p className="opacity-90">{conteudo.texto}</p>
          </div>
        </footer>
      );

    default:
      return null;
  }
};
