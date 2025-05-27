
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
  // Dados padrão para preview quando não há dados suficientes
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
    activeSections: siteData.activeSections || ['hero', 'contato'],
    // Hero padrão
    hero: {
      titulo: siteData.hero?.titulo || siteData.nomeDoSite || 'Seu Site Incrível',
      subtitulo: siteData.hero?.subtitulo || 'Transforme sua presença digital hoje mesmo',
      botaoTexto: siteData.hero?.botaoTexto || 'Fale Conosco',
      botaoLink: siteData.hero?.botaoLink || 'https://wa.me/5511999999999',
      imagemHero: siteData.hero?.imagemHero || '',
      posicao: siteData.hero?.posicao || 'center',
      videoUrl: siteData.hero?.videoUrl || ''
    },
    // Contato padrão
    contato: {
      titulo: siteData.contato?.titulo || 'Entre em Contato',
      whatsapp: siteData.contato?.whatsapp || '5511999999999',
      telefone: siteData.contato?.telefone || '(11) 99999-9999',
      email: siteData.contato?.email || 'contato@exemplo.com',
      endereco: siteData.contato?.endereco || 'São Paulo, SP'
    },
    // Outras seções com dados padrão
    sobre: siteData.sobre || {
      titulo: 'Sobre Nós',
      texto: 'Somos uma empresa dedicada a oferecer os melhores serviços.',
      imagem: ''
    },
    beneficios: siteData.beneficios || {
      titulo: 'Por que escolher nosso serviço?',
      lista: 'Qualidade garantida\nEntrega rápida\nSuporte 24h'
    },
    servicos: siteData.servicos || {
      titulo: 'Nossos Serviços',
      lista: 'Consultoria\nDesenvolvimento\nSuporte',
      descricao: 'Oferecemos soluções completas para seu negócio.'
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
        <Card className="max-h-[800px] overflow-y-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center justify-between">
              <span>Preview - {previewData.templateId}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Visualização
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%] overflow-hidden border-t">
              <DynamicSiteRenderer siteData={previewData} isPreview={true} />
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
