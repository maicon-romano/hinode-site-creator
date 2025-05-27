
export interface FieldSchema {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'color' | 'image' | 'boolean' | 'select';
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: { value: string; label: string; }[];
}

export interface SectionSchema {
  key: string;
  label: string;
  description?: string;
  removable?: boolean;
  fields: FieldSchema[];
}

export interface TemplateSchema {
  id: string;
  name: string;
  type: 'landing' | 'institucional';
  description: string;
  thumbnail: string;
  sections: SectionSchema[];
}

export const templateSchemas: TemplateSchema[] = [
  // Landing Page Templates
  {
    id: 'landing-01',
    name: 'Landing Clássica',
    type: 'landing',
    description: 'Template padrão com hero, benefícios e CTA',
    thumbnail: '/templates/landing-01.jpg',
    sections: [
      {
        key: 'alertaTopo',
        label: 'Alerta no Topo',
        description: 'Barra de aviso configurável',
        removable: true,
        fields: [
          { key: 'ativo', label: 'Exibir Alerta', type: 'boolean' },
          { key: 'texto', label: 'Texto do Alerta', type: 'text', placeholder: '🔥 Últimos dias de promoção!' },
          { key: 'cor', label: 'Cor de Fundo', type: 'color' }
        ]
      },
      {
        key: 'hero',
        label: 'Seção Principal (Hero)',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true, placeholder: 'Transforme sua vida hoje!' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Descubra como nosso produto pode ajudar você' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Fale Conosco' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url', placeholder: 'https://wa.me/5511999999999' },
          { key: 'imagemHero', label: 'Imagem Principal', type: 'image' },
          { key: 'posicao', label: 'Posição do Texto', type: 'select', options: [
            { value: 'left', label: 'Esquerda' },
            { value: 'center', label: 'Centro' },
            { value: 'right', label: 'Direita' }
          ]}
        ]
      },
      {
        key: 'beneficios',
        label: 'Benefícios',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Por que escolher nosso produto?' },
          { key: 'lista', label: 'Lista de Benefícios (um por linha)', type: 'textarea', placeholder: 'Qualidade garantida\nEntrega rápida\nSuporte 24h' }
        ]
      },
      {
        key: 'sobre',
        label: 'Sobre Nós',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Sobre Nossa Empresa' },
          { key: 'texto', label: 'Descrição', type: 'textarea', placeholder: 'Nossa história e missão...' },
          { key: 'imagem', label: 'Imagem da Seção', type: 'image' }
        ]
      },
      {
        key: 'depoimentos',
        label: 'Depoimentos',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'O que nossos clientes dizem' },
          { key: 'lista', label: 'Depoimentos (Nome: Texto; separados por nova linha)', type: 'textarea', placeholder: 'João Silva: Excelente produto!\nMaria Santos: Recomendo muito!' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Entre em Contato' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true, placeholder: '5511999999999' },
          { key: 'telefone', label: 'Telefone', type: 'text', placeholder: '(11) 99999-9999' },
          { key: 'email', label: 'E-mail', type: 'text', placeholder: 'contato@empresa.com' },
          { key: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Rua das Flores, 123' }
        ]
      }
    ]
  },
  {
    id: 'landing-02',
    name: 'Landing com Vídeo',
    type: 'landing',
    description: 'Template focado em vídeo promocional',
    thumbnail: '/templates/landing-02.jpg',
    sections: [
      {
        key: 'alertaTopo',
        label: 'Alerta no Topo',
        removable: true,
        fields: [
          { key: 'ativo', label: 'Exibir Alerta', type: 'boolean' },
          { key: 'texto', label: 'Texto do Alerta', type: 'text', placeholder: '🔥 Oferta especial!' },
          { key: 'cor', label: 'Cor de Fundo', type: 'color' }
        ]
      },
      {
        key: 'hero',
        label: 'Seção Principal',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'videoUrl', label: 'URL do Vídeo (YouTube)', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' }
        ]
      },
      {
        key: 'recursos',
        label: 'Recursos do Produto',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Recursos Incríveis' },
          { key: 'lista', label: 'Lista de Recursos', type: 'textarea' }
        ]
      },
      {
        key: 'cta',
        label: 'Chamada para Ação',
        fields: [
          { key: 'titulo', label: 'Título da CTA', type: 'text', placeholder: 'Pronto para começar?' },
          { key: 'texto', label: 'Texto Motivacional', type: 'textarea' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'email', label: 'E-mail', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'landing-03',
    name: 'Landing Minimalista',
    type: 'landing',
    description: 'Design limpo e focado na conversão',
    thumbnail: '/templates/landing-03.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Seção Principal',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' },
          { key: 'imagemHero', label: 'Imagem Principal', type: 'image' }
        ]
      },
      {
        key: 'caracteristicas',
        label: 'Características',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Principais Características' },
          { key: 'lista', label: 'Lista de Características', type: 'textarea' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'email', label: 'E-mail', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'landing-04',
    name: 'Landing Promocional',
    type: 'landing',
    description: 'Template ideal para promoções e ofertas',
    thumbnail: '/templates/landing-04.jpg',
    sections: [
      {
        key: 'oferta',
        label: 'Oferta Especial',
        fields: [
          { key: 'titulo', label: 'Título da Oferta', type: 'text', required: true },
          { key: 'desconto', label: 'Percentual de Desconto', type: 'text' },
          { key: 'prazo', label: 'Prazo da Oferta', type: 'text' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' }
        ]
      },
      {
        key: 'produto',
        label: 'Sobre o Produto',
        fields: [
          { key: 'titulo', label: 'Nome do Produto', type: 'text' },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'imagem', label: 'Imagem do Produto', type: 'image' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
        ]
      }
    ]
  },
  // Institucional Templates
  {
    id: 'institucional-01',
    name: 'Institucional Clássico',
    type: 'institucional',
    description: 'Template corporativo tradicional',
    thumbnail: '/templates/institucional-01.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Seção Principal',
        fields: [
          { key: 'titulo', label: 'Título da Empresa', type: 'text', required: true },
          { key: 'subtitulo', label: 'Slogan/Descrição', type: 'text' },
          { key: 'imagemHero', label: 'Imagem Principal', type: 'image' }
        ]
      },
      {
        key: 'sobre',
        label: 'Sobre a Empresa',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Sobre Nós' },
          { key: 'historia', label: 'Nossa História', type: 'textarea' },
          { key: 'missao', label: 'Missão', type: 'textarea' },
          { key: 'visao', label: 'Visão', type: 'textarea' },
          { key: 'valores', label: 'Valores', type: 'textarea' }
        ]
      },
      {
        key: 'servicos',
        label: 'Serviços',
        fields: [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Nossos Serviços' },
          { key: 'lista', label: 'Lista de Serviços', type: 'textarea' },
          { key: 'descricao', label: 'Descrição Geral', type: 'textarea' }
        ]
      },
      {
        key: 'equipe',
        label: 'Nossa Equipe',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Nossa Equipe' },
          { key: 'texto', label: 'Descrição da Equipe', type: 'textarea' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'endereco', label: 'Endereço', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'email', label: 'E-mail', type: 'text' },
          { key: 'horarioFuncionamento', label: 'Horário de Funcionamento', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'institucional-02',
    name: 'Institucional Moderno',
    type: 'institucional',
    description: 'Template com design contemporâneo',
    thumbnail: '/templates/institucional-02.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Seção Principal',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'imagemFundo', label: 'Imagem de Fundo', type: 'image' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text' },
          { key: 'botaoLink', label: 'Link do Botão', type: 'url' }
        ]
      },
      {
        key: 'numeros',
        label: 'Números da Empresa',
        removable: true,
        fields: [
          { key: 'anosAtuacao', label: 'Anos de Atuação', type: 'text' },
          { key: 'clientesAtendidos', label: 'Clientes Atendidos', type: 'text' },
          { key: 'projetosRealizados', label: 'Projetos Realizados', type: 'text' },
          { key: 'premios', label: 'Prêmios Recebidos', type: 'text' }
        ]
      },
      {
        key: 'diferenciais',
        label: 'Nossos Diferenciais',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'lista', label: 'Lista de Diferenciais', type: 'textarea' }
        ]
      },
      {
        key: 'portfolio',
        label: 'Portfólio',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Nossos Trabalhos' },
          { key: 'descricao', label: 'Descrição', type: 'textarea' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'email', label: 'E-mail', type: 'text' },
          { key: 'linkedin', label: 'LinkedIn', type: 'url' },
          { key: 'instagram', label: 'Instagram', type: 'url' }
        ]
      }
    ]
  },
  {
    id: 'institucional-03',
    name: 'Institucional Criativo',
    type: 'institucional',
    description: 'Design diferenciado para empresas inovadoras',
    thumbnail: '/templates/institucional-03.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Seção Principal',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text' },
          { key: 'imagemHero', label: 'Imagem Principal', type: 'image' }
        ]
      },
      {
        key: 'inovacao',
        label: 'Inovação',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Nossa Inovação' },
          { key: 'descricao', label: 'Descrição', type: 'textarea' }
        ]
      },
      {
        key: 'projetos',
        label: 'Projetos Especiais',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'lista', label: 'Lista de Projetos', type: 'textarea' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'email', label: 'E-mail', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'institucional-04',
    name: 'Institucional Profissional',
    type: 'institucional',
    description: 'Template sóbrio para empresas tradicionais',
    thumbnail: '/templates/institucional-04.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Apresentação',
        fields: [
          { key: 'titulo', label: 'Nome da Empresa', type: 'text', required: true },
          { key: 'area', label: 'Área de Atuação', type: 'text' },
          { key: 'experiencia', label: 'Tempo de Experiência', type: 'text' }
        ]
      },
      {
        key: 'competencias',
        label: 'Competências',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Nossas Competências' },
          { key: 'lista', label: 'Lista de Competências', type: 'textarea' }
        ]
      },
      {
        key: 'certificacoes',
        label: 'Certificações',
        removable: true,
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'lista', label: 'Lista de Certificações', type: 'textarea' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'endereco', label: 'Endereço', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' }
        ]
      }
    ]
  }
];

export const getTemplateSchema = (templateId: string): TemplateSchema | null => {
  return templateSchemas.find(template => template.id === templateId) || null;
};

export const getTemplatesByType = (type: 'landing' | 'institucional'): TemplateSchema[] => {
  return templateSchemas.filter(template => template.type === type);
};
