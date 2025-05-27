
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
  type: 'landing' | 'institucional' | 'portfolio' | 'hinode';
  description: string;
  thumbnail: string;
  sections: SectionSchema[];
}

export const templateSchemas: TemplateSchema[] = [
  // Landing Page Templates - Moderno e Dinâmico
  {
    id: 'landing-premium',
    name: 'Landing Premium Moderna',
    type: 'landing',
    description: 'Template premium com animações 3D, glassmorphism e design futurista',
    thumbnail: '/templates/landing-premium.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Hero Section',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true, placeholder: 'Transforme Seus Sonhos em Realidade' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Descubra o futuro dos negócios digitais' },
          { key: 'videoUrl', label: 'URL do Vídeo', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Começar Agora' },
          { key: 'imagemHero', label: 'Imagem Hero', type: 'image' }
        ]
      },
      {
        key: 'beneficios',
        label: 'Benefícios Premium',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Por Que Nos Escolher?' },
          { key: 'lista', label: 'Lista de Benefícios', type: 'textarea', placeholder: 'Tecnologia Avançada\nResultados Garantidos\nSupporte 24/7' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Vamos Conversar?' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true, placeholder: '5511999999999' }
        ]
      }
    ]
  },
  {
    id: 'landing-conversion',
    name: 'Landing de Alta Conversão',
    type: 'landing',
    description: 'Focada em conversão com elementos psicológicos e urgência',
    thumbnail: '/templates/landing-conversion.jpg',
    sections: [
      {
        key: 'urgencia',
        label: 'Barra de Urgência',
        fields: [
          { key: 'texto', label: 'Texto de Urgência', type: 'text', placeholder: '🔥 Oferta termina em 24h!' },
          { key: 'ativo', label: 'Exibir Urgência', type: 'boolean' }
        ]
      },
      {
        key: 'hero',
        label: 'Proposta de Valor',
        fields: [
          { key: 'titulo', label: 'Título Impactante', type: 'text', required: true, placeholder: 'Aumente Suas Vendas em 300%' },
          { key: 'subtitulo', label: 'Benefício Principal', type: 'text', placeholder: 'Sistema comprovado usado por +10.000 empresas' },
          { key: 'garantia', label: 'Garantia', type: 'text', placeholder: '30 dias ou seu dinheiro de volta' }
        ]
      },
      {
        key: 'social-proof',
        label: 'Prova Social',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Mais de 50.000 Clientes Satisfeitos' },
          { key: 'numero', label: 'Número Impactante', type: 'text', placeholder: '50.000+' }
        ]
      },
      {
        key: 'contato',
        label: 'Call to Action',
        fields: [
          { key: 'titulo', label: 'CTA Principal', type: 'text', placeholder: 'Quero Aumentar Minhas Vendas Agora!' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
        ]
      }
    ]
  },

  // Site Institucional - Corporativo e Elegante
  {
    id: 'institucional-corporate',
    name: 'Corporativo Premium',
    type: 'institucional',
    description: 'Design corporativo elegante com animações sutis e layout profissional',
    thumbnail: '/templates/institucional-corporate.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Apresentação Empresarial',
        fields: [
          { key: 'titulo', label: 'Nome da Empresa', type: 'text', required: true, placeholder: 'Sua Empresa S.A.' },
          { key: 'slogan', label: 'Slogan', type: 'text', placeholder: 'Inovação que transforma o futuro' },
          { key: 'anos', label: 'Anos de Mercado', type: 'text', placeholder: '15' },
          { key: 'imagemCorporativa', label: 'Imagem Corporativa', type: 'image' }
        ]
      },
      {
        key: 'sobre',
        label: 'Sobre a Empresa',
        fields: [
          { key: 'historia', label: 'Nossa História', type: 'textarea', placeholder: 'Fundada em 2009...' },
          { key: 'missao', label: 'Missão', type: 'textarea', placeholder: 'Nossa missão é...' },
          { key: 'visao', label: 'Visão', type: 'textarea', placeholder: 'Nossa visão é...' }
        ]
      },
      {
        key: 'servicos',
        label: 'Serviços',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Nossos Serviços' },
          { key: 'lista', label: 'Lista de Serviços', type: 'textarea', placeholder: 'Consultoria Estratégica\nDesenvolvimento de Software\nMarketing Digital' }
        ]
      },
      {
        key: 'numeros',
        label: 'Números da Empresa',
        fields: [
          { key: 'clientes', label: 'Número de Clientes', type: 'text', placeholder: '500+' },
          { key: 'projetos', label: 'Projetos Realizados', type: 'text', placeholder: '1000+' },
          { key: 'satisfacao', label: '% Satisfação', type: 'text', placeholder: '98%' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato Empresarial',
        fields: [
          { key: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Av. Paulista, 1000 - São Paulo' },
          { key: 'telefone', label: 'Telefone', type: 'text', placeholder: '(11) 3000-0000' },
          { key: 'email', label: 'Email', type: 'text', placeholder: 'contato@empresa.com.br' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
        ]
      }
    ]
  },

  // Portfólio - Criativo e Visual
  {
    id: 'portfolio-creative',
    name: 'Portfólio Criativo',
    type: 'portfolio',
    description: 'Design criativo para profissionais de design, fotografia e artes',
    thumbnail: '/templates/portfolio-creative.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Apresentação Pessoal',
        fields: [
          { key: 'nome', label: 'Seu Nome', type: 'text', required: true, placeholder: 'João Silva' },
          { key: 'profissao', label: 'Profissão', type: 'text', placeholder: 'Designer Gráfico & Fotógrafo' },
          { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Transformo ideias em experiências visuais memoráveis' },
          { key: 'foto', label: 'Sua Foto', type: 'image' }
        ]
      },
      {
        key: 'sobre',
        label: 'Sobre Mim',
        fields: [
          { key: 'biografia', label: 'Biografia', type: 'textarea', placeholder: 'Sou um profissional apaixonado por...' },
          { key: 'experiencia', label: 'Anos de Experiência', type: 'text', placeholder: '8' },
          { key: 'especializacao', label: 'Especialização', type: 'text', placeholder: 'Branding & Design Digital' }
        ]
      },
      {
        key: 'habilidades',
        label: 'Habilidades',
        fields: [
          { key: 'lista', label: 'Lista de Habilidades', type: 'textarea', placeholder: 'Photoshop - 95%\nIllustrator - 90%\nFigma - 85%\nFotografia - 80%' }
        ]
      },
      {
        key: 'portfolio',
        label: 'Trabalhos',
        fields: [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Meus Trabalhos' },
          { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Alguns dos meus projetos mais recentes' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Vamos Trabalhar Juntos?' },
          { key: 'email', label: 'Email', type: 'text', placeholder: 'joao@designer.com' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
          { key: 'instagram', label: 'Instagram', type: 'url', placeholder: 'https://instagram.com/seuuser' }
        ]
      }
    ]
  },
  {
    id: 'portfolio-developer',
    name: 'Portfólio Developer',
    type: 'portfolio',
    description: 'Template técnico para desenvolvedores com tema cyberpunk',
    thumbnail: '/templates/portfolio-developer.jpg',
    sections: [
      {
        key: 'hero',
        label: 'Perfil Developer',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true, placeholder: 'Maria Santos' },
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Full Stack Developer' },
          { key: 'especializacao', label: 'Especialização', type: 'text', placeholder: 'React • Node.js • TypeScript' },
          { key: 'github', label: 'GitHub', type: 'url', placeholder: 'https://github.com/usuario' }
        ]
      },
      {
        key: 'tecnologias',
        label: 'Stack Tecnológico',
        fields: [
          { key: 'frontend', label: 'Frontend', type: 'text', placeholder: 'React, Vue, Angular' },
          { key: 'backend', label: 'Backend', type: 'text', placeholder: 'Node.js, Python, PHP' },
          { key: 'database', label: 'Database', type: 'text', placeholder: 'MongoDB, PostgreSQL, MySQL' },
          { key: 'cloud', label: 'Cloud & DevOps', type: 'text', placeholder: 'AWS, Docker, Kubernetes' }
        ]
      },
      {
        key: 'projetos',
        label: 'Projetos',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Projetos em Destaque' },
          { key: 'quantidade', label: 'Projetos Realizados', type: 'text', placeholder: '50+' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'email', label: 'Email', type: 'text', placeholder: 'dev@email.com' },
          { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/usuario' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
        ]
      }
    ]
  },

  // Hinode - Representante de Perfumes
  {
    id: 'hinode-premium',
    name: 'Representante Hinode Premium',
    type: 'hinode',
    description: 'Template elegante para representantes Hinode com foco em perfumes e cosméticos',
    thumbnail: '/templates/hinode-premium.jpg',
    sections: [
      {
        key: 'hero-hinode',
        label: 'Seção do Topo',
        fields: [
          { key: 'titulo', label: 'Headline (Título)', type: 'text', required: true, placeholder: 'Seja um Representante Hinode' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Transforme sua vida com perfumes de luxo' },
          { key: 'video', label: 'URL do Vídeo', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Quero ser Representante' },
          { key: 'imagem', label: 'Imagem de Fundo', type: 'image' }
        ]
      },
      {
        key: 'sobre-negocio',
        label: 'Sobre o Negócio Hinode',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Sobre a Hinode' },
          { key: 'texto', label: 'Texto sobre o Negócio', type: 'textarea', placeholder: 'A Hinode é líder em cosméticos e perfumaria no Brasil...' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Conhecer Mais' },
          { key: 'imagem', label: 'Imagem (lado esquerdo)', type: 'image' }
        ]
      },
      {
        key: 'biografia-representante',
        label: 'Biografia do Representante',
        fields: [
          { key: 'nome', label: 'Seu Nome', type: 'text', required: true, placeholder: 'Ana Silva' },
          { key: 'titulo', label: 'Seu Título', type: 'text', placeholder: 'Consultora de Beleza Hinode' },
          { key: 'texto', label: 'Sua Biografia', type: 'textarea', placeholder: 'Sou consultora Hinode há 5 anos...' },
          { key: 'experiencia', label: 'Tempo de Experiência', type: 'text', placeholder: '5 anos' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Falar Comigo' },
          { key: 'foto', label: 'Sua Foto (lado direito)', type: 'image' }
        ]
      },
      {
        key: 'produtos-hinode',
        label: 'Produtos Hinode',
        fields: [
          { key: 'titulo', label: 'Título da Seção', type: 'text', placeholder: 'Nossos Produtos' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Conheça nossa linha completa' },
          { key: 'produtos', label: 'Lista de Produtos', type: 'textarea', placeholder: 'Perfumes Importados - Fragrâncias exclusivas\nMaquiagem Premium - Beleza que dura\nCuidados com a Pele - Produtos naturais' }
        ]
      },
      {
        key: 'contato-hinode',
        label: 'Contato',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Entre em Contato' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Tire suas dúvidas ou faça seu pedido' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true, placeholder: '5511999999999' },
          { key: 'mostrarFormulario', label: 'Mostrar Formulário de Contato', type: 'boolean' }
        ]
      },
      {
        key: 'rodape-hinode',
        label: 'Rodapé',
        fields: [
          { key: 'texto', label: 'Texto do Rodapé', type: 'text', placeholder: 'Consultora Hinode - Transformando vidas através da beleza' },
          { key: 'ano', label: 'Ano', type: 'text', placeholder: '2024' }
        ]
      }
    ]
  },
  {
    id: 'hinode-landing',
    name: 'Hinode Landing Simples',
    type: 'hinode',
    description: 'Landing page focada em conversão para produtos Hinode',
    thumbnail: '/templates/hinode-landing.jpg',
    sections: [
      {
        key: 'hero-hinode',
        label: 'Hero Hinode',
        fields: [
          { key: 'titulo', label: 'Título Principal', type: 'text', required: true, placeholder: 'Descubra o Mundo Hinode' },
          { key: 'subtitulo', label: 'Subtítulo', type: 'text', placeholder: 'Perfumes e cosméticos de qualidade internacional' },
          { key: 'botaoTexto', label: 'Texto do Botão', type: 'text', placeholder: 'Conhecer Produtos' }
        ]
      },
      {
        key: 'produtos-destaque',
        label: 'Produtos em Destaque',
        fields: [
          { key: 'titulo', label: 'Título', type: 'text', placeholder: 'Produtos em Destaque' },
          { key: 'lista', label: 'Lista de Produtos', type: 'textarea', placeholder: 'Perfumes Importados\nCosméticos Premium\nCuidados Pessoais' }
        ]
      },
      {
        key: 'contato',
        label: 'Contato',
        fields: [
          { key: 'whatsapp', label: 'WhatsApp', type: 'text', required: true }
        ]
      }
    ]
  }
];

export const getTemplateSchema = (templateId: string): TemplateSchema | null => {
  return templateSchemas.find(template => template.id === templateId) || null;
};

export const getTemplatesByType = (type: 'landing' | 'institucional' | 'portfolio' | 'hinode'): TemplateSchema[] => {
  return templateSchemas.filter(template => template.type === type);
};
