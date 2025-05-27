
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Crown, Gift, Users, Star, Heart, Phone, Instagram, MapPin, Award, ShoppingBag, DollarSign, Mail, User, MessageSquare, ArrowUp } from 'lucide-react';

interface SiteData {
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  'hero-hinode'?: {
    titulo: string;
    subtitulo?: string;
    video?: string;
    botaoTexto?: string;
    imagem?: string;
  };
  'sobre-negocio'?: {
    titulo: string;
    texto: string;
    botaoTexto?: string;
    imagem?: string;
  };
  'biografia-representante'?: {
    nome: string;
    titulo?: string;
    texto: string;
    experiencia?: string;
    botaoTexto?: string;
    foto?: string;
  };
  'produtos-hinode'?: {
    titulo: string;
    subtitulo?: string;
    produtos: string;
  };
  'contato-hinode'?: {
    titulo: string;
    subtitulo?: string;
    whatsapp: string;
    mostrarFormulario?: boolean;
  };
  'rodape-hinode'?: {
    texto: string;
    ano?: string;
  };
  whatsapp?: string;
}

interface HinodePremiumTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const HinodePremiumTemplate: React.FC<HinodePremiumTemplateProps> = ({
  siteData,
  isPreview = false
}) => {
  const handleWhatsAppClick = () => {
    if (!isPreview) {
      const whatsapp = siteData['contato-hinode']?.whatsapp || siteData.whatsapp;
      if (whatsapp) {
        window.open(`https://wa.me/${whatsapp}`, '_blank');
      }
    }
  };

  const scrollToTop = () => {
    if (!isPreview) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      {/* Hero Section */}
      {siteData['hero-hinode'] && (
        <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-xl animate-ping"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                {siteData['hero-hinode'].titulo}
              </h1>
              
              {siteData['hero-hinode'].subtitulo && (
                <p className="text-2xl lg:text-3xl mb-8 text-gray-700 animate-fade-in animation-delay-500">
                  {siteData['hero-hinode'].subtitulo}
                </p>
              )}

              {/* Video Section */}
              {siteData['hero-hinode'].video && (
                <div className="mb-8 animate-fade-in animation-delay-1000">
                  <div className="max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <iframe
                      src={siteData['hero-hinode'].video}
                      className="w-full h-full"
                      allowFullScreen
                      title="Vídeo Hinode"
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-1500"
              >
                <Crown className="h-6 w-6 mr-2" />
                {siteData['hero-hinode'].botaoTexto || 'Quero ser Representante'}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Sobre o Negócio */}
      {siteData['sobre-negocio'] && (
        <section className="py-20 px-6 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                {siteData['sobre-negocio'].imagem ? (
                  <div className="relative">
                    <img 
                      src={siteData['sobre-negocio'].imagem} 
                      alt="Hinode Negócio" 
                      className="w-full rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-orange-900/20 rounded-3xl"></div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-2xl flex items-center justify-center">
                    <Sparkles className="h-24 w-24 text-yellow-600" />
                  </div>
                )}
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {siteData['sobre-negocio'].titulo}
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {siteData['sobre-negocio'].texto}
                </p>
                
                {siteData['sobre-negocio'].botaoTexto && (
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-3 rounded-full"
                  >
                    {siteData['sobre-negocio'].botaoTexto}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Biografia do Representante */}
      {siteData['biografia-representante'] && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <User className="h-4 w-4" />
                  Sua Consultora
                </div>
                
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {siteData['biografia-representante'].nome}
                </h2>
                
                {siteData['biografia-representante'].titulo && (
                  <h3 className="text-xl text-gray-600 mb-6">
                    {siteData['biografia-representante'].titulo}
                    {siteData['biografia-representante'].experiencia && (
                      <span className="block text-sm mt-1">
                        {siteData['biografia-representante'].experiencia} de experiência
                      </span>
                    )}
                  </h3>
                )}
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {siteData['biografia-representante'].texto}
                </p>
                
                {siteData['biografia-representante'].botaoTexto && (
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {siteData['biografia-representante'].botaoTexto}
                  </Button>
                )}
              </div>

              <div className="order-first lg:order-last">
                {siteData['biografia-representante'].foto ? (
                  <div className="relative">
                    <img 
                      src={siteData['biografia-representante'].foto} 
                      alt={siteData['biografia-representante'].nome} 
                      className="w-full aspect-square rounded-3xl shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 rounded-3xl shadow-2xl flex items-center justify-center">
                    <User className="h-24 w-24 text-purple-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Produtos */}
      {siteData['produtos-hinode'] && (
        <section className="py-20 px-6 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {siteData['produtos-hinode'].titulo}
              </h2>
              {siteData['produtos-hinode'].subtitulo && (
                <p className="text-xl text-gray-600">
                  {siteData['produtos-hinode'].subtitulo}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteData['produtos-hinode'].produtos.split('\n').filter(item => item.trim()).map((produto, index) => {
                const [titulo, descricao] = produto.split(' - ');
                const colors = [
                  'from-yellow-400 to-orange-500',
                  'from-pink-400 to-purple-500', 
                  'from-purple-400 to-indigo-500'
                ];
                const icons = [Sparkles, Heart, Star];
                const Icon = icons[index % icons.length];
                
                return (
                  <Card key={index} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className={`h-48 bg-gradient-to-br ${colors[index % colors.length]} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-xl mb-3 text-gray-800">
                        {titulo}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {descricao || 'Produtos de alta qualidade'}
                      </p>
                      <Button 
                        onClick={handleWhatsAppClick}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Ver Produto
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contato */}
      {siteData['contato-hinode'] && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {siteData['contato-hinode'].titulo}
              </h2>
              {siteData['contato-hinode'].subtitulo && (
                <p className="text-lg text-gray-700">
                  {siteData['contato-hinode'].subtitulo}
                </p>
              )}
            </div>

            {siteData['contato-hinode'].mostrarFormulario && (
              <Card className="shadow-xl mb-8">
                <CardContent className="p-8">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome</label>
                      <Input placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefone</label>
                      <Input placeholder="(11) 99999-9999" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Assunto</label>
                      <Textarea placeholder="Como posso ajudar você?" />
                    </div>
                    <div className="md:col-span-2">
                      <Button 
                        type="button"
                        onClick={handleWhatsAppClick}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Enviar via WhatsApp
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-6 w-6 mr-2" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {siteData['rodape-hinode'] && (
        <footer className="py-12 px-6 bg-gradient-to-r from-yellow-600 to-orange-700 text-white">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6" />
              <h4 className="text-xl font-bold">{siteData.nomeDoSite}</h4>
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mb-4 opacity-90">
              © {siteData['rodape-hinode'].ano || '2024'} {siteData['rodape-hinode'].texto}
            </p>
            <p className="text-sm opacity-75">Transformando vidas através da beleza</p>
          </div>
        </footer>
      )}

      {/* WhatsApp Floating Button */}
      {!isPreview && (siteData['contato-hinode']?.whatsapp || siteData.whatsapp) && (
        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white animate-pulse"
          title="Falar no WhatsApp"
        >
          <Phone className="h-8 w-8" />
        </button>
      )}

      {/* Back to Top Button */}
      {!isPreview && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
          title="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
