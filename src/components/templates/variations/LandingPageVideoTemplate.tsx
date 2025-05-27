import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Star, Play, CheckCircle } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';
import { convertYouTubeToEmbed } from '@/lib/imageUtils';

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

interface LandingPageVideoTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageVideoTemplate: React.FC<LandingPageVideoTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const { cores, secoes } = siteData;
  
  const styles = {
    backgroundColor: cores.fundo,
    color: cores.texto,
  } as React.CSSProperties;

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  // Garantir que a URL do vídeo está no formato correto para embed
  const embedUrl = siteData.videoUrl ? convertYouTubeToEmbed(siteData.videoUrl) : '';

  return (
    <div className="min-h-screen" style={styles}>
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Hero Section with Video */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-16 w-auto mx-auto mb-8 animate-scale-in"
              />
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ color: cores.principal }}>
              {siteData.headline}
            </h1>
            
            {/* Video Section */}
            {secoes.video && embedUrl && (
              <div className="mb-8">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Vídeo Demonstrativo"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto" style={{ color: cores.texto }}>
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Começar Agora
              </Button>
              
              {secoes.video && embedUrl && (
                <Button 
                  variant="outline" 
                  size="lg"
                  style={{ borderColor: cores.principal, color: cores.principal }}
                  className="hover:bg-gray-50 text-lg px-8 py-4 rounded-full"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Assistir Novamente
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
            Por Que Escolher Nossa Solução?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "Resultados Garantidos", desc: "Comprovado por milhares de clientes satisfeitos" },
              { icon: Star, title: "Qualidade Superior", desc: "Padrão de excelência reconhecido no mercado" },
              { icon: Phone, title: "Suporte 24/7", desc: "Atendimento especializado sempre que precisar" }
            ].map((benefit, i) => (
              <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <benefit.icon className="h-16 w-16 mx-auto mb-4" style={{ color: cores.destaque }} />
                  <h4 className="text-xl font-semibold mb-3" style={{ color: cores.principal }}>
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      {secoes.depoimentos && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center mb-12" style={{ color: cores.principal }}>
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4">
                      "Excelente serviço! Superou todas as minhas expectativas. Recomendo muito!"
                    </p>
                    <p className="font-semibold" style={{ color: cores.principal }}>
                      Cliente {i}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sobre */}
      {secoes.sobre && (
        <section className="py-16 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-8" style={{ color: cores.principal }}>
              Sobre Nós
            </h3>
            <div className="text-center">
              <p className="text-lg mb-6">
                Somos uma empresa dedicada a oferecer os melhores produtos e serviços para nossos clientes. 
                Com anos de experiência no mercado, nos destacamos pela qualidade e atendimento personalizado.
              </p>
              <p className="text-lg">
                Nossa missão é transformar a vida de nossos clientes através de soluções inovadoras e eficientes.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Formulário */}
      {secoes.formulario && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <h3 className="text-3xl font-bold text-center mb-8" style={{ color: cores.principal }}>
              Entre em Contato
            </h3>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Input placeholder="Seu nome" />
                  <Input placeholder="Seu email" type="email" />
                  <Input placeholder="Seu telefone" />
                  <textarea 
                    className="w-full p-3 border rounded-md min-h-[120px] resize-y"
                    placeholder="Sua mensagem..."
                  />
                  <Button 
                    className="w-full text-white"
                    style={{ backgroundColor: cores.destaque }}
                    onClick={handleWhatsAppClick}
                  >
                    Enviar Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Contato */}
      {secoes.contato && (
        <section className="py-16 px-6" style={{ backgroundColor: cores.principal }}>
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-3xl font-bold mb-8 text-white">
              Fale Conosco
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Telefone</h4>
                <p>{siteData.whatsapp}</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p>contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Endereço</h4>
                <p>Rua Example, 123<br />Cidade, Estado</p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: cores.principal }}>
        <div className="container mx-auto">
          <p className="text-white">&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
