
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, ArrowRight, Award, Users, Star, Mail, MapPin, Heart } from 'lucide-react';
import { getImageUrl } from '@/lib/imageUtils';

interface SiteData {
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
  activeSections?: string[];
  whatsapp?: string;
  // Dados específicos por seção
  'hero-hinode'?: {
    titulo?: string;
    subtitulo?: string;
    texto?: string;
    video?: string;
    botaoTexto?: string;
    botaoLink?: string;
    whatsapp?: string;
  };
  bio?: {
    titulo?: string;
    subtitulo?: string;
    texto?: string;
    imagem?: string;
    experiencia?: string;
    botaoTexto?: string;
    botaoLink?: string;
  };
  'sobre-hinode'?: {
    titulo?: string;
    subtitulo?: string;
    texto?: string;
    imagem?: string;
  };
  'produtos-destaque'?: {
    titulo?: string;
    subtitulo?: string;
    descricao?: string;
    lista?: string;
    cards?: Array<{
      id: string;
      titulo: string;
      texto?: string;
      imagem?: string;
      ordem: number;
    }>;
  };
  contato?: {
    titulo?: string;
    subtitulo?: string;
    whatsapp?: string;
    telefone?: string;
    email?: string;
    endereco?: string;
  };
  'rodape-hinode'?: {
    texto?: string;
  };
  [key: string]: any;
}

interface RepresentanteHinodeSiteProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const RepresentanteHinodeSite: React.FC<RepresentanteHinodeSiteProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  console.log('RepresentanteHinodeSite - Dados recebidos:', siteData);

  const handleWhatsAppClick = (phone?: string) => {
    if (!isPreview && phone) {
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  };

  // Extrair dados das seções com fallbacks seguros
  const heroHinode = siteData['hero-hinode'] || {};
  const bio = siteData.bio || {};
  const sobreHinode = siteData['sobre-hinode'] || {};
  const produtosDestaque = siteData['produtos-destaque'] || {};
  const contato = siteData.contato || {};
  const rodapeHinode = siteData['rodape-hinode'] || {};

  const whatsappNumber = heroHinode.whatsapp || contato.whatsapp || siteData.whatsapp;

  console.log('RepresentanteHinodeSite - Seções extraídas:', {
    heroHinode,
    bio,
    sobreHinode,
    produtosDestaque,
    contato,
    rodapeHinode
  });

  // Função auxiliar para obter URL de imagem
  const getSafeImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '';
    return getImageUrl(imagePath);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      {siteData.activeSections?.includes('hero-hinode') && (
        <section 
          className="relative py-16 lg:py-20 px-4 min-h-screen flex items-center overflow-hidden w-full text-white"
          style={{ 
            background: siteData.cores.degradeHero ? 
              `linear-gradient(135deg, ${siteData.cores.degradeHero.inicio}, ${siteData.cores.degradeHero.fim})` :
              `linear-gradient(135deg, #0067c7, #00ffcc)`
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                {siteData.logoPath && (
                  <img 
                    src={getSafeImageUrl(siteData.logoPath)} 
                    alt="Logo" 
                    className="h-16 w-auto mb-8 mx-auto lg:mx-0 animate-fade-in"
                    onError={(e) => {
                      console.log('Erro ao carregar logo:', siteData.logoPath);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in text-white">
                  {heroHinode.titulo || siteData.nomeDoSite || 'Seu Nome Aqui'}
                </h1>
                
                {heroHinode.subtitulo && (
                  <p className="text-xl lg:text-2xl opacity-90 mb-6 animate-fade-in animation-delay-1000 text-white">
                    {heroHinode.subtitulo}
                  </p>
                )}

                {heroHinode.texto && (
                  <p className="text-lg opacity-80 mb-8 animate-fade-in animation-delay-2000 text-white">
                    {heroHinode.texto}
                  </p>
                )}
                
                {whatsappNumber && (
                  <Button
                    onClick={() => handleWhatsAppClick(whatsappNumber)}
                    className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-white animate-fade-in animation-delay-2000 group"
                    style={{ backgroundColor: siteData.cores.destaque }}
                  >
                    {heroHinode.botaoTexto || 'Fale Comigo'}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>

              <div className="order-first lg:order-last">
                {heroHinode.video ? (
                  <div className="animate-scale-in">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <iframe
                        src={heroHinode.video.replace('watch?v=', 'embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title="Vídeo de apresentação"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-white/10 to-white/20 rounded-2xl shadow-2xl flex items-center justify-center animate-scale-in border-4 border-white/20">
                    <span className="text-white/60 text-lg">Adicione seu vídeo de apresentação</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bio Section */}
      {siteData.activeSections?.includes('bio') && (
        <section className="py-20 px-4 relative" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: siteData.cores.principal }}>
                  {bio.titulo || 'Sobre Mim'}
                </h2>

                {bio.subtitulo && (
                  <h3 className="text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.destaque }}>
                    {bio.subtitulo}
                  </h3>
                )}

                {bio.texto && (
                  <div className="text-lg leading-relaxed space-y-4 animate-fade-in animation-delay-2000" style={{ color: siteData.cores.texto }}>
                    {bio.texto.split('\n').map((paragraph: string, index: number) => (
                      paragraph.trim() && (
                        <p key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 3) * 200}ms` }}>
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                )}

                {bio.experiencia && (
                  <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Experiência</p>
                    <p className="font-semibold" style={{ color: siteData.cores.principal }}>{bio.experiencia}</p>
                  </div>
                )}

                {whatsappNumber && (
                  <Button
                    onClick={() => handleWhatsAppClick(whatsappNumber)}
                    className="inline-flex items-center gap-2 px-6 py-3 mt-6 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-white"
                    style={{ backgroundColor: siteData.cores.destaque }}
                  >
                    {bio.botaoTexto || 'Entre em Contato'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="order-1 lg:order-2">
                {bio.imagem ? (
                  <div className="relative animate-scale-in">
                    <img 
                      src={getSafeImageUrl(bio.imagem)} 
                      alt="Biografia" 
                      className="w-full rounded-2xl shadow-2xl"
                      onError={(e) => {
                        console.log('Erro ao carregar imagem da bio:', bio.imagem);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
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
      )}

      {/* Sobre Hinode Section */}
      {siteData.activeSections?.includes('sobre-hinode') && (
        <section className="py-20 px-4 relative overflow-hidden w-full" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: siteData.cores.principal }}>
                {sobreHinode.titulo || 'Sobre a Hinode'}
              </h2>
              {sobreHinode.subtitulo && (
                <h3 className="text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.destaque }}>
                  {sobreHinode.subtitulo}
                </h3>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in animation-delay-2000">
                {sobreHinode.imagem ? (
                  <div className="relative">
                    <img 
                      src={getSafeImageUrl(sobreHinode.imagem)} 
                      alt="Hinode" 
                      className="w-full rounded-2xl shadow-xl"
                      onError={(e) => {
                        console.log('Erro ao carregar imagem Hinode:', sobreHinode.imagem);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl shadow-xl flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-16 w-16 mx-auto mb-4" style={{ color: siteData.cores.principal }} />
                      <span className="text-gray-600 text-lg">Logo Hinode</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {sobreHinode.texto && (
                  <div className="text-lg leading-relaxed space-y-4 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.texto }}>
                    {sobreHinode.texto.split('\n').map((paragraph: string, index: number) => (
                      paragraph.trim() && (
                        <p key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 3) * 300}ms` }}>
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Users className="h-8 w-8 mx-auto mb-2" style={{ color: siteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: siteData.cores.principal }}>10+</div>
                    <div className="text-sm text-gray-600">Anos</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Star className="h-8 w-8 mx-auto mb-2" style={{ color: siteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: siteData.cores.principal }}>1M+</div>
                    <div className="text-sm text-gray-600">Clientes</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm animate-scale-in animation-delay-2000">
                    <Award className="h-8 w-8 mx-auto mb-2" style={{ color: siteData.cores.destaque }} />
                    <div className="font-bold text-2xl" style={{ color: siteData.cores.principal }}>100%</div>
                    <div className="text-sm text-gray-600">Nacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Produtos Destaque */}
      {siteData.activeSections?.includes('produtos-destaque') && (
        <section className="py-20 px-4 w-full" style={{ backgroundColor: siteData.cores.fundo }}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in" style={{ color: siteData.cores.principal }}>
                {produtosDestaque.titulo || 'Produtos em Destaque'}
              </h2>
              
              {produtosDestaque.subtitulo && (
                <p className="text-xl lg:text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.destaque }}>
                  {produtosDestaque.subtitulo}
                </p>
              )}

              {produtosDestaque.descricao && (
                <p className="text-lg max-w-3xl mx-auto animate-fade-in animation-delay-2000" style={{ color: siteData.cores.texto }}>
                  {produtosDestaque.descricao}
                </p>
              )}
            </div>

            {/* Cards de produtos */}
            {produtosDestaque.cards && produtosDestaque.cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosDestaque.cards.sort((a, b) => a.ordem - b.ordem).map((card, index) => (
                  <div 
                    key={card.id} 
                    className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 animate-fade-in group"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      borderColor: `${siteData.cores.principal}20`,
                      backgroundColor: 'white'
                    }}
                  >
                    {card.imagem && (
                      <div className="overflow-hidden rounded-lg mb-4">
                        <img 
                          src={getSafeImageUrl(card.imagem)} 
                          alt={card.titulo} 
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.log('Erro ao carregar imagem do produto:', card.imagem);
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <h3 
                      className="font-semibold text-lg mb-2 group-hover:opacity-80 transition-colors" 
                      style={{ color: siteData.cores.texto }}
                    >
                      {card.titulo}
                    </h3>
                    {card.texto && (
                      <p className="text-gray-600 leading-relaxed">{card.texto}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Lista de produtos (fallback) */}
            {produtosDestaque.lista && !produtosDestaque.cards?.length && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosDestaque.lista.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 text-center group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform" style={{ backgroundColor: siteData.cores.destaque }}>
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors" style={{ color: siteData.cores.texto }}>
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contato */}
      {siteData.activeSections?.includes('contato') && (
        <section className="py-16 px-4" style={{ backgroundColor: `${siteData.cores.principal}10` }}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-6" style={{ color: siteData.cores.principal }}>
              {contato.titulo || 'Entre em Contato'}
            </h2>
            {contato.subtitulo && (
              <p className="text-center text-lg mb-12" style={{ color: siteData.cores.texto }}>
                {contato.subtitulo}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {(contato.whatsapp || whatsappNumber) && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>WhatsApp</h4>
                  <Button
                    onClick={() => handleWhatsAppClick(contato.whatsapp || whatsappNumber)}
                    className="text-green-600 hover:underline font-medium bg-transparent border-0 p-0 h-auto"
                  >
                    {contato.whatsapp || whatsappNumber}
                  </Button>
                </div>
              )}
              {contato.telefone && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>Telefone</h4>
                  <p style={{ color: siteData.cores.texto }}>{contato.telefone}</p>
                </div>
              )}
              {contato.email && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Mail className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>E-mail</h4>
                  <a href={`mailto:${contato.email}`} className="hover:underline" style={{ color: siteData.cores.destaque }}>
                    {contato.email}
                  </a>
                </div>
              )}
              {contato.endereco && (
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <MapPin className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-semibold mb-2" style={{ color: siteData.cores.texto }}>Endereço</h4>
                  <p style={{ color: siteData.cores.texto }}>{contato.endereco}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Rodapé */}
      {siteData.activeSections?.includes('rodape-hinode') && (
        <footer className="py-8 px-4" style={{ backgroundColor: siteData.cores.principal }}>
          <div className="container mx-auto max-w-6xl text-center text-white">
            <p className="opacity-90">
              {rodapeHinode.texto || `© 2024 ${siteData.nomeDoSite}. Todos os direitos reservados.`}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};
