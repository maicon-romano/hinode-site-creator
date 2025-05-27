
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Users, TrendingUp, Shield, Globe, CheckCircle } from 'lucide-react';
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

interface InstitucionalCorporateTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalCorporateTemplate: React.FC<InstitucionalCorporateTemplateProps> = ({ 
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
    <div className="min-h-screen bg-gray-50">
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Corporate Header */}
      <header className="bg-white shadow-sm border-b-4" style={{ borderColor: cores.principal }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {siteData.logoPath && (
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-12 w-auto"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold" style={{ color: cores.principal }}>
                  {siteData.nomeDoSite}
                </h1>
                <p className="text-sm text-gray-600">Soluções Corporativas</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#inicio" className="text-gray-700 hover:text-gray-900 font-medium">Início</a>
              <a href="#sobre" className="text-gray-700 hover:text-gray-900 font-medium">Sobre</a>
              <a href="#servicos" className="text-gray-700 hover:text-gray-900 font-medium">Serviços</a>
              <a href="#contato" className="text-gray-700 hover:text-gray-900 font-medium">Contato</a>
            </nav>
            
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
      </header>

      {/* Corporate Hero */}
      <section id="inicio" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                   style={{ backgroundColor: `${cores.principal}15`, color: cores.principal }}>
                Líder do Mercado
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: cores.texto }}>
                {siteData.headline}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {siteData.descricao}
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: cores.principal }}>500+</div>
                  <div className="text-sm text-gray-600">Empresas Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: cores.principal }}>15+</div>
                  <div className="text-sm text-gray-600">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: cores.principal }}>98%</div>
                  <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90 px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Solicitar Proposta
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                  alt="Corporate" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-sm">Certificado ISO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4" style={{ color: cores.principal }}>
              Nossos Serviços
            </h3>
            <p className="text-xl text-gray-600">Soluções completas para sua empresa</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Consultoria", desc: "Estratégias personalizadas", color: "bg-blue-500" },
              { icon: TrendingUp, title: "Crescimento", desc: "Aceleração de resultados", color: "bg-green-500" },
              { icon: Shield, title: "Segurança", desc: "Proteção de dados", color: "bg-red-500" },
              { icon: Globe, title: "Expansão", desc: "Mercados globais", color: "bg-purple-500" }
            ].map((service, i) => (
              <Card key={i} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center relative overflow-hidden">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: cores.principal }}>
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: cores.principal }}>
            Empresas que Confiam em Nós
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-semibold">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {secoes.formulario && (
        <section className="py-20 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4" style={{ color: cores.principal }}>
                Vamos Conversar sobre seu Projeto
              </h3>
              <p className="text-xl text-gray-600">
                Nossa equipe está pronta para ajudar sua empresa a crescer
              </p>
            </div>
            
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input placeholder="Nome da Empresa" className="bg-gray-50" />
                  <Input placeholder="Seu Nome" className="bg-gray-50" />
                  <Input placeholder="Email Corporativo" type="email" className="bg-gray-50" />
                  <Input placeholder="Telefone" className="bg-gray-50" />
                </div>
                <textarea 
                  className="w-full mt-6 p-4 border rounded-lg bg-gray-50 min-h-[120px] resize-y"
                  placeholder="Conte-nos sobre seu projeto e necessidades..."
                />
                <Button 
                  className="w-full mt-6 text-white py-4 text-lg font-semibold"
                  style={{ backgroundColor: cores.destaque }}
                  onClick={handleWhatsAppClick}
                >
                  Enviar Solicitação
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-xl font-bold mb-4">{siteData.nomeDoSite}</h5>
              <p className="text-gray-400 mb-4">
                Transformando negócios através de soluções inovadoras e estratégicas.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Serviços</h6>
              <ul className="space-y-2 text-gray-400">
                <li>Consultoria</li>
                <li>Implementação</li>
                <li>Suporte</li>
                <li>Treinamento</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Empresa</h6>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nós</li>
                <li>Carreira</li>
                <li>Imprensa</li>
                <li>Parceiros</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contato</h6>
              <div className="space-y-2 text-gray-400">
                <p><Phone className="h-4 w-4 inline mr-2" />{siteData.whatsapp}</p>
                <p><Mail className="h-4 w-4 inline mr-2" />contato@{siteData.nomeDoSite.toLowerCase().replace(/\s+/g, '')}.com</p>
                <p><MapPin className="h-4 w-4 inline mr-2" />São Paulo, SP</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
