
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Building, Target, Users, Award } from 'lucide-react';
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

interface InstitucionalBannerTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalBannerTemplate: React.FC<InstitucionalBannerTemplateProps> = ({ 
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
    <div className="min-h-screen" style={{ backgroundColor: cores.fundo, color: cores.texto }}>
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Header with Navigation */}
      <nav className="py-4 px-6 bg-white shadow-lg sticky top-0 z-40">
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
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="hover:opacity-70 font-medium">Início</a>
            <a href="#sobre" className="hover:opacity-70 font-medium">Sobre</a>
            <a href="#servicos" className="hover:opacity-70 font-medium">Serviços</a>
            <a href="#contato" className="hover:opacity-70 font-medium">Contato</a>
            <Button 
              onClick={handleWhatsAppClick}
              style={{ backgroundColor: cores.destaque }}
              className="text-white hover:opacity-90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contato
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')`
          }}
        />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {siteData.headline}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90 text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Fale Conosco
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-4 rounded-lg backdrop-blur-sm"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Building, 
                title: "Solidez", 
                desc: "Empresa consolidada com anos de experiência no mercado",
                gradient: "from-blue-500 to-blue-600"
              },
              { 
                icon: Target, 
                title: "Foco", 
                desc: "Sempre direcionados aos objetivos e necessidades dos clientes",
                gradient: "from-green-500 to-green-600"
              },
              { 
                icon: Award, 
                title: "Excelência", 
                desc: "Comprometidos com a qualidade e melhoria contínua",
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((value, i) => (
              <Card key={i} className="group text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: cores.principal }}>
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {secoes.sobre && (
        <section id="sobre" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
              Sobre Nós
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Somos uma empresa líder no mercado, dedicada a fornecer soluções inovadoras e de alta qualidade para nossos clientes.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Com anos de experiência, nossa equipe é formada por profissionais altamente qualificados e comprometidos em superar as expectativas.
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  style={{ backgroundColor: cores.destaque }}
                  className="text-white hover:opacity-90"
                >
                  Saiba Mais
                </Button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?w=600&h=400&fit=crop" 
                  alt="Equipe" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Depoimentos */}
      {secoes.depoimentos && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
              Depoimentos
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">
                      "Excelente serviço! Superou minhas expectativas. Recomendo a todos."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                      <div>
                        <p className="font-semibold">Cliente {i}</p>
                        <p className="text-gray-500">Empresa XYZ</p>
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
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
              Entre em Contato
            </h3>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input placeholder="Nome" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Telefone" />
                  <Input placeholder="Empresa" />
                </div>
                <textarea 
                  className="w-full mt-6 p-3 border rounded-md min-h-[120px] resize-y"
                  placeholder="Mensagem"
                />
                <Button 
                  className="w-full mt-6 text-white"
                  style={{ backgroundColor: cores.destaque }}
                  onClick={handleWhatsAppClick}
                >
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: cores.principal }}>
        <div className="container mx-auto text-white">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">{siteData.nomeDoSite}</h5>
              <p className="text-white/80">
                Comprometidos com a excelência e satisfação dos nossos clientes.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Empresa</h6>
              <ul className="space-y-2 text-white/80">
                <li><a href="#sobre" className="hover:text-white">Sobre</a></li>
                <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
                <li><a href="#contato" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contato</h6>
              <div className="space-y-2 text-white/80">
                <p><Phone className="h-4 w-4 inline mr-2" />{siteData.whatsapp}</p>
                <p><Mail className="h-4 w-4 inline mr-2" />contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
