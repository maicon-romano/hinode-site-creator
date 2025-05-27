
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Target, Award, TrendingUp, MapPin, Phone, Mail, Clock } from 'lucide-react';

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
    endereco: string;
    telefone: string;
    email: string;
    whatsapp: string;
  };
  whatsapp?: string;
}

interface InstitucionalCorporateTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const InstitucionalCorporateTemplate: React.FC<InstitucionalCorporateTemplateProps> = ({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="container mx-auto py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {siteData.logoPath && (
                <img src={siteData.logoPath} alt="Logo" className="h-12 w-auto" />
              )}
              <div>
                <h1 className="text-2xl font-bold" style={{ color: siteData.cores.principal }}>
                  {siteData.hero?.titulo || siteData.nomeDoSite}
                </h1>
                {siteData.hero?.anos && (
                  <p className="text-sm text-gray-600">{siteData.hero.anos} anos de excelência</p>
                )}
              </div>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              style={{ backgroundColor: siteData.cores.destaque }}
              className="text-white hover:opacity-90 shadow-lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contato
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Building2 className="h-4 w-4" />
                Líder em Soluções Corporativas
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in animation-delay-500" style={{ color: siteData.cores.principal }}>
                {siteData.hero?.titulo || siteData.nomeDoSite}
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.texto }}>
                {siteData.hero?.slogan || 'Inovação que transforma o futuro dos negócios'}
              </p>
              
              <div className="flex items-center gap-8 mb-8 animate-fade-in animation-delay-1500">
                {siteData.hero?.anos && (
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: siteData.cores.destaque }}>
                      {siteData.hero.anos}+
                    </div>
                    <div className="text-sm text-gray-600">Anos de Mercado</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: siteData.cores.destaque }}>
                    {siteData.numeros?.clientes || '500+'}
                  </div>
                  <div className="text-sm text-gray-600">Clientes Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: siteData.cores.destaque }}>
                    {siteData.numeros?.satisfacao || '98%'}
                  </div>
                  <div className="text-sm text-gray-600">Satisfação</div>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                style={{ backgroundColor: siteData.cores.principal }}
                className="text-white hover:opacity-90 animate-fade-in animation-delay-2000"
              >
                Fale Conosco
              </Button>
            </div>

            <div className="relative animate-scale-in animation-delay-1000">
              {siteData.hero?.imagemCorporativa ? (
                <img 
                  src={siteData.hero.imagemCorporativa} 
                  alt="Corporativo" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Building2 className="h-24 w-24" style={{ color: siteData.cores.principal }} />
                </div>
              )}
              
              {/* Floating badge */}
              <div className="absolute -top-6 -right-6 bg-white shadow-xl rounded-2xl p-4 animate-bounce">
                <Award className="h-8 w-8" style={{ color: siteData.cores.destaque }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {siteData.sobre && (
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
                Nossa Empresa
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteData.sobre.historia && (
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${siteData.cores.principal}20` }}>
                      <Building2 className="h-8 w-8" style={{ color: siteData.cores.principal }} />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                      Nossa História
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {siteData.sobre.historia}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {siteData.sobre.missao && (
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animation-delay-500">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${siteData.cores.destaque}20` }}>
                      <Target className="h-8 w-8" style={{ color: siteData.cores.destaque }} />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                      Missão
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {siteData.sobre.missao}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {siteData.sobre.visao && (
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animation-delay-1000">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${siteData.cores.destaque}20` }}>
                      <TrendingUp className="h-8 w-8" style={{ color: siteData.cores.destaque }} />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: siteData.cores.principal }}>
                      Visão
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {siteData.sobre.visao}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {siteData.servicos && (
        <section className="py-20 px-6" style={{ backgroundColor: `${siteData.cores.principal}05` }}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
                {siteData.servicos.titulo}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteData.servicos.lista.split('\n').filter(item => item.trim()).map((service, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${siteData.cores.destaque}20` }}>
                      <Users className="h-8 w-8" style={{ color: siteData.cores.destaque }} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-opacity-80 transition-colors" style={{ color: siteData.cores.principal }}>
                      {service}
                    </h3>
                    <p className="text-gray-600">
                      Soluções personalizadas para suas necessidades específicas
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: siteData.cores.principal }}>
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600">
              Estamos prontos para atender suas necessidades corporativas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.contato?.endereco && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Endereço</h4>
                  <p className="text-gray-600 text-sm">{siteData.contato.endereco}</p>
                </CardContent>
              </Card>
            )}
            
            {siteData.contato?.telefone && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Telefone</h4>
                  <p className="text-gray-600 text-sm">{siteData.contato.telefone}</p>
                </CardContent>
              </Card>
            )}
            
            {siteData.contato?.email && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Email</h4>
                  <p className="text-gray-600 text-sm">{siteData.contato.email}</p>
                </CardContent>
              </Card>
            )}
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mx-auto mb-4" style={{ color: siteData.cores.destaque }} />
                <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Horário</h4>
                <p className="text-gray-600 text-sm">Seg-Sex: 8h às 18h</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              style={{ backgroundColor: siteData.cores.principal }}
              className="text-white hover:opacity-90 text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: siteData.cores.principal }}>
        <div className="container mx-auto text-center text-white">
          <h4 className="text-xl font-bold mb-4">{siteData.nomeDoSite}</h4>
          <p className="mb-4 opacity-90">© 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          <p className="text-sm opacity-75">Excelência empresarial desde {siteData.hero?.anos || '2009'}</p>
        </div>
      </footer>
    </div>
  );
};
