
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight, Zap, Shield, Award } from 'lucide-react';
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

interface LandingPageMinimalTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageMinimalTemplate: React.FC<LandingPageMinimalTemplateProps> = ({ 
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
    <div className="min-h-screen bg-white">
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Minimal Header */}
      <header className="py-6 px-6 border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-8 w-auto"
              />
            )}
            <h1 className="text-xl font-semibold" style={{ color: cores.principal }}>
              {siteData.nomeDoSite}
            </h1>
          </div>
          <Button 
            variant="outline"
            onClick={handleWhatsAppClick}
            className="border-2 hover:bg-gray-50"
            style={{ borderColor: cores.principal, color: cores.principal }}
          >
            Contato
          </Button>
        </div>
      </header>

      {/* Hero Section - Minimal & Clean */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight" style={{ color: cores.texto }}>
              {siteData.headline}
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Começar Agora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Minimal Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Rápido", desc: "Resultados em tempo recorde" },
              { icon: Shield, title: "Seguro", desc: "Proteção total garantida" },
              { icon: Award, title: "Premiado", desc: "Reconhecido pela excelência" }
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4" style={{ color: cores.principal }} />
                  <h4 className="text-lg font-semibold mb-2" style={{ color: cores.texto }}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-light mb-6" style={{ color: cores.principal }}>
            Pronto para começar?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Entre em contato conosco e descubra como podemos ajudar você.
          </p>
          <Button 
            size="lg" 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: cores.destaque }}
            className="text-white hover:opacity-90 px-12 py-4 rounded-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Falar com Especialista
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
