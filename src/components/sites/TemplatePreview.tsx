
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { DynamicSiteRenderer } from '@/components/templates/DynamicSiteRenderer';

interface TemplatePreviewProps {
  siteData: any;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  siteData,
  showPreview,
  onTogglePreview
}) => {
  const createPreviewData = (templateId: string) => {
    console.log('Criando preview data ESPECÍFICO para template:', templateId);
    
    const baseData = {
      templateId,
      nomeDoSite: siteData.nomeDoSite || 'Preview Site',
      logoPath: siteData.logoPath || '',
      cores: {
        principal: siteData.cores?.principal || '#0066cc',
        fundo: siteData.cores?.fundo || '#ffffff',
        destaque: siteData.cores?.destaque || '#ff6b35',
        texto: siteData.cores?.texto || '#333333',
      },
      whatsapp: '5511999999999',
      clientId: 'preview',
      ...siteData
    };

    // DADOS COMPLETAMENTE ESPECÍFICOS PARA CADA TEMPLATE
    switch (templateId) {
      case 'institucional-corporate':
        return {
          ...baseData,
          hero: {
            titulo: baseData.nomeDoSite || 'Empresa Corporativa Ltda',
            slogan: 'Excelência em Soluções Corporativas',
            anos: '15',
            imagemCorporativa: '',
          },
          sobre: {
            historia: 'Fundada em 2009, nossa empresa tem se destacado como líder em soluções corporativas inovadoras.',
            missao: 'Fornecer soluções de alta qualidade que superem as expectativas dos nossos clientes.',
            visao: 'Ser reconhecida como líder em inovação e qualidade no mercado corporativo.'
          },
          servicos: {
            titulo: 'Nossos Serviços Corporativos',
            lista: 'Consultoria Estratégica\nDesenvolvimento de Software\nMarketing Digital\nTreinamento Corporativo'
          },
          numeros: {
            clientes: '500+',
            projetos: '1200+',
            satisfacao: '98%'
          },
          contato: {
            endereco: 'Av. Paulista, 1000 - São Paulo',
            telefone: '(11) 3000-0000',
            email: 'contato@empresa.com.br',
            whatsapp: '5511999999999'
          }
        };

      case 'hinode-premium':
        return {
          ...baseData,
          'hero-hinode': {
            titulo: 'Seja um Representante Hinode Premium',
            subtitulo: 'Transforme sua vida com perfumes de luxo',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            botaoTexto: 'Quero ser Representante',
            imagem: '',
          },
          'sobre-negocio': {
            titulo: 'Sobre a Hinode',
            texto: 'A Hinode é líder em cosméticos e perfumaria no Brasil, oferecendo produtos de alta qualidade e oportunidade de negócio única.',
            botaoTexto: 'Conhecer Mais',
            imagem: ''
          },
          'biografia-representante': {
            nome: 'Ana Beatriz Silva',
            titulo: 'Consultora de Beleza Hinode',
            texto: 'Sou consultora Hinode há 5 anos e amo poder transformar a vida das pessoas através da beleza e da oportunidade de negócio.',
            experiencia: '5 anos',
            botaoTexto: 'Falar Comigo',
            foto: ''
          },
          'produtos-hinode': {
            titulo: 'Nossos Produtos Hinode',
            subtitulo: 'Linha completa de beleza e cuidados',
            produtos: 'Perfumes Importados - Fragrâncias exclusivas e marcantes\nMaquiagem Premium - Beleza que dura o dia todo\nCuidados com a Pele - Produtos naturais e eficazes'
          },
          'contato-hinode': {
            titulo: 'Entre em Contato',
            subtitulo: 'Tire suas dúvidas ou faça seu pedido',
            whatsapp: '5511999999999',
            mostrarFormulario: true
          },
          'rodape-hinode': {
            texto: 'Consultora Hinode - Transformando vidas através da beleza',
            ano: '2024'
          }
        };

      case 'landing-premium':
        return {
          ...baseData,
          hero: {
            titulo: 'Transforme Seus Sonhos em Realidade Premium',
            subtitulo: 'Experiência digital de luxo com tecnologia de ponta',
            botaoTexto: 'Começar Agora',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imagemHero: '',
          },
          beneficios: {
            titulo: 'Benefícios Exclusivos',
            lista: 'Design Premium\nTecnologia Avançada\nSuporte VIP\nResultados Garantidos'
          },
          contato: {
            titulo: 'Vamos Conversar?',
            whatsapp: '5511999999999'
          }
        };

      case 'landing-conversion':
        return {
          ...baseData,
          urgencia: {
            texto: '🔥 Oferta termina em 24h!',
            ativo: true
          },
          hero: {
            titulo: 'Aumente Suas Vendas em 300%',
            subtitulo: 'Sistema comprovado usado por +10.000 empresas',
            garantia: '30 dias ou seu dinheiro de volta'
          },
          'social-proof': {
            titulo: 'Mais de 50.000 Clientes Satisfeitos',
            numero: '50.000+'
          },
          contato: {
            titulo: 'Quero Aumentar Minhas Vendas Agora!',
            whatsapp: '5511999999999'
          }
        };

      case 'institucional-corporate':
        return {
          ...baseData,
          hero: {
            titulo: 'Sua Empresa do Futuro',
            slogan: 'Inovação que transforma o futuro dos negócios',
            anos: '15',
            imagemCorporativa: ''
          },
          sobre: {
            historia: 'Fundada em 2009, somos líderes em soluções empresariais inovadoras.',
            missao: 'Nossa missão é transformar negócios através da tecnologia.',
            visao: 'Nossa visão é ser referência mundial em inovação corporativa.'
          },
          servicos: {
            titulo: 'Nossos Serviços',
            lista: 'Consultoria Estratégica\nDesenvolvimento de Software\nMarketing Digital\nTreinamento Corporativo'
          },
          numeros: {
            clientes: '500+',
            projetos: '1000+',
            satisfacao: '98%'
          },
          contato: {
            endereco: 'Av. Paulista, 1000 - São Paulo',
            telefone: '(11) 3000-0000',
            email: 'contato@empresa.com.br',
            whatsapp: '5511999999999'
          }
        };

      case 'portfolio-creative':
        return {
          ...baseData,
          hero: {
            nome: 'João Silva',
            profissao: 'Designer Gráfico & Fotógrafo',
            descricao: 'Transformo ideias em experiências visuais memoráveis',
            foto: ''
          },
          sobre: {
            biografia: 'Sou um profissional apaixonado por design e fotografia há mais de 8 anos.',
            experiencia: '8',
            especializacao: 'Branding & Design Digital'
          },
          habilidades: {
            lista: 'Photoshop - 95%\nIllustrator - 90%\nFigma - 85%\nFotografia - 80%'
          },
          portfolio: {
            titulo: 'Meus Trabalhos',
            descricao: 'Alguns dos meus projetos mais recentes'
          },
          contato: {
            titulo: 'Vamos Trabalhar Juntos?',
            email: 'joao@designer.com',
            whatsapp: '5511999999999',
            instagram: 'https://instagram.com/joaodesigner'
          }
        };

      case 'portfolio-developer':
        return {
          ...baseData,
          hero: {
            nome: 'Maria Santos',
            titulo: 'Full Stack Developer',
            especializacao: 'React • Node.js • TypeScript',
            github: 'https://github.com/mariasantos'
          },
          tecnologias: {
            frontend: 'React, Vue, Angular',
            backend: 'Node.js, Python, PHP',
            database: 'MongoDB, PostgreSQL, MySQL',
            cloud: 'AWS, Docker, Kubernetes'
          },
          projetos: {
            titulo: 'Projetos em Destaque',
            quantidade: '50+'
          },
          contato: {
            email: 'maria@dev.com',
            linkedin: 'https://linkedin.com/in/mariasantos',
            whatsapp: '5511999999999'
          }
        };

      case 'hinode-premium':
        return {
          ...baseData,
          'hero-hinode': {
            titulo: 'Seja um Representante Hinode Premium',
            subtitulo: 'Transforme sua vida com perfumes de luxo',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            botaoTexto: 'Quero ser Representante',
            imagem: '',
          },
          'sobre-negocio': {
            titulo: 'Sobre a Hinode',
            texto: 'A Hinode é líder em cosméticos e perfumaria no Brasil, oferecendo produtos de alta qualidade e oportunidade de negócio única.',
            botaoTexto: 'Conhecer Mais',
            imagem: ''
          },
          'biografia-representante': {
            nome: 'Ana Beatriz Silva',
            titulo: 'Consultora de Beleza Hinode',
            texto: 'Sou consultora Hinode há 5 anos e amo poder transformar a vida das pessoas através da beleza e da oportunidade de negócio.',
            experiencia: '5 anos',
            botaoTexto: 'Falar Comigo',
            foto: ''
          },
          'produtos-hinode': {
            titulo: 'Nossos Produtos',
            subtitulo: 'Linha completa de beleza e cuidados',
            produtos: 'Perfumes Importados - Fragrâncias exclusivas e marcantes\nMaquiagem Premium - Beleza que dura o dia todo\nCuidados com a Pele - Produtos naturais e eficazes'
          },
          'contato-hinode': {
            titulo: 'Entre em Contato',
            subtitulo: 'Tire suas dúvidas ou faça seu pedido',
            whatsapp: '5511999999999',
            mostrarFormulario: true
          },
          'rodape-hinode': {
            texto: 'Consultora Hinode - Transformando vidas através da beleza',
            ano: '2024'
          }
        };

      case 'hinode-landing':
        return {
          ...baseData,
          'hero-hinode': {
            titulo: 'Descubra o Mundo Hinode',
            subtitulo: 'Perfumes e cosméticos de qualidade internacional',
            botaoTexto: 'Conhecer Produtos',
          },
          'produtos-destaque': {
            titulo: 'Produtos em Destaque',
            lista: 'Perfumes Importados\nCosméticos Premium\nCuidados Pessoais\nProdutos Naturais'
          },
          contato: {
            whatsapp: '5511999999999'
          }
        };

      default:
        return {
          ...baseData,
          hero: {
            titulo: 'Bem-vindo ao ' + (baseData.nomeDoSite || 'Nosso Site'),
            subtitulo: 'Template padrão com design moderno',
            botaoTexto: 'Saiba Mais',
          }
        };
    }
  };

  const templateId = siteData.templateId || siteData.modelId || 'landing-premium';
  const previewData = createPreviewData(templateId);

  console.log('TemplatePreview - Template selecionado:', templateId);
  console.log('TemplatePreview - Dados ESPECÍFICOS do preview:', previewData);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview do Site</h3>
        <Button
          type="button"
          variant="outline"
          onClick={onTogglePreview}
          className="flex items-center gap-2"
        >
          {showPreview ? (
            <>
              <EyeOff className="h-4 w-4" />
              Ocultar Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Mostrar Preview
            </>
          )}
        </Button>
      </div>

      {showPreview && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center justify-between">
              <span>Preview Específico - {templateId}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {templateId}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[600px] overflow-hidden bg-white border rounded">
              <div className="transform scale-[0.3] origin-top-left w-[333.33%] h-[333.33%] overflow-auto">
                <DynamicSiteRenderer 
                  key={`preview-${templateId}-${Date.now()}`}
                  siteData={previewData} 
                  isPreview={true} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!showPreview && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Clique em "Mostrar Preview" para visualizar seu site</p>
              <p className="text-xs mt-2 text-gray-400">
                Template específico: {templateId}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
