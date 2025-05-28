
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Heart, Star, Gift, ChevronUp, MessageCircle } from 'lucide-react';

interface SiteData {
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  'hero-hinode'?: {
    titulo: string;
    subtitulo: string;
    video?: string;
    botaoTexto: string;
    imagem?: string;
  };
  'sobre-negocio'?: {
    titulo: string;
    texto: string;
    botaoTexto: string;
    imagem?: string;
  };
  'biografia-representante'?: {
    nome: string;
    titulo: string;
    texto: string;
    experiencia: string;
    botaoTexto: string;
    foto?: string;
  };
  'produtos-hinode'?: {
    titulo: string;
    subtitulo: string;
    produtos: string;
  };
  'contato-hinode'?: {
    titulo: string;
    subtitulo: string;
    whatsapp: string;
    mostrarFormulario: boolean;
  };
  'rodape-hinode'?: {
    texto: string;
    ano: string;
  };
  whatsapp?: string;
}

interface HinodePremiumTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const HinodePremiumTemplate: React.FC<HinodePremiumTemplateProps> = ({
  siteData,
  isPreview = false
}) => {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    if (!isPreview) {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, [isPreview]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      const whatsapp = siteData['contato-hinode']?.whatsapp || siteData.whatsapp;
      if (whatsapp) {
        window.open(`https://wa.me/${whatsapp}`, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        style={{ backgroundColor: siteData.cores.destaque }}
      >
        <MessageCircle className="h-7 w-7 text-white mx-auto" />
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{ color: siteData.cores.principal }}
        >
          <ChevronUp className="h-6 w-6 mx-auto" />
        </button>
      )}

      {/* Hero Section */}
      {siteData['hero-hinode'] && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-90"
            style={{
              background: `linear-gradient(135deg, ${siteData.cores.principal}20 0%, ${siteData.cores.destaque}30 100%)`
            }}
          />
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              {siteData.logoPath && (
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-20 w-auto mx-auto mb-8 animate-fade-in"
                />
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up" style={{ color: siteData.cores.principal }}>
                {siteData['hero-hinode'].titulo}
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-500" style={{ color: siteData.cores.texto }}>
                {siteData['hero-hinode'].subtitulo}
              </p>

              {siteData['hero-hinode'].video && (
                <div className="max-w-3xl mx-auto mb-8 animate-fade-in animation-delay-1000">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src={siteData['hero-hinode'].video}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-bounce-slow"
                style={{ backgroundColor: siteData.cores.destaque }}
              >
                <Heart className="h-6 w-6 mr-3" />
                {siteData['hero-hinode'].botaoTexto}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Sobre o Negócio Section */}
      {siteData['sobre-negocio'] && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                {siteData['sobre-negocio'].imagem ? (
                  <img 
                    src={siteData['sobre-negocio'].imagem} 
                    alt="Hinode" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-2xl flex items-center justify-center">
                    <Gift className="h-24 w-24" style={{ color: siteData.cores.principal }} />
                  </div>
                )}
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
                  {siteData['sobre-negocio'].titulo}
                </h2>
                
                <p className="text-lg mb-8 leading-relaxed" style={{ color: siteData.cores.texto }}>
                  {siteData['sobre-negocio'].texto}
                </p>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="text-white rounded-full px-8 py-4"
                  style={{ backgroundColor: siteData.cores.principal }}
                >
                  {siteData['sobre-negocio'].botaoTexto}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Biografia do Representante */}
      {siteData['biografia-representante'] && (
        <section className="py-20 px-6" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
                  {siteData['biografia-representante'].nome}
                </h2>
                
                <h3 className="text-2xl mb-4" style={{ color: siteData.cores.destaque }}>
                  {siteData['biografia-representante'].titulo}
                </h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5" style={{ color: siteData.cores.destaque }} />
                  <span className="font-semibold">{siteData['biografia-representante'].experiencia} de experiência</span>
                </div>
                
                <p className="text-lg mb-8 leading-relaxed" style={{ color: siteData.cores.texto }}>
                  {siteData['biografia-representante'].texto}
                </p>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="text-white rounded-full px-8 py-4"
                  style={{ backgroundColor: siteData.cores.destaque }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {siteData['biografia-representante'].botaoTexto}
                </Button>
              </div>
              
              <div className="flex justify-center">
                {siteData['biografia-representante'].foto ? (
                  <img 
                    src={siteData['biografia-representante'].foto} 
                    alt={siteData['biografia-representante'].nome} 
                    className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
                  />
                ) : (
                  <div className="w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full shadow-2xl border-8 border-white flex items-center justify-center">
                    <Heart className="h-24 w-24" style={{ color: siteData.cores.principal }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Produtos Section */}
      {siteData['produtos-hinode'] && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                {siteData['produtos-hinode'].titulo}
              </h2>
              <p className="text-xl" style={{ color: siteData.cores.texto }}>
                {siteData['produtos-hinode'].subtitulo}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteData['produtos-hinode'].produtos.split('\n').filter(produto => produto.trim()).map((produto, index) => {
                const [titulo, descricao] = produto.split(' - ');
                return (
                  <Card key={index} className="group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border-0 overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gift className="h-16 w-16" style={{ color: siteData.cores.principal }} />
                      </div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-3" style={{ color: siteData.cores.principal }}>
                        {titulo}
                      </h3>
                      {descricao && (
                        <p className="text-gray-600 mb-4">{descricao}</p>
                      )}
                      <Button 
                        onClick={handleWhatsAppClick}
                        className="w-full text-white rounded-full"
                        style={{ backgroundColor: siteData.cores.destaque }}
                      >
                        Ver Produto
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contato Section */}
      {siteData['contato-hinode'] && (
        <section className="py-20 px-6" style={{ backgroundColor: `${siteData.cores.destaque}10` }}>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                {siteData['contato-hinode'].titulo}
              </h2>
              <p className="text-xl" style={{ color: siteData.cores.texto }}>
                {siteData['contato-hinode'].subtitulo}
              </p>
            </div>
            
            {siteData['contato-hinode'].mostrarFormulario && (
              <Card className="shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input placeholder="Seu Nome" className="rounded-full" />
                    <Input placeholder="Seu Telefone" className="rounded-full" />
                    <Input placeholder="Seu Email" type="email" className="rounded-full" />
                    <Input placeholder="Assunto" className="rounded-full" />
                  </div>
                  <Textarea 
                    placeholder="Sua mensagem..."
                    className="mb-6 rounded-2xl min-h-[120px]"
                  />
                  <Button 
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="w-full text-white text-lg py-4 rounded-full"
                    style={{ backgroundColor: siteData.cores.destaque }}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="text-white text-xl px-12 py-6 rounded-full shadow-2xl"
                style={{ backgroundColor: siteData.cores.principal }}
              >
                <Phone className="h-6 w-6 mr-3" />
                WhatsApp: {siteData['contato-hinode'].whatsapp}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: siteData.cores.principal }}>
        <div className="container mx-auto text-center text-white">
          <div className="mb-6">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-12 w-auto mx-auto mb-4 filter brightness-0 invert"
              />
            )}
            <h4 className="text-xl font-bold mb-2">{siteData.nomeDoSite}</h4>
          </div>
          
          {siteData['rodape-hinode'] && (
            <>
              <p className="mb-4 opacity-90">{siteData['rodape-hinode'].texto}</p>
              <p className="text-sm opacity-75">© {siteData['rodape-hinode'].ano} - Todos os direitos reservados</p>
            </>
          )}
          
          <div className="mt-6 flex justify-center items-center gap-2">
            <Heart className="h-4 w-4 text-red-300" />
            <span className="text-sm opacity-75">Feito com amor para transformar vidas</span>
            <Heart className="h-4 w-4 text-red-300" />
          </div>
        </div>
      </footer>
    </div>
  );
};
