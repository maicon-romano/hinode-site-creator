
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Code, Palette, Camera, Coffee, ExternalLink, Github, Linkedin, Mail, ArrowRight, Star } from 'lucide-react';

interface PortfolioSiteProps {
  siteData: any;
  isPreview?: boolean;
}

export const PortfolioSite: React.FC<PortfolioSiteProps> = ({
  siteData,
  isPreview = false
}) => {
  const handleWhatsAppClick = () => {
    if (!isPreview && siteData.whatsapp) {
      window.open(`https://wa.me/${siteData.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section - Estilo Criativo */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-teal-900/50"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full mb-6">
                <Coffee className="h-4 w-4" />
                <span className="text-sm font-medium">Disponível para freelances</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-6">
                <span className="block">Olá,</span>
                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Eu sou
                </span>
                <span className="block">{siteData.hero?.nome || 'João Silva'}</span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl mb-6 text-gray-300">
                {siteData.hero?.profissao || 'Designer Gráfico & Desenvolvedor'}
              </h2>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {siteData.hero?.descricao || 'Transformo ideias em experiências digitais memoráveis através do design e código limpo.'}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Ver Meu Trabalho
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-full"
                >
                  Download CV
                </Button>
              </div>
            </div>

            <div className="relative">
              {siteData.hero?.foto ? (
                <img src={siteData.hero.foto} alt="Profile" className="w-full max-w-md mx-auto rounded-3xl shadow-2xl" />
              ) : (
                <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl shadow-2xl flex items-center justify-center backdrop-blur-sm border border-gray-700">
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                    <span className="text-gray-500 text-lg">Sua foto aqui</span>
                  </div>
                </div>
              )}
              
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Code className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Palette className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Sobre Mim</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                {siteData.sobre?.biografia || 'Sou um profissional criativo apaixonado por tecnologia e design. Com mais de 5 anos de experiência, trabalho criando soluções digitais que conectam marcas com pessoas através de experiências memoráveis.'}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Experiência</h4>
                  <p className="text-2xl font-bold">{siteData.sobre?.experiencia || '5+'}+ anos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Projetos</h4>
                  <p className="text-2xl font-bold">50+ concluídos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-400 mb-2">Especialização</h4>
                  <p className="text-lg">{siteData.sobre?.especializacao || 'UI/UX & Frontend'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Localização</h4>
                  <p className="text-lg">São Paulo, Brasil</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Tecnologias</h3>
              <div className="space-y-4">
                {siteData.habilidades?.lista ? 
                  siteData.habilidades.lista.split('\n').filter((item: string) => item.trim()).map((skill: string, index: number) => {
                    const [name, percentage] = skill.split(' - ');
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{name}</span>
                          <span className="text-sm text-gray-400">{percentage || '90%'}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: percentage || '90%' }}
                          ></div>
                        </div>
                      </div>
                    );
                  }) :
                  ['React - 95%', 'TypeScript - 90%', 'Figma - 85%', 'Node.js - 80%'].map((skill, index) => {
                    const [name, percentage] = skill.split(' - ');
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{name}</span>
                          <span className="text-sm text-gray-400">{percentage}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: percentage }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {siteData.portfolio?.titulo || 'Meus Projetos'}
            </h2>
            <p className="text-xl text-gray-400">
              {siteData.portfolio?.descricao || 'Alguns dos meus trabalhos mais recentes'}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 group hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <Code className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                      <span className="text-gray-500">Projeto {i}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      Projeto {i}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Descrição do projeto desenvolvido com tecnologias modernas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">React</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">TypeScript</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {siteData.contato?.titulo || 'Vamos Trabalhar Juntos?'}
            </h2>
            <p className="text-xl text-gray-400">
              Tenho uma ideia? Vamos conversar sobre seu próximo projeto
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Entre em Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-400">{siteData.contato?.email || 'joao@designer.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-gray-400">linkedin.com/in/joaodesigner</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Github className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-gray-400">github.com/joaodesigner</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full shadow-lg"
                >
                  Falar no WhatsApp
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Envie uma Mensagem</h3>
                <div className="space-y-4">
                  <Input placeholder="Seu nome" className="bg-gray-600 border-gray-500 text-white" />
                  <Input placeholder="Seu email" type="email" className="bg-gray-600 border-gray-500 text-white" />
                  <Input placeholder="Assunto" className="bg-gray-600 border-gray-500 text-white" />
                  <textarea 
                    className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md min-h-[120px] resize-y text-white placeholder-gray-400"
                    placeholder="Sua mensagem..."
                  />
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    Enviar Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-400">
            © 2024 {siteData.hero?.nome || 'João Silva'}. Criando experiências digitais memoráveis.
          </p>
        </div>
      </footer>
    </div>
  );
};
