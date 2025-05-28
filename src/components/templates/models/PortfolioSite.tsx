
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Code, Palette, Camera, Coffee, ExternalLink, Github, Linkedin, Mail, ArrowRight, Star, Download, MapPin, Calendar } from 'lucide-react';

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

  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => setShowBackToTop(window.pageYOffset > 300);
    if (!isPreview) {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, [isPreview]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* WhatsApp Float */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <Mail className="h-7 w-7 text-white" />
      </button>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* Hero com Foto em Destaque */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-teal-900/50"></div>
        
        {/* Elementos flutuantes */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm text-purple-300 px-6 py-3 rounded-full mb-8 border border-purple-400/30">
                <Coffee className="h-5 w-5" />
                <span className="font-medium">Disponível para freelances</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-none mb-8">
                <span className="block text-gray-300">Olá,</span>
                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Eu sou
                </span>
                <span className="block text-white">{siteData.hero?.nome || 'João Silva'}</span>
              </h1>
              
              <h2 className="text-2xl lg:text-4xl mb-8 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold">
                {siteData.hero?.profissao || 'Designer & Desenvolvedor'}
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                {siteData.hero?.descricao || 'Transformo ideias em experiências digitais memoráveis através do design e código limpo.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Ver Meu Trabalho
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-400 px-10 py-4 rounded-full transition-all duration-300"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center animate-fade-in animation-delay-500">
              {siteData.hero?.foto ? (
                <div className="relative">
                  <img 
                    src={siteData.hero.foto} 
                    alt="Profile" 
                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl border-8 border-white/10 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                </div>
              ) : (
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm border-8 border-white/10">
                  <div className="text-center">
                    <Camera className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                    <span className="text-gray-400 text-xl">Sua foto aqui</span>
                  </div>
                </div>
              )}
              
              {/* Ícones flutuantes */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Code className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <Palette className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Elegante */}
      <section className="py-20 px-6 bg-white text-gray-900">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Sobre Mim</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2">
                  <p className="text-lg leading-relaxed text-gray-700 mb-8 font-light">
                    {siteData.sobre?.biografia || 'Sou um profissional criativo apaixonado por tecnologia e design. Com mais de 5 anos de experiência, trabalho criando soluções digitais que conectam marcas com pessoas através de experiências memoráveis e funcionais.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{siteData.sobre?.experiencia || '5+'}+</div>
                      <div className="text-gray-600 font-medium">Anos de Experiência</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl">
                      <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                      <div className="text-gray-600 font-medium">Projetos Concluídos</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {['UI/UX Design', 'Frontend', 'React', 'TypeScript', 'Figma'].map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Localização</div>
                      <div className="text-gray-600">São Paulo, Brasil</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Especialização</div>
                      <div className="text-gray-600">{siteData.sobre?.especializacao || 'UI/UX & Frontend'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Portfolio Grid Masonry */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {siteData.portfolio?.titulo || 'Meus Projetos'}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {siteData.portfolio?.descricao || 'Uma seleção cuidadosa dos meus trabalhos mais recentes e impactantes'}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 group hover:border-purple-500 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`aspect-${i % 2 === 0 ? 'square' : 'video'} bg-gradient-to-br from-purple-600/30 to-blue-600/30 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop')] bg-cover bg-center opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm">
                      <div className="flex gap-4">
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 rounded-full w-12 h-12 p-0">
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12 p-0">
                          <Github className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Projeto Criativo {i}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <span className="px-2 py-1 bg-purple-500/80 text-white rounded-full text-xs">React</span>
                        <span className="px-2 py-1 bg-blue-500/80 text-white rounded-full text-xs">Design</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ver Todos os Projetos
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Habilidades com Ícones Animados */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Habilidades & Tecnologias</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.habilidades?.lista ? 
              siteData.habilidades.lista.split('\n').filter((item: string) => item.trim()).map((skill: string, index: number) => {
                const [name, percentage] = skill.split(' - ');
                return (
                  <Card key={index} className="bg-gray-700 border-gray-600 group hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Code className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{name}</h3>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: percentage || '90%' }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">{percentage || '90%'}</span>
                    </CardContent>
                  </Card>
                );
              }) :
              ['React', 'TypeScript', 'Figma', 'Node.js', 'Python', 'Adobe CS', 'Git', 'Docker'].map((skill, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600 group hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{skill}</h3>
                    <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">90%</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Depoimentos Sutis */}
      <section className="py-20 px-6 bg-white text-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">O Que Dizem Sobre Meu Trabalho</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                    "Trabalho excepcional! Entregou exatamente o que precisávamos com qualidade superior e dentro do prazo."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      C{i}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cliente {i}</p>
                      <p className="text-sm text-gray-600">CEO, Empresa XYZ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Minimalista */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {siteData.contato?.titulo || 'Vamos Trabalhar Juntos?'}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-400">{siteData.contato?.email || 'joao@designer.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">LinkedIn</h4>
                    <p className="text-gray-400">linkedin.com/in/joaodesigner</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Github className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">GitHub</h4>
                    <p className="text-gray-400">github.com/joaodesigner</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Vamos Conversar
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Envie uma Mensagem</h3>
                <div className="space-y-4">
                  <Input 
                    placeholder="Seu nome" 
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl focus:border-purple-500"
                  />
                  <Input 
                    placeholder="Seu email" 
                    type="email" 
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl focus:border-purple-500"
                  />
                  <Input 
                    placeholder="Assunto" 
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl focus:border-purple-500"
                  />
                  <textarea 
                    className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl min-h-[120px] resize-y text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder="Conte-me sobre seu projeto..."
                  />
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl"
                  >
                    Enviar Mensagem
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h4 className="text-2xl font-bold mb-2">{siteData.hero?.nome || 'João Silva'}</h4>
            <p className="text-gray-400">{siteData.hero?.profissao || 'Designer & Desenvolvedor'}</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Linkedin className="h-5 w-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Github className="h-5 w-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Mail className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <p className="text-gray-400 text-sm">© 2024 {siteData.hero?.nome || 'João Silva'}. Criando experiências digitais memoráveis.</p>
        </div>
      </footer>
    </div>
  );
};
