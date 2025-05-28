
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Building, Users, Award, Target, CheckCircle, Phone, Mail, MapPin, ArrowRight, Shield, Globe, Clock } from 'lucide-react';

interface InstitucionalSiteProps {
  siteData: any;
  isPreview?: boolean;
}

export const InstitucionalSite: React.FC<InstitucionalSiteProps> = ({
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
    <div className="min-h-screen bg-gray-50">
      {/* WhatsApp Float */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <Phone className="h-7 w-7 text-white" />
      </button>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {siteData.logoPath && (
                <img src={siteData.logoPath} alt="Logo" className="h-12 w-auto" />
              )}
              <h1 className="text-2xl font-bold text-blue-900">{siteData.nomeDoSite}</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Início</a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Sobre</a>
              <a href="#servicos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Serviços</a>
              <a href="#contato" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contato</a>
              <Button onClick={handleWhatsAppClick} className="bg-blue-600 hover:bg-blue-700">
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Institucional com Imagem */}
      <section id="inicio" className="relative py-32 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm text-blue-200 px-6 py-3 rounded-full mb-8 border border-blue-400/30">
                <Building className="h-5 w-5" />
                <span className="font-semibold">Empresa Certificada ISO 9001</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
                {siteData.hero?.titulo || siteData.nomeDoSite}
              </h1>
              
              <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
                {siteData.hero?.subtitulo || 'Soluções corporativas de excelência há mais de uma década no mercado brasileiro'}
              </p>
              
              <div className="flex flex-wrap gap-6 text-lg mb-10">
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span>15+ anos no mercado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-300" />
                  <span>500+ clientes ativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-green-400" />
                  <span>Atuação nacional</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Solicitar Orçamento
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg transition-all duration-300"
                >
                  Conhecer Empresa
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in animation-delay-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
                    <div className="text-sm opacity-90">Anos de Experiência</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
                    <div className="text-sm opacity-90">Clientes Satisfeitos</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
                    <div className="text-sm opacity-90">Taxa de Satisfação</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                    <div className="text-sm opacity-90">Suporte Técnico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre com Missão, Visão e Valores */}
      <section id="sobre" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Sobre Nossa Empresa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Construímos nossa reputação através da confiança, inovação e resultados excepcionais para nossos clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Nossa Missão",
                desc: "Fornecer soluções corporativas inovadoras que superem as expectativas dos nossos clientes, sempre com ética e transparência.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Award,
                title: "Nossa Visão", 
                desc: "Ser reconhecida como líder em inovação e excelência no mercado corporativo nacional até 2030.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Shield,
                title: "Nossos Valores",
                desc: "Integridade, compromisso com a qualidade, inovação constante e relacionamentos duradouros com clientes.",
                color: "from-green-500 to-green-600"
              }
            ].map((item, index) => (
              <Card key={index} className="group text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Nossa História</h3>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Fundada em 2009, nossa empresa nasceu da visão de transformar o mercado corporativo brasileiro através da inovação e excelência em serviços. Ao longo dos anos, construímos uma reputação sólida baseada na confiança e resultados excepcionais.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Hoje, somos referência em nosso segmento, atendendo empresas de diversos portes e setores, sempre mantendo nosso compromisso com a qualidade e satisfação do cliente.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                  alt="Nossa empresa" 
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Building className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços com Hover */}
      <section id="servicos" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Nossos Serviços</h2>
            <p className="text-xl text-gray-600">Soluções completas e personalizadas para o seu negócio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Consultoria Estratégica", desc: "Planejamento e estratégia para crescimento sustentável" },
              { title: "Desenvolvimento de Sistemas", desc: "Soluções tecnológicas customizadas para sua empresa" },
              { title: "Gestão de Projetos", desc: "Acompanhamento completo do início ao fim do projeto" },
              { title: "Suporte Técnico", desc: "Assistência especializada 24/7 para sua tranquilidade" },
              { title: "Treinamento Corporativo", desc: "Capacitação da sua equipe com as melhores práticas" },
              { title: "Auditoria e Compliance", desc: "Adequação às normas e regulamentações do setor" }
            ].map((servico, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">{servico.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{servico.desc}</p>
                  <Button 
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full group-hover:scale-105 transition-all duration-300"
                  >
                    Saiba Mais
                  </Button>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Nossa Equipe</h2>
            <p className="text-xl text-gray-600">Profissionais experientes e dedicados ao seu sucesso</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Especialista {i}</h3>
                  <p className="text-blue-600 font-medium mb-3">Cargo Executivo</p>
                  <p className="text-gray-600 text-sm">Especialista com mais de 10 anos de experiência no mercado corporativo.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato com Mapa */}
      <section id="contato" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Entre em Contato</h2>
            <p className="text-xl text-gray-600">Estamos prontos para atender sua empresa</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Fale com Nossos Especialistas</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-600">Av. Paulista, 1000 - São Paulo, SP</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600">(11) 3000-0000</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contato@empresa.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horário</h4>
                    <p className="text-gray-600">Seg-Sex: 8h às 18h</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl shadow-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Falar com Especialista Agora
              </Button>
            </div>

            <Card className="shadow-2xl border-0 bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Solicite um Orçamento</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Nome da empresa" className="rounded-xl border-2 border-gray-200 focus:border-blue-500" />
                    <Input placeholder="Seu nome" className="rounded-xl border-2 border-gray-200 focus:border-blue-500" />
                  </div>
                  <Input placeholder="Email corporativo" type="email" className="rounded-xl border-2 border-gray-200 focus:border-blue-500" />
                  <Input placeholder="Telefone" className="rounded-xl border-2 border-gray-200 focus:border-blue-500" />
                  <textarea 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl min-h-[120px] resize-y focus:border-blue-500 focus:outline-none"
                    placeholder="Descreva seu projeto ou necessidade..."
                  />
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl shadow-lg"
                  >
                    Enviar Solicitação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Corporativo */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{siteData.nomeDoSite}</h4>
              <p className="text-gray-400 mb-4">
                Transformando negócios através da inovação, tecnologia e excelência em serviços há mais de 15 anos.
              </p>
              <p className="text-sm text-gray-500">CNPJ: 00.000.000/0001-00</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Consultoria</li>
                <li className="hover:text-white transition-colors cursor-pointer">Desenvolvimento</li>
                <li className="hover:text-white transition-colors cursor-pointer">Suporte</li>
                <li className="hover:text-white transition-colors cursor-pointer">Treinamento</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Sobre Nós</li>
                <li className="hover:text-white transition-colors cursor-pointer">Nossa Equipe</li>
                <li className="hover:text-white transition-colors cursor-pointer">Carreiras</li>
                <li className="hover:text-white transition-colors cursor-pointer">Certificações</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 Av. Paulista, 1000 - SP</p>
                <p>📞 (11) 3000-0000</p>
                <p>✉️ contato@empresa.com.br</p>
                <div className="flex gap-4 mt-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <span className="text-xs">f</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                    <span className="text-xs">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
