
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Star, Play, CheckCircle, Menu, X, User, Package, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';
import { convertYouTubeToEmbed } from '@/lib/imageUtils';
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
  biografia?: string;
  produtos?: Array<{
    nome: string;
    descricao: string;
    preco?: string;
    imagem?: string;
  }>;
  secoes?: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
}

interface HinodeLandingTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const HinodeLandingTemplate: React.FC<HinodeLandingTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cores, secoes } = siteData;

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (!isPreview) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const embedUrl = siteData.videoUrl ? convertYouTubeToEmbed(siteData.videoUrl) : '';

  const menuItems = [
    { label: 'Início', id: 'inicio' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Produtos', id: 'produtos' },
    { label: 'Contato', id: 'contato' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {siteData.logoPath && (
                <Image 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-10 w-auto"
                />
              )}
              <h1 className="text-xl font-bold" style={{ color: cores.principal }}>
                {siteData.nomeDoSite}
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contato
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col space-y-3 pt-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-700 hover:text-blue-600 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={handleWhatsAppClick}
                  style={{ backgroundColor: cores.destaque }}
                  className="text-white hover:opacity-90 w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contato
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              {siteData.headline}
            </h2>
            
            {/* Video Section */}
            {secoes?.video && embedUrl && (
              <div className="mb-12 animate-scale-in">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white">
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
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90 text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Começar Agora
              </Button>
              
              {secoes?.video && embedUrl && (
                <Button 
                  variant="outline" 
                  size="lg"
                  style={{ borderColor: cores.principal, color: cores.principal }}
                  className="hover:bg-gray-50 text-lg px-10 py-4 rounded-full border-2"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Assistir Novamente
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About/Bio Section */}
      {secoes?.sobre && (
        <section id="sobre" className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-8" style={{ color: cores.principal }}>
                  <User className="inline-block h-8 w-8 mr-3" />
                  Sobre Mim
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {siteData.biografia || "Sou um profissional dedicado a oferecer os melhores resultados para meus clientes. Com anos de experiência no mercado, me destaco pela qualidade e atendimento personalizado."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold" style={{ color: cores.destaque }}>5+</div>
                      <div className="text-sm text-gray-600">Anos de Experiência</div>
                    </CardContent>
                  </Card>
                  <Card className="p-4 text-center">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold" style={{ color: cores.destaque }}>100+</div>
                      <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
                  <User className="h-32 w-32 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="produtos" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4" style={{ color: cores.principal }}>
              <Package className="inline-block h-8 w-8 mr-3" />
              Nossos Produtos
            </h3>
            <p className="text-lg text-gray-700">Soluções pensadas especialmente para você</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(siteData.produtos || [
              { nome: "Produto Premium", descricao: "Nossa solução mais completa", preco: "R$ 197" },
              { nome: "Produto Básico", descricao: "Ideal para começar", preco: "R$ 97" },
              { nome: "Produto VIP", descricao: "Acompanhamento personalizado", preco: "R$ 397" }
            ]).map((produto, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-bold mb-3" style={{ color: cores.principal }}>
                    {produto.nome}
                  </h4>
                  <p className="text-gray-600 mb-4">{produto.descricao}</p>
                  {produto.preco && (
                    <p className="text-2xl font-bold mb-6" style={{ color: cores.destaque }}>
                      {produto.preco}
                    </p>
                  )}
                  <Button 
                    className="w-full text-white group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: cores.destaque }}
                    onClick={handleWhatsAppClick}
                  >
                    Saber Mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {secoes?.depoimentos && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-4xl font-bold text-center mb-16" style={{ color: cores.principal }}>
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { nome: "Ana Silva", texto: "Resultados incríveis! Superou todas as minhas expectativas.", rating: 5 },
                { nome: "João Santos", texto: "Profissional excepcional, recomendo a todos!", rating: 5 },
                { nome: "Maria Costa", texto: "Atendimento personalizado e resultados garantidos.", rating: 5 }
              ].map((depoimento, i) => (
                <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow border-0">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(depoimento.rating)].map((_, star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{depoimento.texto}"</p>
                    <p className="font-semibold" style={{ color: cores.principal }}>
                      {depoimento.nome}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contato" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold mb-8">
            <MessageCircle className="inline-block h-8 w-8 mr-3" />
            Vamos Conversar?
          </h3>
          <p className="text-xl mb-12 opacity-90">
            Estou aqui para ajudar você a alcançar seus objetivos. Entre em contato agora!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Phone className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <p className="opacity-90">{siteData.whatsapp}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Mail className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="opacity-90">contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <MapPin className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">Localização</h4>
              <p className="opacity-90">Atendimento Online</p>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Phone className="h-5 w-5 mr-2" />
            Falar no WhatsApp
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">Desenvolvido com ❤️ para transformar vidas</p>
        </div>
      </footer>
    </div>
  );
};
