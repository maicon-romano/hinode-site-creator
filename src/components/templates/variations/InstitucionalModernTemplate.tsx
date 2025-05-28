
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Building2, Target, Users, Award, CheckCircle, Star } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';

interface SiteData {
  nomeDoSite: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
  whatsapp: string;
  hero?: {
    titulo: string;
    slogan?: string;
    anos?: string;
    imagemCorporativa?: string;
  };
  sobre?: {
    historia: string;
    missao: string;
    visao: string;
  };
  servicos?: {
    titulo: string;
    lista: string;
  };
  numeros?: {
    clientes: string;
    projetos: string;
    satisfacao: string;
  };
  contato?: {
    endereco?: string;
    telefone?: string;
    email?: string;
    whatsapp: string;
  };
}

interface InstitucionalModernTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalModernTemplate: React.FC<InstitucionalModernTemplateProps> = ({ 
  siteData, 
  isPreview = false 
}) => {
  const { cores } = siteData;
  
  const handleWhatsAppClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: cores.fundo, color: cores.texto }}>
      <WhatsAppButton whatsapp={siteData.whatsapp} isPreview={isPreview} color={cores.destaque} />
      
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {siteData.logoPath && (
                <img 
                  src={siteData.logoPath} 
                  alt="Logo" 
                  className="h-10 w-auto"
                />
              )}
              <h1 className="text-xl font-bold" style={{ color: cores.principal }}>
                {siteData.nomeDoSite}
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:opacity-70 transition-opacity">Início</a>
              <a href="#sobre" className="text-sm font-medium hover:opacity-70 transition-opacity">Sobre</a>
              <a href="#servicos" className="text-sm font-medium hover:opacity-70 transition-opacity">Serviços</a>
              <a href="#contato" className="text-sm font-medium hover:opacity-70 transition-opacity">Contato</a>
              <Button 
                size="sm"
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: cores.destaque }}
                className="text-white hover:opacity-90"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Corporate Hero Section */}
      <section id="inicio" className="pt-20 pb-16 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, ${cores.principal} 25%, transparent 25%), linear-gradient(-45deg, ${cores.principal} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${cores.principal} 75%), linear-gradient(-45deg, transparent 75%, ${cores.principal} 75%)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2" style={{ borderColor: cores.principal, color: cores.principal }}>
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {siteData.hero?.anos ? `${siteData.hero.anos} anos` : 'Empresa'} de Excelência
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span style={{ color: cores.principal }}>
                  {siteData.hero?.titulo || siteData.nomeDoSite}
                </span>
              </h1>
              
              {siteData.hero?.slogan && (
                <p className="text-xl lg:text-2xl font-light opacity-80">
                  {siteData.hero.slogan}
                </p>
              )}
              
              <p className="text-lg leading-relaxed opacity-75 max-w-lg">
                Soluções corporativas inovadoras com tecnologia de ponta e atendimento personalizado para impulsionar o crescimento do seu negócio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={handleWhatsAppClick}
                  style={{ backgroundColor: cores.destaque }}
                  className="text-white hover:opacity-90 px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Solicitar Orçamento
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50"
                  style={{ borderColor: cores.principal, color: cores.principal }}
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  Conheça a Empresa
                </Button>
              </div>
            </div>
            
            <div className="relative">
              {siteData.hero?.imagemCorporativa ? (
                <img 
                  src={siteData.hero.imagemCorporativa} 
                  alt="Empresa" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="relative">
                  <div 
                    className="w-full aspect-square rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl font-bold"
                    style={{ backgroundColor: cores.principal }}
                  >
                    <Building2 className="h-32 w-32 opacity-80" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl" style={{ backgroundColor: cores.destaque }}>
                    <Award className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Clientes Atendidos', value: siteData.numeros?.clientes || '500+' },
              { icon: CheckCircle, label: 'Projetos Concluídos', value: siteData.numeros?.projetos || '1000+' },
              { icon: Star, label: 'Satisfação dos Clientes', value: siteData.numeros?.satisfacao || '98%' }
            ].map((stat, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cores.principal}15` }}>
                    <stat.icon className="h-8 w-8" style={{ color: cores.principal }} />
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{ color: cores.principal }}>
                    {stat.value}
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-6" style={{ backgroundColor: `${cores.principal}05` }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: cores.principal }}>
              Sobre Nossa Empresa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa história, missão e valores que nos tornam referência no mercado
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: 'Nossa História', content: siteData.sobre?.historia || 'Fundada com o objetivo de revolucionar o mercado através da inovação e excelência.' },
              { title: 'Nossa Missão', content: siteData.sobre?.missao || 'Fornecer soluções de alta qualidade que superem as expectativas dos nossos clientes.' },
              { title: 'Nossa Visão', content: siteData.sobre?.visao || 'Ser reconhecida como líder em inovação e qualidade no nosso segmento de atuação.' }
            ].map((item, index) => (
              <Card key={index} className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: cores.principal }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: cores.principal }}>
              {siteData.servicos?.titulo || 'Nossos Serviços'}
            </h2>
            <p className="text-xl text-gray-600">
              Soluções completas para todas as necessidades do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.servicos?.lista?.split('\n').filter(Boolean).map((servico, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: cores.destaque }}>
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: cores.principal }}>
                    {servico.trim()}
                  </h3>
                  <p className="text-gray-600">
                    Soluções especializadas com foco na excelência e resultados excepcionais.
                  </p>
                </CardContent>
              </Card>
            )) || [1, 2, 3].map((i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: cores.destaque }}>
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: cores.principal }}>
                    Serviço {i}
                  </h3>
                  <p className="text-gray-600">
                    Soluções especializadas com foco na excelência e resultados excepcionais.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-6" style={{ backgroundColor: `${cores.principal}10` }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: cores.principal }}>
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600">
              Estamos prontos para atender você e seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {siteData.contato?.telefone && (
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: cores.destaque }} />
                  <h4 className="font-bold mb-2">Telefone</h4>
                  <p>{siteData.contato.telefone}</p>
                </CardContent>
              </Card>
            )}
            {siteData.contato?.email && (
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 mx-auto mb-4" style={{ color: cores.destaque }} />
                  <h4 className="font-bold mb-2">E-mail</h4>
                  <p>{siteData.contato.email}</p>
                </CardContent>
              </Card>
            )}
            <Card className="text-center shadow-lg">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: cores.destaque }} />
                <h4 className="font-bold mb-2">WhatsApp</h4>
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="mt-2"
                >
                  Conversar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Nome" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Telefone" />
                <Input placeholder="Empresa" />
              </div>
              <textarea 
                className="w-full mt-6 p-4 border rounded-lg min-h-[120px] resize-y"
                placeholder="Como podemos ajudar seu negócio?"
              />
              <Button 
                className="w-full mt-6 text-white text-lg py-4"
                style={{ backgroundColor: cores.destaque }}
                onClick={handleWhatsAppClick}
              >
                <Phone className="h-5 w-5 mr-2" />
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: cores.principal }}>
        <div className="container mx-auto text-white">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold text-lg mb-4">{siteData.nomeDoSite}</h5>
              <p className="text-white/80 leading-relaxed">
                Excelência em soluções corporativas com foco na satisfação total dos nossos clientes.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Empresa</h6>
              <ul className="space-y-2 text-white/80">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contato</h6>
              <div className="space-y-2 text-white/80">
                {siteData.contato?.telefone && (
                  <p><Phone className="h-4 w-4 inline mr-2" />{siteData.contato.telefone}</p>
                )}
                {siteData.contato?.email && (
                  <p><Mail className="h-4 w-4 inline mr-2" />{siteData.contato.email}</p>
                )}
                {siteData.contato?.endereco && (
                  <p><MapPin className="h-4 w-4 inline mr-2" />{siteData.contato.endereco}</p>
                )}
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Certificações</h6>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
