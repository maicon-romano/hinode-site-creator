
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Star, Rocket, Users, Award, CheckCircle } from 'lucide-react';

interface SiteData {
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  hero?: {
    titulo: string;
    subtitulo?: string;
    videoUrl?: string;
    botaoTexto?: string;
    imagemHero?: string;
  };
  beneficios?: {
    titulo: string;
    lista: string;
  };
  contato?: {
    titulo: string;
    whatsapp: string;
  };
  whatsapp?: string;
}

interface LandingPremiumTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPremiumTemplate: React.FC<LandingPremiumTemplateProps> = ({
  siteData,
  isPreview = false
}) => {
  const handleWhatsAppClick = () => {
    if (!isPreview) {
      const whatsapp = siteData.contato?.whatsapp || siteData.whatsapp;
      if (whatsapp) {
        window.open(`https://wa.me/${whatsapp}`, '_blank');
      }
    }
  };

  const styles = {
    '--primary': siteData.cores.principal,
    '--accent': siteData.cores.destaque,
    '--text': siteData.cores.texto,
    '--bg': siteData.cores.fundo,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen relative overflow-hidden" style={styles}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {siteData.logoPath && (
              <img src={siteData.logoPath} alt="Logo" className="h-12 w-auto" />
            )}
            <h1 className="text-2xl font-bold text-white">
              {siteData.nomeDoSite}
            </h1>
          </div>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Zap className="h-4 w-4 mr-2" />
            Contato
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Tecnologia Premium</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in animation-delay-500">
                {siteData.hero?.titulo || 'Transforme Seus Sonhos em Realidade'}
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 animate-fade-in animation-delay-1000">
                {siteData.hero?.subtitulo || 'Descubra o futuro dos negócios digitais com nossa tecnologia revolucionária'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-1500">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                  {siteData.hero?.botaoTexto || 'Começar Agora'}
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-xl px-12 py-6 rounded-full"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in animation-delay-1000">
              {siteData.hero?.videoUrl ? (
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <iframe
                    src={siteData.hero.videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : siteData.hero?.imagemHero ? (
                <div className="relative">
                  <img 
                    src={siteData.hero.imagemHero} 
                    alt="Hero" 
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-3xl"></div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Rocket className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                    <span className="text-xl">Conteúdo Dinâmico</span>
                  </div>
                </div>
              )}
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Award className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {siteData.beneficios && (
        <section className="relative z-10 py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {siteData.beneficios.titulo}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteData.beneficios.lista.split('\n').filter(item => item.trim()).map((benefit, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                      {benefit}
                    </h3>
                    <p className="text-blue-100">
                      Tecnologia avançada que transforma sua experiência digital
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Clientes Satisfeitos', icon: Users },
              { number: '99.9%', label: 'Uptime Garantido', icon: Shield },
              { number: '24/7', label: 'Suporte Premium', icon: Zap },
              { number: '#1', label: 'Ranking Nacional', icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              {siteData.contato?.titulo || 'Pronto para Começar?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Junte-se a milhares de clientes satisfeitos e transforme seu negócio hoje mesmo
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xl px-16 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Falar com Especialista
              <ArrowRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-blue-200">
            © 2024 {siteData.nomeDoSite}. Transformando o futuro digital.
          </p>
        </div>
      </footer>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
