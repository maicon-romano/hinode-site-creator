
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Star, CheckCircle, ArrowRight, Users, Target, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';

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

interface LandingPageTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const { cores, secoes } = siteData;
  
  const styles = {
    backgroundColor: cores.fundo,
    color: cores.texto,
    '--primary-color': cores.principal,
    '--accent-color': cores.destaque,
  } as React.CSSProperties;

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50" style={styles}>
      {/* Header */}
      <header className="py-6 px-6 bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {siteData.logoPath && (
              <Image 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-12 w-auto"
              />
            )}
            <h1 className="text-2xl font-bold" style={{ color: cores.principal }}>
              {siteData.nomeDoSite}
            </h1>
          </div>
          <Button 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: cores.destaque }}
            className="text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Phone className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {siteData.headline}
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {siteData.descricao}
          </p>
          <Button 
            size="lg" 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: cores.destaque }}
            className="text-white hover:opacity-90 text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Começar Agora
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Video Section */}
      {secoes.video && siteData.videoUrl && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h3 className="text-4xl font-bold text-center mb-12" style={{ color: cores.principal }}>
              Veja Como Funciona
            </h3>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black">
              <iframe
                src={siteData.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="Vídeo Demonstrativo"
              />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
            Por Que Escolher Nossa Solução?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "Resultados Garantidos", desc: "Comprovado por milhares de clientes satisfeitos em todo o país" },
              { icon: Award, title: "Qualidade Premium", desc: "Padrão de excelência reconhecido e certificado no mercado" },
              { icon: Users, title: "Suporte Dedicado", desc: "Equipe especializada disponível para ajudar você sempre" }
            ].map((benefit, i) => (
              <Card key={i} className="group text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border-0 bg-white">
                <CardContent className="p-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cores.destaque}20` }}>
                    <benefit.icon className="h-10 w-10" style={{ color: cores.destaque }} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: cores.principal }}>
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      {secoes.depoimentos && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className="flex mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 text-gray-700 italic leading-relaxed">
                      "Excelente serviço! Superou todas as minhas expectativas. Resultados impressionantes!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold mr-4">
                        C{i}
                      </div>
                      <p className="font-bold text-lg" style={{ color: cores.principal }}>
                        Cliente {i}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sobre */}
      {secoes.sobre && (
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-8" style={{ color: cores.principal }}>
                  Nossa História
                </h3>
                <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                  Somos uma empresa dedicada a oferecer os melhores produtos e serviços para nossos clientes. 
                  Com anos de experiência no mercado, nos destacamos pela qualidade e atendimento personalizado.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nossa missão é transformar a vida de nossos clientes através de soluções inovadoras e eficientes.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: cores.destaque }}>5+</div>
                    <div className="text-sm text-gray-600">Anos de Experiência</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: cores.destaque }}>1000+</div>
                    <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <Target className="h-32 w-32 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Formulário */}
      {secoes.formulario && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-4xl font-bold text-center mb-12" style={{ color: cores.principal }}>
              Entre em Contato
            </h3>
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-10">
                <div className="space-y-6">
                  <Input placeholder="Seu nome completo" className="h-14 text-lg" />
                  <Input placeholder="Seu melhor email" type="email" className="h-14 text-lg" />
                  <Input placeholder="Seu WhatsApp" className="h-14 text-lg" />
                  <textarea 
                    className="w-full p-4 border rounded-xl min-h-[140px] resize-y text-lg"
                    placeholder="Como podemos ajudar você?"
                  />
                  <Button 
                    className="w-full text-white h-14 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: cores.destaque }}
                    onClick={handleWhatsAppClick}
                  >
                    Enviar Mensagem
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Contato */}
      {secoes.contato && (
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h3 className="text-4xl font-bold mb-12">
              Fale Conosco Agora
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Phone className="h-10 w-10 mb-4" />
                <h4 className="font-bold mb-2 text-lg">WhatsApp</h4>
                <p className="opacity-90">{siteData.whatsapp}</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Mail className="h-10 w-10 mb-4" />
                <h4 className="font-bold mb-2 text-lg">Email</h4>
                <p className="opacity-90">contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <MapPin className="h-10 w-10 mb-4" />
                <h4 className="font-bold mb-2 text-lg">Localização</h4>
                <p className="opacity-90">Atendimento em Todo Brasil</p>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-6 w-6 mr-3" />
              Conversar no WhatsApp
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h4 className="text-xl font-bold mb-2">{siteData.nomeDoSite}</h4>
          <p className="mb-4">&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400">Transformando vidas através da inovação</p>
        </div>
      </footer>
    </div>
  );
};
