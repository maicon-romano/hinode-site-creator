
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Star, Heart, Sparkles, Crown, Gift, Phone, Mail, MapPin, PlayCircle, Users, Award } from 'lucide-react';

interface RepresentanteHinodeSiteProps {
  siteData: any;
  isPreview?: boolean;
}

export const RepresentanteHinodeSite: React.FC<RepresentanteHinodeSiteProps> = ({
  siteData,
  isPreview = false
}) => {
  console.log('RepresentanteHinodeSite - Dados recebidos:', siteData);
  console.log('RepresentanteHinodeSite - Hero Hinode:', siteData['hero-hinode']);
  console.log('RepresentanteHinodeSite - Sobre Negócio:', siteData['sobre-negocio']);
  console.log('RepresentanteHinodeSite - Biografia:', siteData['biografia-representante']);

  const handleWhatsAppClick = () => {
    if (!isPreview && siteData.whatsapp) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => setShowBackToTop(window.pageYOffset > 300);
    if (!isPreview) {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, [isPreview]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* WhatsApp Float */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse flex items-center justify-center"
      >
        <Phone className="h-8 w-8 text-white" />
      </button>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* Hero Central com Vídeo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-amber-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Elementos dourados flutuantes */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-32 w-4 h-4 bg-rose-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-black px-8 py-3 rounded-full mb-8 shadow-2xl">
              <Crown className="h-6 w-6" />
              <span className="font-bold text-lg">✨ Consultora Hinode Premium ✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 text-white drop-shadow-2xl">
              {siteData['hero-hinode']?.titulo || 'Transforme Sua Beleza'}
            </h1>
            
            <p className="text-2xl md:text-3xl lg:text-4xl mb-12 text-rose-100 font-semibold drop-shadow-lg max-w-4xl mx-auto">
              {siteData['hero-hinode']?.subtitulo || 'Descubra produtos de luxo que realçam sua beleza natural e transformam sua autoestima'}
            </p>

            {/* Vídeo em Destaque */}
            {siteData['hero-hinode']?.video && (
              <div className="max-w-4xl mx-auto mb-12 animate-fade-in animation-delay-500">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                  <iframe
                    src={siteData['hero-hinode'].video}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title="Vídeo Hinode"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-black text-2xl md:text-3xl px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow font-black"
            >
              <Sparkles className="h-8 w-8 mr-4" />
              {siteData['hero-hinode']?.botaoTexto || 'QUERO CONHECER OS PRODUTOS'}
            </Button>
            
            <p className="mt-6 text-xl text-rose-100 font-semibold">👆 Clique e descubra a linha completa Hinode!</p>
          </div>
        </div>
      </section>

      {/* Sobre Hinode - Layout Zig-Zag */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fade-in">
              {siteData['sobre-negocio']?.imagem ? (
                <img src={siteData['sobre-negocio'].imagem} alt="Hinode" className="w-full rounded-3xl shadow-2xl" />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-rose-100 to-amber-100 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Crown className="h-20 w-20 mx-auto mb-4 text-rose-500" />
                    <span className="text-gray-600 text-xl font-semibold">Logo Hinode</span>
                  </div>
                </div>
              )}
              
              {/* Elementos decorativos */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Gift className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-full blur-xl"></div>
            </div>

            <div className="animate-fade-in animation-delay-300">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 px-6 py-3 rounded-full mb-8">
                <Award className="h-5 w-5" />
                <span className="font-semibold">Empresa Líder no Mercado</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                {siteData['sobre-negocio']?.titulo || 'Sobre a Hinode'}
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {siteData['sobre-negocio']?.texto || 'A Hinode é líder em cosméticos e perfumaria no Brasil, oferecendo produtos de alta qualidade e uma oportunidade de negócio única. Com mais de 25 anos no mercado, transformamos vidas através da beleza e do empreendedorismo.'}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
                  <div className="text-3xl font-bold text-rose-600 mb-2">25+</div>
                  <div className="text-gray-600 font-medium">Anos no Mercado</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                  <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                  <div className="text-gray-600 font-medium">Produtos Premium</div>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {siteData['sobre-negocio']?.botaoTexto || 'Conhecer Oportunidade'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Representante - Layout Invertido */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in animation-delay-300">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 px-6 py-3 rounded-full mb-8">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">Sua Consultora de Beleza</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                {siteData['biografia-representante']?.nome || 'Maria Silva'}
              </h2>
              
              <h3 className="text-2xl text-rose-600 mb-6 font-semibold">
                {siteData['biografia-representante']?.titulo || 'Consultora de Beleza Especializada'}
              </h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {siteData['biografia-representante']?.texto || 'Há mais de 5 anos ajudo mulheres a descobrirem sua beleza natural através dos produtos Hinode. Especialista em cuidados com a pele e maquiagem, estou aqui para te guiar nessa jornada de transformação.'}
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full">
                  <span className="font-semibold">{siteData['biografia-representante']?.experiencia || '5+'} anos transformando vidas</span>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full">
                  <span className="font-semibold">500+ clientes satisfeitas</span>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                {siteData['biografia-representante']?.botaoTexto || 'Falar Comigo Agora'}
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative animate-fade-in">
              {siteData['biografia-representante']?.foto ? (
                <div className="relative">
                  <img 
                    src={siteData['biografia-representante'].foto} 
                    alt="Consultora" 
                    className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-8 border-white/50"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-rose-500/20 to-transparent"></div>
                </div>
              ) : (
                <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl shadow-2xl flex items-center justify-center border-8 border-white/50">
                  <div className="text-center">
                    <Heart className="h-20 w-20 mx-auto mb-4 text-rose-500" />
                    <span className="text-gray-600 text-xl font-semibold">Foto da Consultora</span>
                  </div>
                </div>
              )}
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Star className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos com Cards Elegantes */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              {siteData['produtos-hinode']?.titulo || 'Linha Completa Hinode'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {siteData['produtos-hinode']?.subtitulo || 'Produtos premium desenvolvidos com a mais alta tecnologia para realçar sua beleza natural'}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-amber-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData['produtos-hinode']?.produtos ? 
              siteData['produtos-hinode'].produtos.split('\n').filter((item: string) => item.trim()).map((produto: string, index: number) => {
                const [titulo, descricao] = produto.split(' - ');
                return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 border-0 shadow-lg bg-gradient-to-br from-white to-rose-50 overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-16 w-16 text-rose-500 group-hover:scale-125 transition-transform duration-300" />
                      </div>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                    </div>
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-rose-600 transition-colors">
                        {titulo}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {descricao || 'Produto premium de alta qualidade para cuidados especiais'}
                      </p>
                      <Button 
                        onClick={handleWhatsAppClick}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full shadow-lg group-hover:scale-105 transition-all duration-300"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Ver Produto
                      </Button>
                    </CardContent>
                  </Card>
                );
              }) : 
              ['Perfumes Premium', 'Maquiagem Professional', 'Cuidados com a Pele'].map((produto, i) => (
                <Card key={i} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 border-0 shadow-lg bg-gradient-to-br from-white to-rose-50 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-16 w-16 text-rose-500 group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                  </div>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-rose-600 transition-colors">
                      {produto}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Produtos premium de alta qualidade para realçar sua beleza natural
                    </p>
                    <Button 
                      onClick={handleWhatsAppClick}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full shadow-lg group-hover:scale-105 transition-all duration-300"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Ver Produto
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Formulário com Textura */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-600 via-pink-600 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {siteData['contato-hinode']?.titulo || 'Vamos Conversar?'}
            </h2>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              {siteData['contato-hinode']?.subtitulo || 'Entre em contato e descubra como a Hinode pode transformar sua vida'}
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Input 
                  placeholder="Seu nome" 
                  className="rounded-2xl border-2 border-rose-200 focus:border-rose-400 h-14 text-lg"
                />
                <Input 
                  placeholder="Seu telefone" 
                  className="rounded-2xl border-2 border-rose-200 focus:border-rose-400 h-14 text-lg"
                />
                <Input 
                  placeholder="Seu email" 
                  type="email" 
                  className="rounded-2xl border-2 border-rose-200 focus:border-rose-400 h-14 text-lg"
                />
                <Input 
                  placeholder="Sua cidade" 
                  className="rounded-2xl border-2 border-rose-200 focus:border-rose-400 h-14 text-lg"
                />
              </div>
              <textarea 
                className="w-full p-4 border-2 border-rose-200 rounded-2xl min-h-[140px] resize-y focus:border-rose-400 focus:outline-none text-lg"
                placeholder="Como posso te ajudar? Conte-me sobre seus objetivos de beleza..."
              />
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-black text-xl px-16 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  Quero Ser Consultada Agora!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Hinode */}
      <footer className="py-16 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-500/10"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2 text-lg">WhatsApp</h4>
              <p className="text-amber-200">{siteData.whatsapp}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2 text-lg">Email</h4>
              <p className="text-rose-200">consultora@hinode.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2 text-lg">Atendimento</h4>
              <p className="text-purple-200">Segunda a Domingo</p>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/20">
            <div className="mb-4">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-amber-400" />
                <span className="text-xl font-bold">Consultora Hinode Premium</span>
                <Crown className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-gray-300">
              {siteData['rodape-hinode']?.texto || '© 2024 Consultora Hinode - Transformando vidas através da beleza e do empreendedorismo'}
            </p>
            <div className="mt-4 flex justify-center items-center gap-2">
              <Heart className="h-4 w-4 text-rose-400" />
              <span className="text-sm text-gray-400">Feito com amor para mulheres que querem brilhar</span>
              <Heart className="h-4 w-4 text-rose-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
