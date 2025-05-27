
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Crown, Gift, Users, Star, Heart, Phone, Instagram, MapPin, Award, ShoppingBag, DollarSign } from 'lucide-react';

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
    nome: string;
    titulo?: string;
    experiencia?: string;
    foto?: string;
  };
  'sobre-hinode'?: {
    titulo: string;
    descricao: string;
    logoHinode?: string;
  };
  'produtos-destaque'?: {
    titulo: string;
    categoria1?: string;
    categoria2?: string;
    categoria3?: string;
  };
  'seja-representante'?: {
    titulo: string;
    beneficios: string;
    comissao?: string;
  };
  depoimentos?: {
    titulo: string;
    ativo: boolean;
  };
  contato?: {
    titulo: string;
    whatsapp: string;
    instagram?: string;
    localizacao?: string;
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
      const whatsapp = siteData.contato?.whatsapp || siteData.whatsapp;
      if (whatsapp) {
        window.open(`https://wa.me/${whatsapp}`, '_blank');
      }
    }
  };

  const handleInstagramClick = () => {
    if (!isPreview && siteData.contato?.instagram) {
      window.open(siteData.contato.instagram, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="py-6 px-6 bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {siteData.logoPath && (
              <img src={siteData.logoPath} alt="Logo" className="h-12 w-auto rounded-full border-2 border-yellow-300" />
            )}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {siteData.hero?.nome || siteData.nomeDoSite}
              </h1>
              <p className="text-sm text-gray-600">Consultora Hinode</p>
            </div>
          </div>
          <div className="flex gap-3">
            {siteData.contato?.instagram && (
              <Button 
                onClick={handleInstagramClick}
                variant="outline"
                size="sm"
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            )}
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-xl animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Crown className="h-4 w-4" />
                Consultora de Beleza Premium
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent animate-fade-in animation-delay-500">
                {siteData.hero?.nome || 'Ana Beatriz'}
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-medium mb-6 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.principal }}>
                {siteData.hero?.titulo || 'Sua Consultora de Beleza Hinode'}
              </h2>
              
              <p className="text-lg lg:text-xl mb-8 text-gray-700 animate-fade-in animation-delay-1500">
                {siteData.hero?.experiencia ? `${siteData.hero.experiencia} de experiência` : '5 anos de experiência'} transformando vidas através da beleza e fragrâncias únicas da Hinode
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-2000">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Fazer Pedido
                </Button>
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="lg"
                  className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 text-xl px-8 py-6 rounded-full"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Seja Representante
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in animation-delay-1000">
              {siteData.hero?.foto ? (
                <div className="relative">
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-yellow-300 to-orange-300">
                    <img 
                      src={siteData.hero.foto} 
                      alt="Consultora Hinode" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-orange-900/20 rounded-3xl"></div>
                </div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-yellow-300">
                  <Sparkles className="h-24 w-24 text-yellow-600" />
                </div>
              )}
              
              {/* Floating Hinode elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Hinode Section */}
      {siteData['sobre-hinode'] && (
        <section className="py-20 px-6 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {siteData['sobre-hinode'].titulo}
                </h2>
                
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {siteData['sobre-hinode'].descricao}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">20+</div>
                    <div className="text-xs text-gray-600">Anos de Tradição</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">100%</div>
                    <div className="text-xs text-gray-600">Nacional</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-pink-600">1M+</div>
                    <div className="text-xs text-gray-600">Clientes</div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                {siteData['sobre-hinode'].logoHinode ? (
                  <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <img 
                      src={siteData['sobre-hinode'].logoHinode} 
                      alt="Logo Hinode" 
                      className="w-full max-w-sm mx-auto"
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-12 rounded-3xl shadow-xl flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 text-yellow-600" />
                      <h3 className="text-2xl font-bold text-yellow-700">HINODE</h3>
                      <p className="text-yellow-600">Beleza que Transforma</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {siteData['produtos-destaque'] && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {siteData['produtos-destaque'].titulo}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { categoria: siteData['produtos-destaque'].categoria1 || 'Perfumes Importados', icon: Sparkles, color: 'from-yellow-400 to-orange-500' },
                { categoria: siteData['produtos-destaque'].categoria2 || 'Maquiagem Premium', icon: Heart, color: 'from-pink-400 to-purple-500' },
                { categoria: siteData['produtos-destaque'].categoria3 || 'Cuidados com a Pele', icon: Star, color: 'from-purple-400 to-indigo-500' }
              ].map((produto, index) => (
                <Card key={index} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`h-48 bg-gradient-to-br ${produto.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <produto.icon className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-3" style={{ color: siteData.cores.principal }}>
                      {produto.categoria}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Produtos premium com qualidade internacional
                    </p>
                    <Button 
                      onClick={handleWhatsAppClick}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                    >
                      Ver Produtos
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become Representative Section */}
      {siteData['seja-representante'] && (
        <section className="py-20 px-6 bg-gradient-to-r from-yellow-600 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {siteData['seja-representante'].titulo}
              </h2>
              {siteData['seja-representante'].comissao && (
                <p className="text-2xl font-bold bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 inline-block">
                  {siteData['seja-representante'].comissao}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {siteData['seja-representante'].beneficios.split('\n').filter(item => item.trim()).map((beneficio, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-6">
                    <Award className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                    <h3 className="font-bold text-lg mb-2 text-white">
                      {beneficio}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-white text-yellow-600 hover:bg-yellow-50 text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="h-6 w-6 mr-2" />
                Quero Ser Representante
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {siteData.depoimentos?.ativo && (
        <section className="py-20 px-6 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {siteData.depoimentos.titulo}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item, index) => (
                <Card key={item} className="shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "Os perfumes Hinode são simplesmente maravilhosos! Qualidade excepcional e atendimento perfeito."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold mr-3">
                        C{item}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: siteData.cores.principal }}>Cliente {item}</p>
                        <p className="text-sm text-gray-500">Cliente Satisfeita</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {siteData.contato?.titulo || 'Faça seu Pedido ou Tire suas Dúvidas'}
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Estou aqui para ajudar você a encontrar os produtos perfeitos para realçar sua beleza natural!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mx-auto mb-4 text-green-600" />
                <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>WhatsApp</h4>
                <p className="text-gray-600 text-sm">Atendimento personalizado</p>
              </CardContent>
            </Card>
            
            {siteData.contato?.localizacao && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Localização</h4>
                  <p className="text-gray-600 text-sm">{siteData.contato.localizacao}</p>
                </CardContent>
              </Card>
            )}
            
            {siteData.contato?.instagram && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer" onClick={handleInstagramClick}>
                <CardContent className="p-6">
                  <Instagram className="h-8 w-8 mx-auto mb-4 text-pink-600" />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Instagram</h4>
                  <p className="text-gray-600 text-sm">Novidades e dicas</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-6 w-6 mr-2" />
              Fazer Pedido
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <DollarSign className="h-6 w-6 mr-2" />
              Quero Ser Representante
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-yellow-600 to-orange-700 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <h4 className="text-xl font-bold">{siteData.hero?.nome || siteData.nomeDoSite}</h4>
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mb-4 opacity-90">© 2024 Consultora Hinode. Todos os direitos reservados.</p>
          <p className="text-sm opacity-75">Transformando vidas através da beleza</p>
        </div>
      </footer>
    </div>
  );
};
