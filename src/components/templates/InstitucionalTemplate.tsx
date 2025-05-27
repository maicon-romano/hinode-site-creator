
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Users, Target, Award } from 'lucide-react';

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

interface InstitucionalTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalTemplate: React.FC<InstitucionalTemplateProps> = ({ 
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

  return (
    <div className="min-h-screen" style={styles}>
      {/* Navigation */}
      <nav className="py-4 px-6 shadow-sm border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteData.logoPath && (
              <img 
                src={siteData.logoPath} 
                alt="Logo" 
                className="h-12 w-auto"
              />
            )}
            <h1 className="text-2xl font-bold" style={{ color: cores.principal }}>
              {siteData.nomeDoSite}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="hover:opacity-70">Início</a>
            {secoes.sobre && <a href="#sobre" className="hover:opacity-70">Sobre</a>}
            {secoes.contato && <a href="#contato" className="hover:opacity-70">Contato</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: cores.principal }}>
                {siteData.headline}
              </h2>
              <p className="text-xl mb-8 opacity-80">
                {siteData.descricao}
              </p>
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90"
              >
                <Phone className="h-4 w-4 mr-2" />
                Entre em Contato
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: `${cores.principal}10` }}>
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop" 
                  alt="Empresa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {secoes.video && siteData.videoUrl && (
        <section className="py-16 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-8" style={{ color: cores.principal }}>
              Conheça Nossa História
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={siteData.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="Vídeo Institucional"
              />
            </div>
          </div>
        </section>
      )}

      {/* Sobre Section */}
      {secoes.sobre && (
        <section id="sobre" className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center mb-12" style={{ color: cores.principal }}>
              Sobre Nossa Empresa
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 mx-auto mb-4" style={{ color: cores.principal }} />
                  <h4 className="text-xl font-semibold mb-2">Nossa Equipe</h4>
                  <p>Profissionais experientes e dedicados ao seu sucesso.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 mx-auto mb-4" style={{ color: cores.principal }} />
                  <h4 className="text-xl font-semibold mb-2">Nossa Missão</h4>
                  <p>Entregar soluções de qualidade que superem expectativas.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 mx-auto mb-4" style={{ color: cores.principal }} />
                  <h4 className="text-xl font-semibold mb-2">Nossa Visão</h4>
                  <p>Ser referência no mercado através da inovação e excelência.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">
                Com anos de experiência no mercado, nossa empresa se dedica a oferecer 
                soluções personalizadas e de alta qualidade. Nosso compromisso é com a 
                satisfação total de nossos clientes, sempre buscando a excelência em 
                todos os nossos serviços.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Depoimentos */}
      {secoes.depoimentos && (
        <section className="py-16 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center mb-12" style={{ color: cores.principal }}>
              Depoimentos de Clientes
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <p className="mb-4 italic">
                      "Trabalhar com esta empresa foi uma experiência excepcional. 
                      Profissionalismo e qualidade em todos os aspectos do projeto."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full" style={{ backgroundColor: cores.principal }}></div>
                      <div>
                        <p className="font-semibold">Cliente {i}</p>
                        <p className="text-sm opacity-70">Empresa ABC</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulário */}
      {secoes.formulario && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: cores.principal }}>
                  Vamos Conversar?
                </h3>
                <p className="text-lg mb-6">
                  Entre em contato conosco e descubra como podemos ajudar sua empresa 
                  a alcançar seus objetivos.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" style={{ color: cores.principal }} />
                    <span>{siteData.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" style={{ color: cores.principal }} />
                    <span>contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                </div>
              </div>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Nome" />
                      <Input placeholder="Empresa" />
                    </div>
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Telefone" />
                    <textarea 
                      className="w-full p-3 border rounded-md min-h-[120px] resize-y"
                      placeholder="Como podemos ajudar?"
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
          </div>
        </section>
      )}

      {/* Contato */}
      {secoes.contato && (
        <section id="contato" className="py-16 px-6" style={{ backgroundColor: cores.principal }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h3 className="text-3xl font-bold mb-8">
              Informações de Contato
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Telefone</h4>
                <p>{siteData.whatsapp}</p>
              </div>
              <div>
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p>contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Escritório</h4>
                <p>Rua Example, 123<br />Cidade, Estado</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
