
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
  // Criar dados específicos baseados no templateId/modelId selecionado
  const createPreviewData = (templateId: string) => {
    const baseData = {
      templateId,
      modelId: templateId,
      nomeDoSite: siteData.nomeDoSite || 'Preview Site',
      logoPath: siteData.logoPath || '',
      cores: {
        principal: siteData.cores?.principal || '#0066cc',
        fundo: siteData.cores?.fundo || '#ffffff',
        destaque: siteData.cores?.destaque || '#ff6b35',
        texto: siteData.cores?.texto || '#333333',
      },
      whatsapp: '5511999999999',
      ...siteData
    };

    // Configurar dados específicos para cada template
    switch (templateId) {
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
            titulo: 'Contato Premium',
            whatsapp: '5511999999999'
          }
        };

      case 'landing-conversion':
        return {
          ...baseData,
          hero: {
            titulo: 'Maximize Suas Conversões Agora',
            subtitulo: 'Landing page otimizada para resultados excepcionais',
            botaoTexto: 'Converter Agora',
            imagemHero: '',
          },
          beneficios: {
            titulo: 'Por Que Converter Conosco?',
            lista: 'Alta Conversão\nOtimização A/B\nAnalytics Avançado\nSupporte 24/7'
          }
        };

      case 'institucional-corporate':
        return {
          ...baseData,
          hero: {
            titulo: 'Sua Empresa do Futuro',
            subtitulo: 'Soluções corporativas de excelência',
            botaoTexto: 'Conhecer Mais',
            imagemHero: '',
          },
          sobre: {
            titulo: 'Sobre Nossa Empresa',
            texto: 'Líder em soluções empresariais inovadoras',
          },
          servicos: {
            titulo: 'Nossos Serviços',
            lista: 'Consultoria Empresarial\nSoluções Digitais\nSupporte Técnico\nTreinamentos'
          }
        };

      case 'institucional-premium':
        return {
          ...baseData,
          hero: {
            titulo: 'Excelência Institucional',
            subtitulo: 'Tradição e inovação em perfeita harmonia',
            botaoTexto: 'Descobrir Mais',
            imagemHero: '',
          },
          sobre: {
            titulo: 'Nossa História',
            texto: 'Décadas de experiência e compromisso com a qualidade',
          }
        };

      case 'portfolio-creative':
        return {
          ...baseData,
          'apresentacao-pessoal': {
            titulo: 'Criatividade em Ação',
            subtitulo: 'Designer & Desenvolvedor Criativo',
            texto: 'Transformo ideias em experiências digitais únicas',
            botaoTexto: 'Ver Portfolio',
            imagem: '',
          },
          projetos: {
            titulo: 'Projetos Criativos',
            cards: [
              { id: 1, titulo: 'App Mobile', texto: 'Design inovador', ordem: 1 },
              { id: 2, titulo: 'Website', texto: 'UX/UI moderno', ordem: 2 },
              { id: 3, titulo: 'Branding', texto: 'Identidade visual', ordem: 3 }
            ]
          }
        };

      case 'portfolio-developer':
        return {
          ...baseData,
          'apresentacao-pessoal': {
            titulo: 'Desenvolvedor Full Stack',
            subtitulo: 'Código Limpo & Soluções Eficientes',
            texto: 'Especialista em criar aplicações web modernas e escaláveis',
            botaoTexto: 'Ver Projetos',
            imagem: '',
          },
          habilidades: {
            titulo: 'Tecnologias',
            lista: 'React & TypeScript\nNode.js & Express\nPython & Django\nAWS & Docker'
          }
        };

      case 'hinode-premium':
        return {
          ...baseData,
          'hero-hinode': {
            titulo: 'Seja um Representante Hinode Premium',
            subtitulo: 'Transforme sua vida com perfumes de luxo',
            texto: 'Junte-se à família Hinode e construa seu próprio negócio',
            botaoTexto: 'Quero ser Representante',
            video: '',
            imagem: '',
          },
          'sobre-hinode': {
            titulo: 'Hinode Premium',
            subtitulo: 'Excelência em Perfumaria',
            texto: 'A Hinode é líder em cosméticos e perfumaria no Brasil, oferecendo produtos de alta qualidade e oportunidade de negócio única.'
          },
          'produtos-destaque': {
            titulo: 'Perfumes Premium',
            subtitulo: 'Fragrâncias exclusivas',
            descricao: 'Linha completa de perfumes importados e nacionais'
          }
        };

      case 'hinode-landing':
        return {
          ...baseData,
          'hero-hinode': {
            titulo: 'Descubra o Mundo Hinode',
            subtitulo: 'Perfumes e cosméticos de qualidade internacional',
            texto: 'Produtos que encantam e oportunidade que transforma vidas',
            botaoTexto: 'Conhecer Produtos',
            video: '',
            imagem: '',
          },
          'produtos-destaque': {
            titulo: 'Produtos em Destaque',
            lista: 'Perfumes Importados\nCosméticos Premium\nCuidados Pessoais\nProdutos Naturais'
          }
        };

      default:
        return {
          ...baseData,
          hero: {
            titulo: 'Bem-vindo ao ' + (baseData.nomeDoSite || 'Nosso Site'),
            subtitulo: 'Template padrão com design moderno',
            botaoTexto: 'Saiba Mais',
            imagemHero: '',
          },
          sobre: {
            titulo: 'Sobre Nós',
            texto: 'Conheça mais sobre nossos serviços e história',
          }
        };
    }
  };

  const templateId = siteData.templateId || siteData.modelId || 'landing-01';
  const previewData = createPreviewData(templateId);

  console.log('TemplatePreview - Template selecionado:', templateId);
  console.log('TemplatePreview - Dados do preview:', previewData);

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
              <span>Preview - {templateId}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {templateId}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[600px] overflow-hidden bg-white border rounded">
              <div className="transform scale-[0.3] origin-top-left w-[333.33%] h-[333.33%] overflow-auto">
                <DynamicSiteRenderer siteData={previewData} isPreview={true} />
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
                Template: {templateId}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
