import React from 'react';
import { ArrowRight, Award, Users, Star } from 'lucide-react';
import { LandingPageTemplate } from './LandingPageTemplate';
import { LandingPageVideoTemplate } from './variations/LandingPageVideoTemplate';
import { LandingPageMinimalTemplate } from './variations/LandingPageMinimalTemplate';
import { LandingPageModernTemplate } from './variations/LandingPageModernTemplate';
import { LandingPremiumTemplate } from './variations/LandingPremiumTemplate';
import { InstitucionalTemplate } from './InstitucionalTemplate';
import { InstitucionalBannerTemplate } from './variations/InstitucionalBannerTemplate';
import { InstitucionalCorporateTemplate } from './variations/InstitucionalCorporateTemplate';
import { InstitucionalCreativeTemplate } from './variations/InstitucionalCreativeTemplate';
import { InstitucionalModernTemplate } from './variations/InstitucionalModernTemplate';
import { PortfolioCreativeTemplate } from './variations/PortfolioCreativeTemplate';
import { HinodeLandingTemplate } from './variations/HinodeLandingTemplate';
import { HinodePremiumTemplate } from './variations/HinodePremiumTemplate';
import { ContactForm } from './ContactForm';

// Importar os novos componentes específicos
import { RepresentanteHinodeSite } from './models/RepresentanteHinodeSite';
import { InstitucionalSite } from './models/InstitucionalSite';
import { LandingVendasSite } from './models/LandingVendasSite';
import { PortfolioSite } from './models/PortfolioSite';

interface SiteSection {
  type: string;
  conteudo: any;
}

interface SectionRendererProps {
  section: any;
  siteData: any;
  isPreview?: boolean;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  siteData,
  isPreview = false
}) => {
  // Ensure we have safe data with defaults
  const safeSiteData = {
    nomeDoSite: 'Site em Desenvolvimento',
    cores: {
      principal: '#0066cc',
      fundo: '#ffffff',
      destaque: '#ff6b35',
      texto: '#333333',
      degradeHero: {
        inicio: '#0067c7',
        fim: '#00ffcc'
      }
    },
    ...siteData,
    cores: {
      principal: '#0066cc',
      fundo: '#ffffff',
      destaque: '#ff6b35',
      texto: '#333333',
      degradeHero: {
        inicio: '#0067c7',
        fim: '#00ffcc'
      },
      ...siteData.cores
    }
  };

  // Check if this is a full template render based on templateId or modelId
  const templateId = safeSiteData.templateId || safeSiteData.modelId;
  
  console.log('SectionRenderer - Template ID detectado:', templateId);
  console.log('SectionRenderer - Site data recebido:', safeSiteData);
  
  if (templateId && typeof templateId === 'string') {
    // USAR COMPONENTES ESPECÍFICOS PARA CADA MODELO
    switch (templateId.toLowerCase()) {
      // Modelos específicos com componentes únicos
      case 'representante-hinode':
        console.log('Renderizando Representante Hinode - Componente Específico');
        return <RepresentanteHinodeSite siteData={safeSiteData} isPreview={isPreview} />;
      
      case 'site-institucional':
        console.log('Renderizando Site Institucional - Componente Específico');
        return <InstitucionalSite siteData={safeSiteData} isPreview={isPreview} />;
      
      case 'landing-vendas':
      case 'landing-page-vendas':
      case 'landing-page-vendas-01':
        console.log('Renderizando Landing de Vendas - Componente Específico');
        return <LandingVendasSite siteData={safeSiteData} isPreview={isPreview} />;
      
      case 'portfolio-profissional':
        console.log('Renderizando Portfólio - Componente Específico');
        return <PortfolioSite siteData={safeSiteData} isPreview={isPreview} />;

      // Templates existentes (variações antigas)
      case 'landing-premium':
        console.log('Renderizando Landing Premium');
        return <LandingPremiumTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'landing-conversion':
        console.log('Renderizando Landing Conversion');
        return <LandingPremiumTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'landing-01':
      case 'landing-basico':
        console.log('Renderizando Landing Básico');
        return <LandingPageTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'landing-02':
      case 'landing-video':
        console.log('Renderizando Landing Video');
        return <LandingPageVideoTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'landing-03':
      case 'landing-minimal':
        console.log('Renderizando Landing Minimal');
        return <LandingPageMinimalTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'landing-04':
      case 'landing-modern':
        console.log('Renderizando Landing Modern');
        return <LandingPageModernTemplate siteData={safeSiteData} isPreview={isPreview} />;
      
      // Institutional Templates - CADA UM COMPLETAMENTE DIFERENTE
      case 'institucional-corporate':
        console.log('Renderizando Institucional Corporate - Template Moderno');
        return <InstitucionalModernTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'institucional-premium':
        console.log('Renderizando Institucional Premium (Banner)');
        return <InstitucionalBannerTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'institucional-01':
      case 'institucional-basico':
        console.log('Renderizando Institucional Básico');
        return <InstitucionalTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'institucional-02':
      case 'institucional-banner':
        console.log('Renderizando Institucional Banner');
        return <InstitucionalBannerTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'institucional-03':
      case 'institucional-corporate-old':
        console.log('Renderizando Institucional Corporate Legacy');
        return <InstitucionalCorporateTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'institucional-04':
      case 'institucional-creative':
        console.log('Renderizando Institucional Creative');
        return <InstitucionalCreativeTemplate siteData={safeSiteData} isPreview={isPreview} />;
      
      // Portfolio Templates
      case 'portfolio-creative':
        console.log('Renderizando Portfolio Creative');
        return <PortfolioCreativeTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'portfolio-developer':
        console.log('Renderizando Portfolio Developer');
        return <PortfolioCreativeTemplate siteData={safeSiteData} isPreview={isPreview} />;
      
      // Hinode Templates - TOTALMENTE ÚNICOS E ESPECÍFICOS
      case 'hinode-premium':
        console.log('Renderizando Hinode Premium - Template Específico para Hinode');
        return <HinodePremiumTemplate siteData={safeSiteData} isPreview={isPreview} />;
      case 'hinode-01':
      case 'hinode-landing':
        console.log('Renderizando Hinode Landing - Template Específico para Hinode');
        return <HinodeLandingTemplate siteData={safeSiteData} isPreview={isPreview} />;
      
      default:
        console.warn('Template não encontrado, usando template padrão para:', templateId);
        return <LandingPageTemplate siteData={safeSiteData} isPreview={isPreview} />;
    }
  }

  // Ensure section has proper structure
  const safeSection = section || { type: 'default', conteudo: {} };
  const { type, conteudo } = safeSection;

  // Ensure conteudo is an object
  const safeConteudo = conteudo || {};

  // Helper para aplicar cores CSS
  const applyColors = (element: React.ReactElement, additionalStyles?: React.CSSProperties) => {
    return React.cloneElement(element, {
      style: {
        '--color-primary': safeSiteData.cores.principal,
        '--color-background': safeSiteData.cores.fundo,
        '--color-accent': safeSiteData.cores.destaque,
        '--color-text': safeSiteData.cores.texto,
        '--gradient-start': safeSiteData.cores.degradeHero?.inicio || '#0067c7',
        '--gradient-end': safeSiteData.cores.degradeHero?.fim || '#00ffcc',
        ...additionalStyles
      } as React.CSSProperties
    });
  };

  const renderCards = (cards: any[], className: string = "grid grid-cols-1 md:grid-cols-3 gap-6") => {
    if (!cards || cards.length === 0) return null;
    
    return (
      <div className={className}>
        {cards.sort((a, b) => a.ordem - b.ordem).map((card, index) => (
          <div 
            key={card.id} 
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 animate-fade-in group"
            style={{ 
              animationDelay: `${index * 100}ms`,
              borderColor: `${safeSiteData.cores.principal}20`
            }}
          >
            {card.imagem && (
              <div className="overflow-hidden rounded-lg mb-4">
                <img 
                  src={card.imagem} 
                  alt={card.titulo} 
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            )}
            <h3 
              className="font-semibold text-lg mb-2 group-hover:opacity-80 transition-colors" 
              style={{ color: safeSiteData.cores.texto }}
            >
              {card.titulo}
            </h3>
            {card.texto && (
              <p className="text-gray-600 leading-relaxed">{card.texto}</p>
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
      return applyColors(
        <section 
          className={`relative py-16 lg:py-20 px-4 ${isPreview ? 'min-h-[400px]' : 'min-h-screen'} flex items-center overflow-hidden`}
          style={{ 
            backgroundColor: safeSiteData.cores.fundo, 
            color: safeSiteData.cores.texto,
            background: type === 'hero-hinode' && safeSiteData.cores.degradeHero ? 
              `linear-gradient(135deg, ${safeSiteData.cores.degradeHero.inicio}, ${safeSiteData.cores.degradeHero.fim})` :
              safeSiteData.cores.fundo
          }}
        >
          {/* Background decoration for Hinode */}
          {type === 'hero-hinode' && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
            </div>
          )}
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                {safeSiteData.logoPath && (
                  <img 
                    src={safeSiteData.logoPath} 
                    alt="Logo" 
                    className="h-16 w-auto mb-8 mx-auto lg:mx-0 animate-fade-in"
                  />
                )}
                
                <h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in"
                  style={{ 
                    color: type === 'hero-hinode' ? 'white' : safeSiteData.cores.principal 
                  }}
                >
                  {safeConteudo.titulo || 'Título do Site'}
                </h1>
                
                {safeConteudo.subtitulo && (
                  <p 
                    className="text-xl lg:text-2xl opacity-90 mb-6 animate-fade-in animation-delay-1000"
                    style={{ 
                      color: type === 'hero-hinode' ? 'white' : safeSiteData.cores.texto 
                    }}
                  >
                    {safeConteudo.subtitulo}
                  </p>
                )}

                {safeConteudo.texto && (
                  <p 
                    className="text-lg opacity-80 mb-8 animate-fade-in animation-delay-2000"
                    style={{ 
                      color: type === 'hero-hinode' ? 'white' : safeSiteData.cores.texto 
                    }}
                  >
                    {safeConteudo.texto}
                  </p>
                )}
                
                {safeConteudo.botaoTexto && safeConteudo.botaoLink && (
                  <a
                    href={safeConteudo.botaoLink}
                    className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-white animate-fade-in animation-delay-2000 group"
                    style={{ backgroundColor: safeSiteData.cores.destaque }}
                    target={safeConteudo.botaoLink.includes('wa.me') ? '_blank' : '_self'}
                  >
                    {safeConteudo.botaoTexto}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              <div className="order-first lg:order-last">
                {safeConteudo.video && (
                  <div className="animate-scale-in">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <iframe
                        src={safeConteudo.video.replace('watch?v=', 'embed/')}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
                
                {!safeConteudo.video && safeConteudo.imagem && (
                  <div className="animate-scale-in">
                    <img 
                      src={safeConteudo.imagem} 
                      alt="Hero" 
                      className="w-full rounded-2xl shadow-2xl border-4 border-white/20"
                    />
                  </div>
                )}

                {!safeConteudo.video && !safeConteudo.imagem && (
                  <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl flex items-center justify-center animate-scale-in">
                    <span className="text-gray-400 text-lg">Vídeo ou Imagem Principal</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'sobre-hinode':
      return (
        <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: `${safeSiteData.cores.principal}05` }}>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
              {safeConteudo.subtitulo && (
                <h3 className="text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: safeSiteData.cores.destaque }}>
                  {safeConteudo.subtitulo}
                </h3>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in animation-delay-2000">
                {safeConteudo.imagem ? (
                  <div className="relative">
                    <img src={safeConteudo.imagem} alt="Hinode" className="w-full rounded-2xl shadow-xl" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl shadow-xl flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-16 w-16 mx-auto mb-4" style={{ color: safeSiteData.cores.principal }} />
                      <span className="text-gray-600 text-lg">Logo Hinode</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {safeConteudo.texto && (
                  <div className="text-lg leading-relaxed space-y-4 animate-fade-in animation-delay-1000" style={{ color: safeSiteData.cores.texto }}>
                    {safeConteudo.texto.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 3) * 300}ms` }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Users className="h-8 w-8 mx-auto mb-2" style={{ color: safeSiteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: safeSiteData.cores.principal }}>10+</div>
                    <div className="text-sm text-gray-600">Anos</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Star className="h-8 w-8 mx-auto mb-2" style={{ color: safeSiteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: safeSiteData.cores.principal }}>1M+</div>
                    <div className="text-sm text-gray-600">Clientes</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Award className="h-8 w-8 mx-auto mb-2" style={{ color: safeSiteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: safeSiteData.cores.principal }}>100%</div>
                    <div className="text-sm text-gray-600">Nacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'produtos-destaque':
      return (
        <section className="py-20 px-4" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              {safeConteudo.titulo && (
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: safeSiteData.cores.principal }}>
                  {safeConteudo.titulo}
                </h2>
              )}
              
              {safeConteudo.subtitulo && (
                <p className="text-xl lg:text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: safeSiteData.cores.destaque }}>
                  {safeConteudo.subtitulo}
                </p>
              )}

              {safeConteudo.descricao && (
                <p className="text-lg max-w-3xl mx-auto animate-fade-in animation-delay-2000" style={{ color: safeSiteData.cores.texto }}>
                  {safeConteudo.descricao}
                </p>
              )}
            </div>

            {/* Cards de produtos */}
            {safeConteudo.cards && renderCards(safeConteudo.cards, "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8")}

            {/* Lista de produtos (fallback) */}
            {safeConteudo.lista && !safeConteudo.cards && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safeConteudo.lista.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 text-center group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform" style={{ backgroundColor: safeSiteData.cores.destaque }}>
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors" style={{ color: safeSiteData.cores.texto }}>
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case 'bio':
      return (
        <section className="py-20 px-4 relative" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                {safeConteudo.titulo && (
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: safeSiteData.cores.principal }}>
                    {safeConteudo.titulo}
                  </h2>
                )}

                {safeConteudo.subtitulo && (
                  <h3 className="text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: safeSiteData.cores.destaque }}>
                    {safeConteudo.subtitulo}
                  </h3>
                )}

                {safeConteudo.texto && (
                  <div className="text-lg leading-relaxed space-y-4 animate-fade-in animation-delay-2000" style={{ color: safeSiteData.cores.texto }}>
                    {safeConteudo.texto.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 3) * 200}ms` }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="order-1 lg:order-2">
                {safeConteudo.imagem ? (
                  <div className="relative animate-scale-in">
                    <img src={safeConteudo.imagem} alt="Biografia" className="w-full rounded-2xl shadow-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl flex items-center justify-center animate-scale-in">
                    <span className="text-gray-400 text-lg">Sua foto aqui</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'beneficios':
    case 'servicos':
    case 'habilidades':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${safeSiteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-6xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-4" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            
            {safeConteudo.subtitulo && (
              <p className="text-xl text-center mb-8" style={{ color: safeSiteData.cores.texto }}>
                {safeConteudo.subtitulo}
              </p>
            )}

            {safeConteudo.descricao && (
              <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: safeSiteData.cores.texto }}>
                {safeConteudo.descricao}
              </p>
            )}

            {safeConteudo.lista && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safeConteudo.lista.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold" style={{ backgroundColor: safeSiteData.cores.destaque }}>
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg" style={{ color: safeSiteData.cores.texto }}>{item}</h3>
                  </div>
                ))}
              </div>
            )}

            {safeConteudo.cards && renderCards(safeConteudo.cards)}
          </div>
        </section>
      );

    case 'como-funciona':
    case 'etapas-comecar':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            {renderCards(safeConteudo.cards, "grid grid-cols-1 md:grid-cols-3 gap-8")}
          </div>
        </section>
      );

    case 'sobre':
    case 'sobre-distribuidor':
    case 'produto':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {safeConteudo.titulo && (
                  <h2 className="text-3xl font-bold mb-4" style={{ color: safeSiteData.cores.principal }}>
                    {safeConteudo.titulo}
                  </h2>
                )}

                {safeConteudo.subtitulo && (
                  <h3 className="text-xl mb-6" style={{ color: safeSiteData.cores.destaque }}>
                    {safeConteudo.subtitulo}
                  </h3>
                )}

                {safeConteudo.texto && (
                  <div className="text-lg leading-relaxed" style={{ color: safeSiteData.cores.texto }}>
                    {safeConteudo.texto.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {safeConteudo.imagem ? (
                  <img src={safeConteudo.imagem} alt="Seção" className="w-full rounded-lg shadow-lg" />
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
        <section className="py-16 px-4" style={{ backgroundColor: `${safeSiteData.cores.destaque}10` }}>
          <div className="container mx-auto max-w-6xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            {renderCards(safeConteudo.cards, "grid grid-cols-1 md:grid-cols-2 gap-8")}
          </div>
        </section>
      );

    case 'equipe':
    case 'projetos':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            {renderCards(safeConteudo.cards, "grid grid-cols-1 md:grid-cols-3 gap-8")}
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${safeSiteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-4xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            <div className="space-y-4">
              {safeConteudo.cards?.sort((a, b) => a.ordem - b.ordem).map((faq) => (
                <div key={faq.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: safeSiteData.cores.texto }}>
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
            backgroundColor: safeSiteData.cores.principal,
            backgroundImage: safeConteudo.imagem ? `url(${safeConteudo.imagem})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto max-w-6xl text-center text-white relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {safeConteudo.titulo}
            </h1>
            {safeConteudo.subtitulo && (
              <p className="text-xl lg:text-2xl opacity-90">
                {safeConteudo.subtitulo}
              </p>
            )}
          </div>
        </section>
      );

    case 'mapa':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: safeSiteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Mapa: {safeConteudo.endereco}</p>
            </div>
          </div>
        </section>
      );

    case 'contato':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: `${safeSiteData.cores.principal}10` }}>
          <div className="container mx-auto max-w-4xl">
            {safeConteudo.titulo && (
              <h2 className="text-3xl font-bold text-center mb-6" style={{ color: safeSiteData.cores.principal }}>
                {safeConteudo.titulo}
              </h2>
            )}
            {safeConteudo.subtitulo && (
              <p className="text-center text-lg mb-12" style={{ color: safeSiteData.cores.texto }}>
                {safeConteudo.subtitulo}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {safeConteudo.whatsapp && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2" style={{ color: safeSiteData.cores.texto }}>WhatsApp</h4>
                  <a 
                    href={`https://wa.me/${safeConteudo.whatsapp}`} 
                    className="text-green-600 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {safeConteudo.whatsapp}
                  </a>
                </div>
              )}
              {safeConteudo.telefone && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2" style={{ color: safeSiteData.cores.texto }}>Telefone</h4>
                  <p style={{ color: safeSiteData.cores.texto }}>{safeConteudo.telefone}</p>
                </div>
              )}
              {safeConteudo.email && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2" style={{ color: safeSiteData.cores.texto }}>E-mail</h4>
                  <a href={`mailto:${safeConteudo.email}`} className="hover:underline" style={{ color: safeSiteData.cores.destaque }}>
                    {safeConteudo.email}
                  </a>
                </div>
              )}
            </div>

            <ContactForm 
              clientId={safeSiteData.clientId || ''} 
              isPreview={isPreview}
              cores={safeSiteData.cores}
            />
          </div>
        </section>
      );

    case 'rodape':
    case 'rodape-hinode':
      return (
        <footer className="py-8 px-4" style={{ backgroundColor: safeSiteData.cores.principal }}>
          <div className="container mx-auto max-w-6xl text-center text-white">
            <p className="opacity-90">{safeConteudo.texto}</p>
          </div>
        </footer>
      );

    default:
      return null;
  }
};
