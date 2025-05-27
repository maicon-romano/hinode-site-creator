
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Sparkles, TrendingUp, Users, Globe } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';

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
  const { cores, secoes } = siteData;
  
  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Modern Hero with Floating Elements */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 animate-pulse"
            style={{ backgroundColor: cores.principal }}
          />
          <div 
            className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-20 animate-pulse"
            style={{ backgroundColor: cores.destaque }}
          />
          <div 
            className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-10 animate-bounce"
            style={{ backgroundColor: cores.principal }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            {siteData.logoPath && (
              <div className="mb-8 animate-scale-in">
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-16 w-auto mx-auto"
                />
              </div>
            )}
            
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${cores.principal}, ${cores.destaque})` 
                  }}>
                {siteData.headline}
              </h1>
              <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto font-light">
              {siteData.descricao}
            </p>
            
            {/* Modern Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: cores.principal }}>1000+</div>
                <div className="text-sm text-gray-500">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: cores.principal }}>99%</div>
                <div className="text-sm text-gray-500">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: cores.principal }}>24/7</div>
                <div className="text-sm text-gray-500">Suporte</div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="text-white hover:opacity-90 text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              style={{ backgroundColor: cores.destaque }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
              <Phone className="h-6 w-6 mr-3" />
              Transformar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Crescimento", desc: "Resultados escaláveis", color: "bg-blue-500" },
              { icon: Users, title: "Comunidade", desc: "Rede de especialistas", color: "bg-purple-500" },
              { icon: Globe, title: "Global", desc: "Alcance mundial", color: "bg-green-500" },
              { icon: Sparkles, title: "Inovação", desc: "Tecnologia de ponta", color: "bg-pink-500" }
            ].map((feature, i) => (
              <Card key={i} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`} />
                  <feature.icon className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" 
                              style={{ color: cores.principal }} />
                  <h4 className="text-lg font-bold mb-2" style={{ color: cores.texto }}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: `${cores.principal}08` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${cores.principal}, ${cores.destaque})` 
              }}>
            Pronto para o Futuro?
          </h3>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas vidas com nossa solução.
          </p>
          
          <div className="relative inline-block">
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="text-white hover:opacity-90 text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: cores.destaque }}
            >
              <Phone className="h-5 w-5 mr-2" />
              Começar Minha Jornada
            </Button>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              NOVO
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
