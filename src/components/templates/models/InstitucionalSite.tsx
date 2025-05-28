
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Building, Users, Award, Target, CheckCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Institucional */}
      <section className="relative py-32 px-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          {siteData.logoPath && (
            <img src={siteData.logoPath} alt="Logo" className="h-20 w-auto mx-auto mb-8" />
          )}
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            {siteData.hero?.titulo || siteData.nomeDoSite}
          </h1>
          
          <p className="text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto mb-8">
            {siteData.hero?.slogan || 'Excelência em serviços corporativos há mais de uma década'}
          </p>
          
          <div className="flex items-center justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span>{siteData.hero?.anos || '10'}+ anos no mercado</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <span>Certificado ISO 9001</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Empresa */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Nossa História</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                {siteData.sobre?.titulo || 'Sobre Nossa Empresa'}
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700">
                <p>{siteData.sobre?.historia || 'Fundada com o propósito de transformar o mercado corporativo, nossa empresa se estabeleceu como referência em inovação e qualidade.'}</p>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-blue-900 mb-2">Nossa Missão</h3>
                  <p className="text-blue-800">{siteData.sobre?.missao || 'Fornecer soluções corporativas inovadoras que superem as expectativas dos nossos clientes.'}</p>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="font-bold text-indigo-900 mb-2">Nossa Visão</h3>
                  <p className="text-indigo-800">{siteData.sobre?.visao || 'Ser reconhecida como líder em inovação e excelência no mercado corporativo nacional.'}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {siteData.hero?.imagemCorporativa ? (
                <img src={siteData.hero.imagemCorporativa} alt="Empresa" className="w-full rounded-2xl shadow-2xl" />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Building className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <span className="text-gray-600 text-lg">Imagem Corporativa</span>
                  </div>
                </div>
              )}
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Award className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Números da Empresa */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Nossos Números</h2>
            <p className="text-xl opacity-90">Resultados que comprovam nossa excelência</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold mb-2">{siteData.numeros?.clientes || '500+'}</div>
              <div className="text-lg opacity-90">Clientes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold mb-2">{siteData.numeros?.projetos || '1200+'}</div>
              <div className="text-lg opacity-90">Projetos Entregues</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold mb-2">{siteData.numeros?.satisfacao || '98%'}</div>
              <div className="text-lg opacity-90">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              {siteData.servicos?.titulo || 'Nossos Serviços'}
            </h2>
            <p className="text-xl text-gray-600">Soluções completas para o seu negócio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.servicos?.lista ? 
              siteData.servicos.lista.split('\n').filter((item: string) => item.trim()).map((servico: string, index: number) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{servico}</h3>
                    <p className="text-gray-600 mb-6">Solução profissional com qualidade garantida</p>
                    <Button 
                      onClick={handleWhatsAppClick}
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                    >
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              )) : 
              [1, 2, 3, 4].map((i) => (
                <Card key={i} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Serviço {i}</h3>
                    <p className="text-gray-600 mb-6">Descrição do serviço profissional</p>
                    <Button 
                      onClick={handleWhatsAppClick}
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                    >
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">Entre em Contato</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-600">{siteData.contato?.endereco || 'Av. Paulista, 1000 - São Paulo, SP'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600">{siteData.contato?.telefone || '(11) 3000-0000'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{siteData.contato?.email || 'contato@empresa.com.br'}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg"
              >
                Falar com Especialista
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Solicite um Orçamento</h3>
                <div className="space-y-4">
                  <Input placeholder="Nome da empresa" />
                  <Input placeholder="Seu nome" />
                  <Input placeholder="Email corporativo" type="email" />
                  <Input placeholder="Telefone" />
                  <textarea 
                    className="w-full p-3 border rounded-md min-h-[120px] resize-y"
                    placeholder="Descreva seu projeto..."
                  />
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Enviar Solicitação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{siteData.nomeDoSite}</h4>
              <p className="text-gray-400">Transformando negócios através da inovação e excelência.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Consultoria</li>
                <li>Desenvolvimento</li>
                <li>Suporte</li>
                <li>Treinamento</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nós</li>
                <li>Nossa Equipe</li>
                <li>Carreiras</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>{siteData.contato?.telefone || '(11) 3000-0000'}</p>
                <p>{siteData.contato?.email || 'contato@empresa.com.br'}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 {siteData.nomeDoSite}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
