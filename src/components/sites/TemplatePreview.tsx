
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
  // Dados padrão mais completos para preview
  const previewData = {
    templateId: siteData.templateId || 'landing-01',
    nomeDoSite: siteData.nomeDoSite || 'Exemplo Site',
    logoPath: siteData.logoPath || '',
    cores: {
      principal: siteData.cores?.principal || '#ff6b35',
      fundo: siteData.cores?.fundo || '#ffffff',
      destaque: siteData.cores?.destaque || '#0066cc',
      texto: siteData.cores?.texto || '#333333',
    },
    activeSections: siteData.activeSections || ['hero', 'beneficios', 'sobre', 'contato'],
    // Hero com dados de exemplo
    hero: {
      titulo: siteData.hero?.titulo || 'Transforme Sua Presença Digital',
      subtitulo: siteData.hero?.subtitulo || 'Crie sites profissionais com nossa plataforma inovadora',
      botaoTexto: siteData.hero?.botaoTexto || 'Fale Conosco',
      botaoLink: siteData.hero?.botaoLink || 'https://wa.me/5511999999999',
      imagemHero: siteData.hero?.imagemHero || '',
      posicao: siteData.hero?.posicao || 'center',
      videoUrl: siteData.hero?.videoUrl || ''
    },
    // Benefícios com dados de exemplo
    beneficios: {
      titulo: siteData.beneficios?.titulo || 'Por que escolher nossos serviços?',
      lista: siteData.beneficios?.lista || 'Design Profissional\nSuper Rápido\nSuporte 24/7\nPreço Justo'
    },
    // Sobre com dados de exemplo
    sobre: {
      titulo: siteData.sobre?.titulo || 'Sobre Nossa Empresa',
      texto: siteData.sobre?.texto || 'Somos especialistas em criar experiências digitais excepcionais. Nossa equipe combina criatividade e tecnologia para entregar resultados que superam expectativas.',
      imagem: siteData.sobre?.imagem || ''
    },
    // Contato com dados de exemplo
    contato: {
      titulo: siteData.contato?.titulo || 'Entre em Contato',
      whatsapp: siteData.contato?.whatsapp || '5511999999999',
      telefone: siteData.contato?.telefone || '(11) 99999-9999',
      email: siteData.contato?.email || 'contato@exemplo.com',
      endereco: siteData.contato?.endereco || 'São Paulo, SP'
    },
    // Serviços para templates institucionais
    servicos: {
      titulo: siteData.servicos?.titulo || 'Nossos Serviços',
      lista: siteData.servicos?.lista || 'Desenvolvimento Web\nDesign Digital\nConsultoria\nSuporte Técnico',
      descricao: siteData.servicos?.descricao || 'Oferecemos soluções completas para transformar sua presença digital.'
    },
    // Dados específicos para outros templates
    recursos: {
      titulo: 'Recursos Incríveis',
      lista: 'Interface Intuitiva\nTecnologia Avançada\nSegurança Garantida'
    },
    cta: {
      titulo: 'Pronto para começar?',
      texto: 'Junte-se a milhares de clientes satisfeitos',
      botaoTexto: 'Começar Agora',
      botaoLink: 'https://wa.me/5511999999999'
    },
    caracteristicas: {
      titulo: 'Principais Características',
      lista: 'Responsivo\nOtimizado\nModerno'
    },
    depoimentos: {
      titulo: 'O que nossos clientes dizem',
      lista: 'João Silva: Excelente serviço!\nMaria Santos: Superou minhas expectativas!\nPedro Costa: Muito profissional!'
    },
    ...siteData
  };

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
              <span>Preview - {previewData.templateId}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Visualização
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
                Template: {previewData.templateId}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
