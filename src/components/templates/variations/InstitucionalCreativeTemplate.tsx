
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Lightbulb, Rocket, Palette, Heart, Star, ArrowRight } from 'lucide-react';
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

interface InstitucionalCreativeTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalCreativeTemplate: React.FC<InstitucionalCreativeTemplateProps> = ({ 
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Creative Navigation */}
      <nav className="py-6 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-purple-100">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteData.logoPath && (
              <div className="relative">
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-12 w-auto"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteData.nomeDoSite}
              </h1>
              <p className="text-xs text-gray-500">Criatividade & Inovação</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Início</a>
            <a href="#sobre" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Sobre</a>
            <a href="#portfolio" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Portfolio</a>
            <a href="#contato" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contato</a>
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Heart className="h-4 w-4 mr-2" />
            Vamos Criar!
          </Button>
        </div>
      </nav>

      {/* Creative Hero */}
      <section id="inicio" className="py-20 px-6 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-float animation-delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-float animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block">
              <h2 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {siteData.headline}
                </span>
              </h2>
              <div className="flex justify-center">
                <Lightbulb className="h-8 w-8 text-yellow-400 animate-pulse ml-4" />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {siteData.descricao}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Rocket className="h-5 w-5 mr-2" />
                Iniciar Projeto
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 text-lg px-8 py-4 rounded-full"
              >
                <Palette className="h-5 w-5 mr-2" />
                Ver Portfolio
              </Button>
            </div>
          </div>
          
          {/* Creative Process */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Descobrir", desc: "Entendemos sua visão", icon: Lightbulb, color: "from-yellow-400 to-orange-400" },
              { step: "02", title: "Criar", desc: "Desenvolvemos soluções", icon: Palette, color: "from-purple-400 to-pink-400" },
              { step: "03", title: "Lançar", desc: "Implementamos com excelência", icon: Rocket, color: "from-blue-400 to-cyan-400" },
              { step: "04", title: "Evoluir", desc: "Melhoramento contínuo", icon: Star, color: "from-green-400 to-blue-400" }
            ].map((process, i) => (
              <Card key={i} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${process.color}`}></div>
                  
                  <div className="text-xs font-bold text-gray-400 mb-2">{process.step}</div>
                  
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${process.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <process.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2" style={{ color: cores.principal }}>
                    {process.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{process.desc}</p>
                  
                  {i < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creative About */}
      {secoes.sobre && (
        <section id="sobre" className="py-20 px-6 bg-white/50">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Transformamos Ideias em Realidade
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Somos uma equipe apaixonada por criar experiências únicas e memoráveis. 
                  Nossa abordagem combina criatividade, tecnologia e estratégia para entregar 
                  resultados que superam expectativas.
                </p>
                <div className="space-y-4">
                  {[
                    "Mais de 200 projetos criativos realizados",
                    "Equipe multidisciplinar de especialistas",
                    "Metodologia ágil e colaborativa",
                    "Foco em inovação e tendências"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop" 
                    alt="Creative Team" 
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold text-sm">Equipe Premiada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Creative CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Criar Algo Incrível?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Vamos transformar sua visão em uma experiência extraordinária que conecta e inspira.
          </p>
          
          <Button 
            size="lg" 
            onClick={handleWhatsAppClick}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            <Phone className="h-5 w-5 mr-2" />
            Vamos Conversar!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h5 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {siteData.nomeDoSite}
            </h5>
            <p className="text-gray-400 mt-2">Criando o futuro, um projeto por vez.</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Phone className="h-5 w-5" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          
          <p className="text-gray-400">
            &copy; 2024 {siteData.nomeDoSite}. Feito com ❤️ e muita criatividade.
          </p>
        </div>
      </footer>
    </div>
  );
};
