
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, ArrowRight, Zap, Shield, Award, MessageCircle, ArrowUp, Sparkles, CheckCircle } from 'lucide-react';

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
}

interface LandingPageMinimalTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageMinimalTemplate: React.FC<LandingPageMinimalTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-6 px-6">
          <div className="flex items-center gap-4">
            {siteData.logoPath && (
              <div className="relative">
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-12 w-auto transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
              </div>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
              {siteData.nomeDoSite}
            </h1>
          </div>
          <Button 
            variant="outline"
            onClick={handleWhatsAppClick}
            className="group border-2 hover:bg-gradient-to-r hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            style={{ borderColor: siteData.cores.principal, color: siteData.cores.principal }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundImage = `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundImage = 'none';
            }}
          >
            <Phone className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Contato
          </Button>
        </div>
      </header>

      {/* Hero Section with Advanced Animations */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="animate-fade-in">
            {/* Floating Badge */}
            <div className="inline-block mb-8">
              <span className="relative px-6 py-3 bg-white/90 backdrop-blur-sm text-sm font-semibold rounded-full shadow-xl border border-white/20 animate-pulse"
                    style={{ color: siteData.cores.principal }}>
                <Sparkles className="h-4 w-4 inline mr-2" />
                Transforme sua realidade hoje
                <div className="absolute inset-0 bg-gradient-to-r rounded-full opacity-0 hover:opacity-10 transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
              </span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black mb-12 leading-none tracking-tight">
              <span className="bg-gradient-to-r bg-clip-text text-transparent animate-pulse"
                    style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                {siteData.headline}
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                className="group relative overflow-hidden text-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center">
                  <Phone className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Começar Agora
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: '1000+', label: 'Clientes Satisfeitos' },
                { number: '99%', label: 'Taxa de Sucesso' },
                { number: '24/7', label: 'Suporte Disponível' }
              ].map((stat, i) => (
                <div key={i} className="group animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                         style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    <div className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                         style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features with Advanced Hover Effects */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
            Por Que Nos Escolher?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: "Resultados Rápidos", 
                desc: "Transformação em tempo recorde com nossa metodologia exclusiva",
                gradient: "from-yellow-400 to-orange-500"
              },
              { 
                icon: Shield, 
                title: "Segurança Total", 
                desc: "Proteção completa e garantia de satisfação em todos os processos",
                gradient: "from-blue-400 to-blue-600"
              },
              { 
                icon: Award, 
                title: "Qualidade Premiada", 
                desc: "Reconhecimento internacional pela excelência em atendimento",
                gradient: "from-purple-400 to-purple-600"
              }
            ].map((feature, i) => (
              <Card key={i} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                     style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                <CardContent className="p-10 text-center relative">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                      style={{ 
                        color: siteData.cores.texto,
                        backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})`
                      }}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  
                  {/* Hover Effect Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                       style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax Effect */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r opacity-5"
             style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="animate-fade-in">
            <h3 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
              Pronto para Decolar?
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Junte-se a milhares de pessoas que já transformaram suas vidas. O momento perfeito é agora.
            </p>
            
            <div className="relative inline-block">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                className="group relative overflow-hidden text-white text-xl px-16 py-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Transformar Minha Vida
                </div>
              </Button>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full animate-pulse shadow-lg font-bold">
                LIMITADO
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full animate-pulse shadow-lg font-bold">
                GRÁTIS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-16 bg-gradient-to-r text-white relative overflow-hidden"
              style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{siteData.nomeDoSite}</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Transformando sonhos em realidade através de soluções inovadoras e atendimento excepcional
            </p>
          </div>
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60 text-sm">
              &copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados. Feito com ❤️ para você.
            </p>
          </div>
        </div>
      </footer>

      {/* Advanced Floating Action Buttons */}
      {!isPreview && (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col space-y-4 transition-all duration-700 ${isFloatingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group w-14 h-14 bg-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 relative overflow-hidden"
            style={{ borderColor: siteData.cores.principal }}
            title="Voltar ao topo"
          >
            <div className="absolute inset-0 bg-gradient-to-r rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 opacity-10"
                 style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}></div>
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" 
                     style={{ color: siteData.cores.principal }} />
          </button>
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="group w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white relative overflow-hidden"
            style={{ backgroundImage: `linear-gradient(135deg, ${siteData.cores.principal}, ${siteData.cores.destaque})` }}
            title="Fale conosco no WhatsApp"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <MessageCircle className="h-8 w-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse shadow-lg">
              1
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </button>
        </div>
      )}
    </div>
  );
};
