
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Sparkles, TrendingUp, Users, Globe, MessageCircle, ArrowUp, Zap, Shield, Rocket, Star } from 'lucide-react';

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

interface LandingPageModernTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageModernTemplate: React.FC<LandingPageModernTemplateProps> = ({ 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-violet-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Futuristic Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Geometric Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/30 rounded-lg rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/30 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-pink-400/30 rounded-full animate-bounce"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            {/* Futuristic Logo */}
            {siteData.logoPath && (
              <div className="mb-8 animate-scale-in">
                <div className="relative inline-block">
                  <img 
                    src={siteData.logoPath} 
                    alt="Logo" 
                    className="h-20 w-auto mx-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl rounded-full"></div>
                </div>
              </div>
            )}
            
            {/* Glitch Effect Title */}
            <div className="relative mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                {siteData.headline}
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-20 animate-ping"
                   style={{ animationDuration: '3s' }}>
                {siteData.headline}
              </div>
              <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-yellow-400 animate-spin" />
            </div>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              {siteData.descricao}
            </p>
            
            {/* Neon Stats Grid */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              {[
                { number: '10K+', label: 'Clientes Ativos', icon: Users },
                { number: '99.9%', label: 'Uptime', icon: Shield },
                { number: '24/7', label: 'Suporte', icon: Rocket }
              ].map((stat, i) => (
                <div key={i} className="group animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="relative p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="group relative overflow-hidden text-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-500 bg-gradient-to-r from-cyan-400 to-purple-400 font-bold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Phone className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Iniciar Transformação
              <Sparkles className="h-6 w-6 ml-3 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cyberpunk Features Grid */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Tecnologia do Futuro
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: TrendingUp, 
                title: "AI Powered", 
                desc: "Inteligência artificial avançada",
                color: "from-blue-500 to-cyan-500",
                glow: "shadow-blue-500/50"
              },
              { 
                icon: Users, 
                title: "Community", 
                desc: "Rede global de especialistas",
                color: "from-purple-500 to-pink-500",
                glow: "shadow-purple-500/50"
              },
              { 
                icon: Globe, 
                title: "Universal", 
                desc: "Alcance em todo o mundo",
                color: "from-green-500 to-emerald-500",
                glow: "shadow-green-500/50"
              },
              { 
                icon: Sparkles, 
                title: "Innovation", 
                desc: "Tecnologia de vanguarda",
                color: "from-pink-500 to-rose-500",
                glow: "shadow-pink-500/50"
              }
            ].map((feature, i) => (
              <Card key={i} className="group border-0 bg-slate-800/50 backdrop-blur-lg hover:bg-slate-800/70 transition-all duration-500 transform hover:-translate-y-4 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                <CardContent className="p-8 text-center relative">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${feature.glow} group-hover:shadow-2xl`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  
                  {/* Scan Line Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holographic CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-purple-900/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <h3 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pronto para o Futuro?
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se à revolução tecnológica que está transformando o mundo. O futuro começa agora.
          </p>
          
          <div className="relative inline-block">
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="group relative overflow-hidden text-black text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-500 bg-gradient-to-r from-cyan-400 to-purple-400 font-bold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Phone className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Entrar na Matrix
            </Button>
            
            {/* Holographic Elements */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full animate-pulse font-bold shadow-lg">
              LIVE
            </div>
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full animate-pulse font-bold shadow-lg">
              BETA
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Footer */}
      <footer className="py-16 bg-gradient-to-r from-slate-900 to-purple-900 text-white relative overflow-hidden border-t border-cyan-400/20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {siteData.nomeDoSite}
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Conectando o presente ao futuro através de tecnologia revolucionária
            </p>
          </div>
          
          {/* Matrix Rain Effect */}
          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="text-xs text-cyan-400/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              &copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados. Powered by AI.
            </p>
          </div>
        </div>
      </footer>

      {/* Cyberpunk Floating Buttons */}
      {!isPreview && (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col space-y-4 transition-all duration-700 ${isFloatingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back to Top - Holographic Style */}
          <button
            onClick={scrollToTop}
            className="group w-14 h-14 bg-slate-800/80 backdrop-blur-lg rounded-full shadow-2xl shadow-cyan-400/50 hover:shadow-cyan-400/70 transform hover:scale-110 transition-all duration-300 flex items-center justify-center border border-cyan-400/30 hover:border-cyan-400/60 relative overflow-hidden"
            title="Voltar ao topo"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <ArrowUp className="h-6 w-6 text-cyan-400 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
            
            {/* Scan Lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          {/* WhatsApp Button - Neon Style */}
          <button
            onClick={handleWhatsAppClick}
            className="group w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white relative overflow-hidden"
            title="Fale conosco no WhatsApp"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <MessageCircle className="h-8 w-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400 scale-100 animate-ping opacity-30"></div>
            
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse shadow-lg border-2 border-slate-900">
              !
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
