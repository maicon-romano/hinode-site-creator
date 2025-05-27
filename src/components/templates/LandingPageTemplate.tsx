
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Star } from 'lucide-react';

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
    <div className="min-h-screen" style={styles}>
      {/* Header */}
      <header className="py-4 px-6 shadow-sm" style={{ backgroundColor: cores.principal }}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-10 w-auto"
              />
            )}
            <h1 className="text-xl font-bold text-white">{siteData.nomeDoSite}</h1>
          </div>
          <Button 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: cores.destaque }}
            className="text-white hover:opacity-90"
          >
            <Phone className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: cores.principal }}>
            {siteData.headline}
          </h2>
          <p className="text-xl mb-8 opacity-80">
            {siteData.descricao}
          </p>
          <Button 
            size="lg" 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: cores.destaque }}
            className="text-white hover:opacity-90 text-lg px-8 py-3"
          >
            Fale Conosco Agora
          </Button>
        </div>
      </section>

      {/* Video Section */}
      {secoes.video && siteData.videoUrl && (
        <section className="py-16 px-6" style={{ backgroundColor: `${cores.principal}10` }}>
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-8" style={{ color: cores.principal }}>
              Veja Como Funciona
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
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
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: `${cores.principal}20` }}>
        <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
