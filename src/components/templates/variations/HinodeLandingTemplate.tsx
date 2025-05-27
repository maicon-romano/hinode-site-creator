
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Play, ChevronRight, Star, Users, Award, MessageCircle, ArrowUp, Menu, X } from 'lucide-react';

interface SiteData {
  nomeDoSite: string;
  headline: string;
  descricao: string;
  videoUrl?: string;
  whatsapp: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  secoes: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
  [key: string]: any;
}

interface HinodeLandingTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const HinodeLandingTemplate: React.FC<HinodeLandingTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const timer = setTimeout(() => setIsFloatingVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  const scrollToTop = () => {
    if (!isPreview) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (!isPreview) {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {siteData.logoPath && (
                <img src={siteData.logoPath} alt="Logo" className="h-10 w-auto" />
              )}
              <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent" 
                  style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                {siteData.nomeDoSite}
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['inicio', 'sobre', 'produtos', 'depoimentos', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item ? 'text-transparent bg-gradient-to-r bg-clip-text' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={activeSection === item ? { backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` } : {}}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r" 
                         style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
              {['inicio', 'sobre', 'produtos', 'depoimentos', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-white hover:bg-gradient-to-r rounded-xl transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    backgroundImage: activeSection === item ? `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` : 'none',
                    color: activeSection === item ? 'white' : undefined
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-6 py-3 bg-gradient-to-r text-white text-sm font-semibold rounded-full shadow-lg animate-pulse"
                    style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                ✨ Transforme sua vida com Hinode
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                {siteData.headline}
              </span>
            </h1>

            {/* Video Section */}
            {siteData.videoUrl && (
              <div className="mb-12 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative max-w-4xl mx-auto group">
                  <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                       style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                  <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <iframe
                      src={siteData.videoUrl.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title="Vídeo Hinode"
                    />
                  </div>
                </div>
              </div>
            )}

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {siteData.descricao}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                className="group relative overflow-hidden text-white text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Phone className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Começar Jornada
                <ChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              {siteData.videoUrl && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group text-lg px-10 py-6 rounded-2xl border-2 hover:bg-gradient-to-r hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-500"
                  style={{ 
                    borderColor: siteData.cores.principal,
                    color: siteData.cores.principal,
                    backgroundImage: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = 'none';
                  }}
                >
                  <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Assistir Novamente
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                Sobre a Hinode
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubra a empresa que está transformando vidas através de produtos inovadores e oportunidades únicas
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-2xl opacity-20"
                       style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                    alt="Hinode" 
                    className="relative w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r text-white p-6 rounded-2xl shadow-xl"
                       style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                    <Award className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                    Mais de 10 anos transformando vidas
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A Hinode é uma empresa brasileira líder em cosméticos e produtos de bem-estar, 
                    comprometida em proporcionar qualidade de vida e oportunidades de crescimento pessoal e profissional.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Users className="h-10 w-10 mx-auto mb-3" style={{ color: siteData.cores.destaque }} />
                    <div className="text-2xl font-bold" style={{ color: siteData.cores.principal }}>1M+</div>
                    <div className="text-sm text-gray-600">Clientes</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Star className="h-10 w-10 mx-auto mb-3" style={{ color: siteData.cores.destaque }} />
                    <div className="text-2xl font-bold" style={{ color: siteData.cores.principal }}>10+</div>
                    <div className="text-sm text-gray-600">Anos</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Award className="h-10 w-10 mx-auto mb-3" style={{ color: siteData.cores.destaque }} />
                    <div className="text-2xl font-bold" style={{ color: siteData.cores.principal }}>100%</div>
                    <div className="text-sm text-gray-600">Nacional</div>
                  </div>
                </div>

                <Button 
                  onClick={handleWhatsAppClick}
                  className="group text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
                >
                  Conhecer Mais
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa linha premium de produtos que combinam inovação, qualidade e resultados excepcionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Cosméticos Premium", desc: "Cuidados faciais e corporais com tecnologia avançada", image: "photo-1596462502278-27bfdc403348" },
              { title: "Suplementos", desc: "Nutrição inteligente para seu bem-estar", image: "photo-1556909114-f6e7ad7d3136" },
              { title: "Perfumaria", desc: "Fragrâncias exclusivas que marcam presença", image: "photo-1541643600914-78b084683601" }
            ].map((product, i) => (
              <Card key={i} className="group border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${product.image}?w=400&h=250&fit=crop`}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                      style={{ 
                        color: siteData.cores.principal,
                        backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})`
                      }}>
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{product.desc}</p>
                  <Button 
                    variant="outline" 
                    onClick={handleWhatsAppClick}
                    className="w-full group border-2 hover:bg-gradient-to-r hover:text-white hover:border-transparent transition-all duration-300"
                    style={{ borderColor: siteData.cores.principal, color: siteData.cores.principal }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundImage = `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundImage = 'none';
                    }}
                  >
                    Saiba Mais
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
              Depoimentos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja o que nossos parceiros e clientes falam sobre a experiência Hinode
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r"
                     style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "A Hinode transformou minha vida! Os produtos são excepcionais e a oportunidade de negócio é incrível. Recomendo de coração!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r rounded-full flex items-center justify-center text-white font-bold mr-4"
                         style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: siteData.cores.principal }}>Cliente {i}</p>
                      <p className="text-sm text-gray-500">Parceiro Hinode</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Entre em contato conosco e descubra como a Hinode pode transformar sua vida pessoal e profissional
          </p>
          
          <div className="relative inline-block">
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="group text-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Phone className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Falar com Especialista
            </Button>
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse shadow-lg">
              GRÁTIS
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-r text-white relative overflow-hidden"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{siteData.nomeDoSite}</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Transformando vidas através de produtos de qualidade e oportunidades de crescimento
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {['Sobre', 'Produtos', 'Contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="text-white/60 text-sm">
              &copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {!isPreview && (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col space-y-4 transition-all duration-500 ${isFloatingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group border-2"
            style={{ borderColor: siteData.cores.principal }}
            title="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" 
                     style={{ color: siteData.cores.principal }} />
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white group relative overflow-hidden"
            style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
            title="Fale conosco no WhatsApp"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <MessageCircle className="h-8 w-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              !
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
