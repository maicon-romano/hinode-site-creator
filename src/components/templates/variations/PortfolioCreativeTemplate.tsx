
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Palette, Star, Eye, Heart, Download, Instagram, Mail, MapPin } from 'lucide-react';

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
    profissao?: string;
    descricao?: string;
    foto?: string;
  };
  sobre?: {
    biografia: string;
    experiencia?: string;
    especializacao?: string;
  };
  habilidades?: {
    lista: string;
  };
  portfolio?: {
    titulo: string;
    descricao: string;
  };
  contato?: {
    titulo: string;
    email: string;
    whatsapp: string;
    instagram?: string;
  };
  whatsapp?: string;
}

interface PortfolioCreativeTemplateProps {
  siteData: SiteData;
  isPreview?: boolean;
}

export const PortfolioCreativeTemplate: React.FC<PortfolioCreativeTemplateProps> = ({
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="py-6 px-6 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {siteData.logoPath && (
              <img src={siteData.logoPath} alt="Logo" className="h-12 w-auto rounded-full" />
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {siteData.hero?.nome || siteData.nomeDoSite}
            </h1>
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
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contato
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/30 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-300/30 rounded-full blur-xl animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Palette className="h-4 w-4" />
                Criativo Profissional
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent animate-fade-in animation-delay-500">
                {siteData.hero?.nome || 'Seu Nome'}
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-medium mb-6 animate-fade-in animation-delay-1000" style={{ color: siteData.cores.principal }}>
                {siteData.hero?.profissao || 'Designer Criativo'}
              </h2>
              
              <p className="text-lg lg:text-xl mb-8 text-gray-700 animate-fade-in animation-delay-1500">
                {siteData.hero?.descricao || 'Transformo ideias em experiências visuais memoráveis que conectam marcas às pessoas'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-2000">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Vamos Criar Juntos
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 text-xl px-8 py-6 rounded-full"
                >
                  Ver Portfólio
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in animation-delay-1000">
              {siteData.hero?.foto ? (
                <div className="relative">
                  <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                    <img 
                      src={siteData.hero.foto} 
                      alt="Foto Profissional" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-purple-900/20 rounded-3xl"></div>
                </div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-orange-200 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50">
                  <Camera className="h-24 w-24 text-gray-400" />
                </div>
              )}
              
              {/* Floating creative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {siteData.sobre && (
        <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Sobre Mim
                </h2>
                
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {siteData.sobre.biografia}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {siteData.sobre.experiencia && (
                    <div className="text-center p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl">
                      <div className="text-3xl font-bold text-pink-600">{siteData.sobre.experiencia}+</div>
                      <div className="text-sm text-gray-600">Anos de Experiência</div>
                    </div>
                  )}
                  {siteData.sobre.especializacao && (
                    <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-orange-100 rounded-xl">
                      <div className="text-lg font-bold text-purple-600">{siteData.sobre.especializacao}</div>
                      <div className="text-sm text-gray-600">Especialização</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Creative portfolio preview */}
                  <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
                    <Palette className="h-12 w-12 text-pink-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-purple-200 to-orange-200 rounded-2xl flex items-center justify-center">
                    <Camera className="h-12 w-12 text-purple-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-orange-200 to-yellow-200 rounded-2xl flex items-center justify-center">
                    <Eye className="h-12 w-12 text-orange-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-yellow-200 to-pink-200 rounded-2xl flex items-center justify-center">
                    <Star className="h-12 w-12 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {siteData.habilidades && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Minhas Habilidades
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteData.habilidades.lista.split('\n').filter(item => item.trim()).map((skill, index) => {
                const [skillName, percentage] = skill.split(' - ');
                const percent = percentage?.replace('%', '') || '90';
                
                return (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium" style={{ color: siteData.cores.principal }}>{skillName}</span>
                      <span className="text-sm text-gray-600">{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      {siteData.portfolio && (
        <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {siteData.portfolio.titulo}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {siteData.portfolio.descricao}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Card key={item} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2" style={{ color: siteData.cores.principal }}>
                      Projeto {item}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Design criativo e inovador
                    </p>
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
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {siteData.contato?.titulo || 'Vamos Trabalhar Juntos?'}
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Pronto para transformar suas ideias em realidade visual? Entre em contato comigo!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {siteData.contato?.email && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-pink-600" />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Email</h4>
                  <p className="text-gray-600 text-sm">{siteData.contato.email}</p>
                </CardContent>
              </Card>
            )}
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mx-auto mb-4 text-purple-600" />
                <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Localização</h4>
                <p className="text-gray-600 text-sm">Atendimento Online</p>
              </CardContent>
            </Card>
            
            {siteData.contato?.instagram && (
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer" onClick={handleInstagramClick}>
                <CardContent className="p-6">
                  <Instagram className="h-8 w-8 mx-auto mb-4 text-pink-600" />
                  <h4 className="font-bold mb-2" style={{ color: siteData.cores.principal }}>Instagram</h4>
                  <p className="text-gray-600 text-sm">@meuportfolio</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-16 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Começar um Projeto
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
        <div className="container mx-auto text-center">
          <h4 className="text-xl font-bold mb-4">{siteData.hero?.nome || siteData.nomeDoSite}</h4>
          <p className="mb-4 opacity-90">© 2024 Todos os direitos reservados.</p>
          <p className="text-sm opacity-75">Criando experiências visuais únicas</p>
        </div>
      </footer>
    </div>
  );
};
