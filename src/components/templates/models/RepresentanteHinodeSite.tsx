
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Star, Heart, Sparkles, Crown, Gift, Phone, Mail, MapPin } from 'lucide-react';

interface RepresentanteHinodeSiteProps {
  siteData: any;
  isPreview?: boolean;
}

export const RepresentanteHinodeSite: React.FC<RepresentanteHinodeSiteProps> = ({
  siteData,
  isPreview = false
}) => {
  const handleWhatsAppClick = () => {
    if (!isPreview && siteData.whatsapp) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      {/* Hero Section - Específico para Hinode */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-yellow-600/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full mb-6 animate-bounce">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Consultora Hinode Premium</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent">
                {siteData['hero-hinode']?.titulo || 'Transforme Sua Beleza'}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-700 mb-8">
                {siteData['hero-hinode']?.subtitulo || 'Descubra produtos de luxo que realçam sua beleza natural'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="h-6 w-6 mr-2" />
                  {siteData['hero-hinode']?.botaoTexto || 'Quero Conhecer'}
                </Button>
              </div>
            </div>

            <div className="relative">
              {siteData['hero-hinode']?.video ? (
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                  <iframe
                    src={siteData['hero-hinode'].video}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50">
                  <div className="text-center text-gray-600">
                    <Heart className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                    <span className="text-xl">Vídeo da Consultora</span>
                  </div>
                </div>
              )}
              
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Gift className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Negócio Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {siteData['sobre-negocio']?.imagem ? (
                <img src={siteData['sobre-negocio'].imagem} alt="Hinode" className="w-full rounded-2xl shadow-xl" />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <Star className="h-16 w-16 mx-auto mb-4 text-pink-500" />
                    <span className="text-gray-600 text-lg">Logo Hinode</span>
                  </div>
                </div>
              )}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl blur-xl"></div>
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                {siteData['sobre-negocio']?.titulo || 'Sobre a Hinode'}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 mb-8">
                {siteData['sobre-negocio']?.texto || 'A Hinode é líder em cosméticos e perfumaria no Brasil, oferecendo produtos de alta qualidade e oportunidade de negócio única.'}
              </p>
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full shadow-lg"
              >
                {siteData['sobre-negocio']?.botaoTexto || 'Conhecer Mais'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Biografia Representante */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                {siteData['biografia-representante']?.nome || 'Sua Consultora'}
              </h2>
              <h3 className="text-2xl text-purple-600 mb-6 font-semibold">
                {siteData['biografia-representante']?.titulo || 'Consultora de Beleza'}
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                {siteData['biografia-representante']?.texto || 'Especialista em beleza e cuidados pessoais, ajudando pessoas a descobrirem sua melhor versão.'}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full">
                  <span className="font-semibold">{siteData['biografia-representante']?.experiencia || '5+'} anos de experiência</span>
                </div>
              </div>
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full shadow-lg"
              >
                {siteData['biografia-representante']?.botaoTexto || 'Falar Comigo'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="relative lg:order-last">
              {siteData['biografia-representante']?.foto ? (
                <img src={siteData['biografia-representante'].foto} alt="Consultora" className="w-full rounded-2xl shadow-xl" />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                    <span className="text-gray-600 text-lg">Foto da Consultora</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              {siteData['produtos-hinode']?.titulo || 'Nossos Produtos'}
            </h2>
            <p className="text-xl text-gray-600">
              {siteData['produtos-hinode']?.subtitulo || 'Linha completa de beleza e cuidados'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData['produtos-hinode']?.produtos ? 
              siteData['produtos-hinode'].produtos.split('\n').filter((item: string) => item.trim()).map((produto: string, index: number) => {
                const [titulo, descricao] = produto.split(' - ');
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-pink-50">
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">{titulo}</h3>
                      <p className="text-gray-600 mb-6">{descricao || 'Produto premium de alta qualidade'}</p>
                      <Button 
                        onClick={handleWhatsAppClick}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                      >
                        Ver Produto
                      </Button>
                    </CardContent>
                  </Card>
                );
              }) : 
              [1, 2, 3].map((i) => (
                <Card key={i} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-pink-50">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Produto {i}</h3>
                    <p className="text-gray-600 mb-6">Descrição do produto premium</p>
                    <Button 
                      onClick={handleWhatsAppClick}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                    >
                      Ver Produto
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              {siteData['contato-hinode']?.titulo || 'Entre em Contato'}
            </h2>
            <p className="text-xl text-gray-600">
              {siteData['contato-hinode']?.subtitulo || 'Tire suas dúvidas ou faça seu pedido'}
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Input placeholder="Seu nome" className="rounded-full border-2 border-pink-200 focus:border-purple-400" />
                <Input placeholder="Seu telefone" className="rounded-full border-2 border-pink-200 focus:border-purple-400" />
                <Input placeholder="Seu email" type="email" className="rounded-full border-2 border-pink-200 focus:border-purple-400" />
                <Input placeholder="Assunto" className="rounded-full border-2 border-pink-200 focus:border-purple-400" />
              </div>
              <textarea 
                className="w-full p-4 border-2 border-pink-200 rounded-2xl min-h-[120px] resize-y focus:border-purple-400 focus:outline-none"
                placeholder="Sua mensagem..."
              />
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl px-12 py-6 rounded-full shadow-xl"
                >
                  Enviar Mensagem
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <p>{siteData.whatsapp}</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p>contato@hinode.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-4" />
              <h4 className="font-semibold mb-2">Atendimento</h4>
              <p>Segunda a Sexta, 8h às 18h</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p>{siteData['rodape-hinode']?.texto || '© 2024 Consultora Hinode - Transformando vidas através da beleza'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
