
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Zap, Target, Rocket, Star, CheckCircle, Clock, Shield, ArrowRight, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';

interface LandingVendasSiteProps {
  siteData: any;
  isPreview?: boolean;
}

export const LandingVendasSite: React.FC<LandingVendasSiteProps> = ({
  siteData,
  isPreview = false
}) => {
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
    <div className="min-h-screen bg-white">
      {/* Fixed CTA Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 p-4 md:hidden shadow-2xl">
        <Button 
          onClick={handleWhatsAppClick}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg py-4 rounded-full shadow-xl animate-pulse"
        >
          🔥 GARANTA JÁ SUA VAGA!
        </Button>
      </div>

      {/* WhatsApp Float */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-bounce flex items-center justify-center"
      >
        <Phone className="h-8 w-8 text-white" />
      </button>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* Hero Fullscreen com Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        {/* Elementos flutuantes animados */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-full mb-8 animate-bounce font-black text-lg shadow-2xl">
              <Clock className="h-6 w-6" />
              <span>🔥 ÚLTIMA CHANCE - OFERTA EXPIRA EM BREVE!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 text-white drop-shadow-2xl">
              {siteData.hero?.titulo || 'TRANSFORME SUA VIDA EM 30 DIAS'}
            </h1>
            
            <p className="text-2xl md:text-3xl lg:text-4xl mb-12 text-yellow-200 font-bold drop-shadow-lg max-w-4xl mx-auto">
              {siteData.hero?.subtitulo || 'O método que já transformou mais de 10.000 vidas está disponível por tempo limitado'}
            </p>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-12 py-6 rounded-3xl mb-12 inline-block shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl md:text-3xl font-black">✅ GARANTIA TOTAL DE 30 DIAS</span>
            </div>
            
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black text-2xl md:text-3xl px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse font-black mb-6"
            >
              <Rocket className="h-10 w-10 mr-4" />
              QUERO TRANSFORMAR MINHA VIDA AGORA!
            </Button>
            
            <p className="text-xl text-yellow-100 font-semibold">👆 Clique aqui e comece sua transformação hoje mesmo!</p>
          </div>
        </div>
      </section>

      {/* Urgência com Timer */}
      <section className="py-12 px-6 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8">⏰ ATENÇÃO: RESTAM APENAS 47 VAGAS!</h2>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { value: '00', label: 'DIAS' },
              { value: '12', label: 'HORAS' },
              { value: '34', label: 'MIN' },
              { value: '56', label: 'SEG' }
            ].map((time, index) => (
              <div key={index} className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-black text-yellow-400">{time.value}</div>
                <div className="text-sm font-bold">{time.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios com Cards Vibrantes */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              🚀 O QUE VOCÊ VAI CONQUISTAR:
            </h2>
            <p className="text-2xl text-red-600 font-bold">Resultados GARANTIDOS ou seu dinheiro de volta!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: TrendingUp, 
                title: "RESULTADOS EM 7 DIAS", 
                desc: "Veja mudanças reais já na primeira semana",
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: Zap, 
                title: "MÉTODO COMPROVADO", 
                desc: "Usado por mais de 10.000 pessoas",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Shield, 
                title: "GARANTIA TOTAL", 
                desc: "30 dias para testar sem riscos",
                color: "from-purple-500 to-pink-500"
              }
            ].map((benefit, index) => (
              <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 bg-white overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${benefit.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-lg text-gray-700 font-semibold">{benefit.desc}</p>
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Produto em Destaque */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full mb-6 font-black">
                🎯 OFERTA ESPECIAL
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black mb-6">PACOTE COMPLETO DE TRANSFORMAÇÃO</h3>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-2xl text-gray-400 line-through">De R$ 497</span>
                <span className="text-5xl md:text-6xl font-black text-yellow-400">R$ 97</span>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black text-2xl px-16 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-black"
              >
                GARANTIR MINHA VAGA AGORA!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos em Carrossel */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">✅ MAIS DE 10.000 VIDAS TRANSFORMADAS</h2>
            <p className="text-2xl">Veja depoimentos reais de quem já conseguiu:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white text-black shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 font-semibold italic">
                    "Em apenas 2 semanas já vi resultados incríveis! Minha vida mudou completamente. Super recomendo!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      C{i}
                    </div>
                    <div>
                      <p className="font-bold text-lg">Cliente Satisfeito {i}</p>
                      <p className="text-sm text-gray-600">Transformação em 2 semanas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final com Gradiente */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">🔥 SUA ÚLTIMA CHANCE!</h2>
          
          <p className="text-2xl md:text-3xl mb-12 font-bold">
            Não deixe essa oportunidade passar!<br/>
            Transforme sua vida HOJE mesmo!
          </p>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-8 rounded-3xl mb-12 shadow-2xl">
            <p className="text-2xl md:text-3xl font-black mb-4">✅ GARANTIA INCONDICIONAL</p>
            <p className="text-lg md:text-xl">30 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro!</p>
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black text-2xl md:text-4xl px-20 py-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse font-black mb-8"
          >
            <Rocket className="h-12 w-12 mr-4" />
            GARANTIR MINHA TRANSFORMAÇÃO AGORA!
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span>Suporte 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span>Garantia total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="py-8 px-6 bg-black text-white text-center">
        <p className="text-lg">© 2024 {siteData.nomeDoSite}. Transformando vidas através de resultados reais.</p>
      </footer>
    </div>
  );
};
