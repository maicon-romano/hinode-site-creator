
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Zap, Target, Rocket, Star, CheckCircle, Clock, Shield, ArrowRight, TrendingUp } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Hero Section - Foco em Conversão */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-2 rounded-full mb-6 animate-bounce font-bold">
            <Clock className="h-5 w-5" />
            <span>🔥 OFERTA POR TEMPO LIMITADO!</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
            {siteData.hero?.titulo || 'TRANSFORME SUA VIDA EM 30 DIAS'}
          </h1>
          
          <p className="text-2xl lg:text-3xl mb-8 font-semibold">
            {siteData.hero?.subtitulo || 'Descubra o método que já transformou mais de 10.000 vidas'}
          </p>
          
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl mb-8 inline-block">
            <span className="text-xl font-bold">GARANTIA DE 30 DIAS OU SEU DINHEIRO DE VOLTA!</span>
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-2xl px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse font-black"
          >
            <Rocket className="h-8 w-8 mr-3" />
            QUERO TRANSFORMAR MINHA VIDA AGORA!
          </Button>
          
          <p className="mt-4 text-lg opacity-90">👆 Clique aqui e comece hoje mesmo!</p>
        </div>
      </section>

      {/* Urgência e Escassez */}
      <section className="py-16 px-6 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black mb-6">⏰ ATENÇÃO: ÚLTIMAS VAGAS!</h2>
          <p className="text-xl mb-8">Restam apenas <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">23 VAGAS</span> para esta turma exclusiva</p>
          
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-3xl font-black">00</div>
              <div className="text-sm">DIAS</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-3xl font-black">12</div>
              <div className="text-sm">HORAS</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-3xl font-black">34</div>
              <div className="text-sm">MIN</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-3xl font-black">56</div>
              <div className="text-sm">SEG</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios com Foco em Resultados */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-gray-900">
              🚀 O QUE VOCÊ VAI CONQUISTAR:
            </h2>
            <p className="text-2xl text-red-600 font-bold">Resultados GARANTIDOS em 30 dias ou seu dinheiro de volta!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "AUMENTO DE 300% NOS RESULTADOS", desc: "Método comprovado cientificamente" },
              { icon: Zap, title: "TRANSFORMAÇÃO RÁPIDA", desc: "Primeiros resultados em 7 dias" },
              { icon: Shield, title: "GARANTIA TOTAL", desc: "30 dias para testar sem riscos" }
            ].map((benefit, index) => (
              <Card key={index} className="border-4 border-orange-500 hover:border-red-500 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-700 font-semibold">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">✅ +10.000 PESSOAS JÁ TRANSFORMARAM SUAS VIDAS</h2>
            <p className="text-2xl">Veja alguns depoimentos reais de quem já conseguiu:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white text-black shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 font-semibold">
                    "Em apenas 2 semanas já vi resultados incríveis! Minha vida mudou completamente. Super recomendo!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-bold">Cliente Satisfeito {i}</p>
                      <p className="text-sm text-gray-600">Resultado em 2 semanas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona - Simples e Direto */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">⚡ COMO FUNCIONA (É MAIS SIMPLES DO QUE VOCÊ IMAGINA)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "CLIQUE NO BOTÃO", desc: "E fale conosco pelo WhatsApp" },
              { step: "2", title: "RECEBA O ACESSO", desc: "Imediatamente após a confirmação" },
              { step: "3", title: "COMECE AGORA", desc: "E veja resultados em 7 dias" }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-black text-black">
                  {step.step}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-xl">{step.desc}</p>
                {index < 2 && (
                  <ArrowRight className="h-12 w-12 text-yellow-400 mx-auto mt-8 hidden md:block absolute -right-6 top-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Máxima Conversão */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-6xl font-black mb-8">
            🔥 ÚLTIMA CHANCE!
          </h2>
          
          <p className="text-3xl mb-8 font-bold">
            Não deixe essa oportunidade passar!<br/>
            Comece sua transformação HOJE mesmo!
          </p>
          
          <div className="bg-yellow-400 text-black p-8 rounded-3xl mb-8">
            <p className="text-2xl font-black mb-4">✅ GARANTIA INCONDICIONAL DE 30 DIAS</p>
            <p className="text-lg">Se não ficar 100% satisfeito, devolvemos todo seu dinheiro!</p>
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-3xl px-20 py-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse font-black"
          >
            <Rocket className="h-10 w-10 mr-4" />
            SIM! QUERO TRANSFORMAR MINHA VIDA AGORA!
          </Button>
          
          <p className="mt-6 text-xl opacity-90">👆 CLIQUE AQUI E GARANTE SUA VAGA!</p>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-lg">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span>Acesso imediato</span>
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span>Suporte 24h</span>
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span>Garantia total</span>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="py-8 px-6 bg-black text-white text-center">
        <p>© 2024 {siteData.nomeDoSite}. Transformando vidas através de resultados reais.</p>
      </footer>
    </div>
  );
};
