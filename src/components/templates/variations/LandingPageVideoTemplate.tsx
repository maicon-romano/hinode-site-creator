import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Star, Play, CheckCircle } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';
import { convertYouTubeToEmbed } from '@/lib/imageUtils';
import { Image } from '@/components/ui/image';

interface SiteData {
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
    degradeHero?: {
      inicio: string;
      fim: string;
    };
  };
  hero?: {
    titulo: string;
    subtitulo: string;
    descricao: string;
    videoUrl?: string;
    botaoTexto?: string;
    botaoLink?: string;
  };
  servicos?: {
    titulo: string;
    cards: Array<{
      titulo: string;
      descricao: string;
      icone: string;
    }>;
  };
  depoimentos?: {
    titulo: string;
    cards: Array<{
      nome: string;
      depoimento: string;
      avaliacao: number;
    }>;
  };
  sobre?: {
    titulo: string;
    descricao: string;
  };
  contato?: {
    titulo: string;
    whatsapp: string;
    email?: string;
  };
  whatsapp?: string;
  activeSections: string[];
}

interface LandingPageVideoTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const LandingPageVideoTemplate: React.FC<LandingPageVideoTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const { cores, activeSections = [] } = siteData;
  
  const styles = {
    '--color-primary': cores.principal,
    '--color-background': cores.fundo,
    '--color-accent': cores.destaque,
    '--color-text': cores.texto,
    '--gradient-start': cores.degradeHero?.inicio || cores.principal,
    '--gradient-end': cores.degradeHero?.fim || cores.destaque,
  } as React.CSSProperties;

  const handleWhatsAppClick = () => {
    if (!isPreview) {
      const whatsapp = siteData.contato?.whatsapp || siteData.whatsapp;
      if (whatsapp) {
        window.open(`https://wa.me/${whatsapp}`, '_blank');
      }
    }
  };

  const embedUrl = siteData.hero?.videoUrl ? convertYouTubeToEmbed(siteData.hero.videoUrl) : '';

  return (
    <div className="min-h-screen" style={{ ...styles, backgroundColor: cores.fundo, color: cores.texto }}>
      <WhatsAppButton 
        whatsapp={siteData.contato?.whatsapp || siteData.whatsapp || ''} 
        isPreview={isPreview} 
        color={cores.destaque} 
      />
      
      {/* Hero Section */}
      {activeSections.includes('hero') && (
        <section 
          className="py-20 px-6 relative overflow-hidden"
          style={{ 
            background: cores.degradeHero 
              ? `linear-gradient(135deg, ${cores.degradeHero.inicio}, ${cores.degradeHero.fim})`
              : cores.fundo
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              {siteData.logoPath && (
                <Image 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-16 w-auto mx-auto mb-8 animate-scale-in"
                />
              )}
              
              <h1 
                className="text-4xl md:text-6xl font-bold mb-8 leading-tight" 
                style={{ color: cores.principal }}
              >
                {siteData.hero?.titulo || 'Título Principal'}
              </h1>
              
              {/* Video Section */}
              {siteData.hero?.videoUrl && embedUrl && (
                <div className="mb-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="Vídeo Demonstrativo"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <p 
                className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto" 
                style={{ color: cores.texto }}
              >
                {siteData.hero?.descricao || 'Descrição do seu negócio'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={handleWhatsAppClick}
                  style={{ backgroundColor: cores.destaque }}
                  className="text-white hover:opacity-90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {siteData.hero?.botaoTexto || 'Começar Agora'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Serviços/Benefits Section */}
      {activeSections.includes('servicos') && (
        <section 
          className="py-20 px-6" 
          style={{ backgroundColor: `${cores.principal}05` }}
        >
          <div className="container mx-auto max-w-6xl">
            <h3 
              className="text-4xl font-bold text-center mb-16" 
              style={{ color: cores.principal }}
            >
              {siteData.servicos?.titulo || 'Nossos Serviços'}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {(siteData.servicos?.cards || [
                { titulo: 'Serviço 1', descricao: 'Descrição do serviço', icone: '⭐' },
                { titulo: 'Serviço 2', descricao: 'Descrição do serviço', icone: '🎯' },
                { titulo: 'Serviço 3', descricao: 'Descrição do serviço', icone: '💡' }
              ]).map((servico, i) => (
                <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{servico.icone}</div>
                    <h4 
                      className="text-xl font-semibold mb-3" 
                      style={{ color: cores.principal }}
                    >
                      {servico.titulo}
                    </h4>
                    <p style={{ color: cores.texto }}>{servico.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Depoimentos */}
      {activeSections.includes('depoimentos') && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h3 
              className="text-3xl font-bold text-center mb-12" 
              style={{ color: cores.principal }}
            >
              {siteData.depoimentos?.titulo || 'Depoimentos'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {(siteData.depoimentos?.cards || [
                { nome: 'Cliente 1', depoimento: 'Excelente serviço!', avaliacao: 5 },
                { nome: 'Cliente 2', depoimento: 'Muito profissional!', avaliacao: 5 },
                { nome: 'Cliente 3', depoimento: 'Recomendo!', avaliacao: 5 }
              ]).map((depoimento, i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(depoimento.avaliacao || 5)].map((_, star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4" style={{ color: cores.texto }}>{depoimento.depoimento}</p>
                    <p 
                      className="font-semibold" 
                      style={{ color: cores.principal }}
                    >
                      {depoimento.nome}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sobre */}
      {activeSections.includes('sobre') && (
        <section 
          className="py-16 px-6" 
          style={{ backgroundColor: `${cores.principal}05` }}
        >
          <div className="container mx-auto max-w-4xl">
            <h3 
              className="text-3xl font-bold text-center mb-8" 
              style={{ color: cores.principal }}
            >
              {siteData.sobre?.titulo || 'Sobre Nós'}
            </h3>
            <div className="text-center">
              <p 
                className="text-lg mb-6" 
                style={{ color: cores.texto }}
              >
                {siteData.sobre?.descricao || 'Nossa empresa oferece os melhores produtos e serviços.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Formulário */}
      {activeSections.includes('formulario') && (
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
      {activeSections.includes('contato') && (
        <section 
          className="py-16 px-6" 
          style={{ backgroundColor: cores.principal }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-3xl font-bold mb-8 text-white">
              {siteData.contato?.titulo || 'Fale Conosco'}
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Telefone</h4>
                <p>{siteData.contato?.whatsapp || siteData.whatsapp}</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p>{siteData.contato?.email || `contato@${siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com`}</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-4" />
                <h4 className="font-semibold mb-2">Endereço</h4>
                <p>Atendimento Online</p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center" 
        style={{ backgroundColor: cores.principal }}
      >
        <div className="container mx-auto">
          <p className="text-white">
            &copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
