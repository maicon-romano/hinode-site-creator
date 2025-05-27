
export interface SectionCard {
  id: string;
  titulo: string;
  texto?: string;
  imagem?: string;
  icone?: string;
  ordem: number;
}

export interface SectionContent {
  titulo?: string;
  subtitulo?: string;
  texto?: string;
  imagem?: string;
  video?: string;
  botaoTexto?: string;
  botaoLink?: string;
  cards?: SectionCard[];
  [key: string]: any;
}

export interface SiteSection {
  type: string;
  enabled: boolean;
  conteudo: SectionContent;
}

export interface SiteModel {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'vendas' | 'institucional' | 'portfolio' | 'hinode';
  thumbnail: string;
  secoesPadrao: SiteSection[];
}

export const siteModels: SiteModel[] = [
  {
    id: 'landing-vendas',
    nome: 'Landing Page de Vendas',
    descricao: 'Focado em conversão rápida de leads',
    categoria: 'vendas',
    thumbnail: '/models/landing-vendas.jpg',
    secoesPadrao: [
      {
        type: 'hero',
        enabled: true,
        conteudo: {
          titulo: 'Transforme Sua Vida Hoje',
          subtitulo: 'Descubra o produto que vai revolucionar seus resultados',
          botaoTexto: 'Quero Saber Mais',
          botaoLink: '',
          imagem: ''
        }
      },
      {
        type: 'beneficios',
        enabled: true,
        conteudo: {
          titulo: 'Por Que Escolher Nossa Solução?',
          cards: [
            { id: '1', titulo: 'Resultados Rápidos', texto: 'Veja mudanças em 30 dias', ordem: 1 },
            { id: '2', titulo: 'Suporte Completo', texto: 'Atendimento 24/7', ordem: 2 },
            { id: '3', titulo: 'Garantia Total', texto: '30 dias de garantia', ordem: 3 }
          ]
        }
      },
      {
        type: 'produto',
        enabled: true,
        conteudo: {
          titulo: 'Conheça Nossa Solução',
          texto: 'Produto desenvolvido com tecnologia avançada para máximos resultados.',
          imagem: ''
        }
      },
      {
        type: 'como-funciona',
        enabled: true,
        conteudo: {
          titulo: 'Como Funciona',
          cards: [
            { id: '1', titulo: 'Passo 1', texto: 'Faça sua inscrição', ordem: 1 },
            { id: '2', titulo: 'Passo 2', texto: 'Receba o acesso', ordem: 2 },
            { id: '3', titulo: 'Passo 3', texto: 'Comece a usar', ordem: 3 }
          ]
        }
      },
      {
        type: 'depoimentos',
        enabled: true,
        conteudo: {
          titulo: 'O Que Nossos Clientes Dizem',
          cards: [
            { id: '1', titulo: 'João Silva', texto: 'Produto incrível, recomendo!', ordem: 1 },
            { id: '2', titulo: 'Maria Santos', texto: 'Mudou minha vida completamente.', ordem: 2 }
          ]
        }
      },
      {
        type: 'faq',
        enabled: true,
        conteudo: {
          titulo: 'Perguntas Frequentes',
          cards: [
            { id: '1', titulo: 'Como funciona?', texto: 'É muito simples de usar...', ordem: 1 },
            { id: '2', titulo: 'Tem garantia?', texto: 'Sim, 30 dias de garantia total.', ordem: 2 }
          ]
        }
      },
      {
        type: 'contato',
        enabled: true,
        conteudo: {
          titulo: 'Entre em Contato',
          subtitulo: 'Tire suas dúvidas conosco'
        }
      },
      {
        type: 'rodape',
        enabled: true,
        conteudo: {
          texto: '© 2024 Todos os direitos reservados.'
        }
      }
    ]
  },
  {
    id: 'site-institucional',
    nome: 'Site Institucional',
    descricao: 'Focado em credibilidade e autoridade',
    categoria: 'institucional',
    thumbnail: '/models/site-institucional.jpg',
    secoesPadrao: [
      {
        type: 'banner-institucional',
        enabled: true,
        conteudo: {
          titulo: 'Bem-vindo à Nossa Empresa',
          subtitulo: 'Excelência em serviços há mais de 10 anos',
          imagem: ''
        }
      },
      {
        type: 'sobre',
        enabled: true,
        conteudo: {
          titulo: 'Sobre Nós',
          texto: 'Nossa empresa atua no mercado há mais de uma década, oferecendo soluções inovadoras.',
          imagem: ''
        }
      },
      {
        type: 'servicos',
        enabled: true,
        conteudo: {
          titulo: 'Nossos Serviços',
          cards: [
            { id: '1', titulo: 'Consultoria', texto: 'Assessoria especializada', ordem: 1 },
            { id: '2', titulo: 'Desenvolvimento', texto: 'Soluções customizadas', ordem: 2 },
            { id: '3', titulo: 'Suporte', texto: 'Atendimento contínuo', ordem: 3 }
          ]
        }
      },
      {
        type: 'equipe',
        enabled: true,
        conteudo: {
          titulo: 'Nossa Equipe',
          cards: [
            { id: '1', titulo: 'João Silva', texto: 'CEO', imagem: '', ordem: 1 },
            { id: '2', titulo: 'Maria Santos', texto: 'CTO', imagem: '', ordem: 2 }
          ]
        }
      },
      {
        type: 'depoimentos',
        enabled: true,
        conteudo: {
          titulo: 'Depoimentos de Clientes',
          cards: [
            { id: '1', titulo: 'Empresa ABC', texto: 'Excelente parceria!', ordem: 1 },
            { id: '2', titulo: 'Empresa XYZ', texto: 'Profissionais competentes.', ordem: 2 }
          ]
        }
      },
      {
        type: 'mapa',
        enabled: true,
        conteudo: {
          titulo: 'Nossa Localização',
          endereco: 'Rua das Flores, 123 - São Paulo, SP'
        }
      },
      {
        type: 'contato',
        enabled: true,
        conteudo: {
          titulo: 'Entre em Contato',
          subtitulo: 'Estamos prontos para atendê-lo'
        }
      },
      {
        type: 'rodape',
        enabled: true,
        conteudo: {
          texto: '© 2024 Empresa. Todos os direitos reservados.'
        }
      }
    ]
  },
  {
    id: 'portfolio-profissional',
    nome: 'Portfólio Profissional',
    descricao: 'Focado em presença pessoal ou freelancer',
    categoria: 'portfolio',
    thumbnail: '/models/portfolio-profissional.jpg',
    secoesPadrao: [
      {
        type: 'apresentacao-pessoal',
        enabled: true,
        conteudo: {
          titulo: 'Olá, eu sou [Seu Nome]',
          subtitulo: 'Desenvolvedor Full Stack',
          texto: 'Especialista em criar soluções digitais inovadoras',
          imagem: ''
        }
      },
      {
        type: 'bio',
        enabled: true,
        conteudo: {
          titulo: 'Sobre Mim',
          texto: 'Profissional com mais de 5 anos de experiência em desenvolvimento web.',
          imagem: ''
        }
      },
      {
        type: 'habilidades',
        enabled: true,
        conteudo: {
          titulo: 'Minhas Habilidades',
          cards: [
            { id: '1', titulo: 'React', texto: 'Desenvolvimento frontend', ordem: 1 },
            { id: '2', titulo: 'Node.js', texto: 'Backend e APIs', ordem: 2 },
            { id: '3', titulo: 'Design UI/UX', texto: 'Interfaces modernas', ordem: 3 }
          ]
        }
      },
      {
        type: 'projetos',
        enabled: true,
        conteudo: {
          titulo: 'Meus Projetos',
          cards: [
            { id: '1', titulo: 'E-commerce', texto: 'Loja virtual completa', imagem: '', ordem: 1 },
            { id: '2', titulo: 'App Mobile', texto: 'Aplicativo React Native', imagem: '', ordem: 2 }
          ]
        }
      },
      {
        type: 'depoimentos',
        enabled: true,
        conteudo: {
          titulo: 'O Que Dizem Sobre Meu Trabalho',
          cards: [
            { id: '1', titulo: 'Cliente A', texto: 'Trabalho excepcional!', ordem: 1 },
            { id: '2', titulo: 'Cliente B', texto: 'Profissional muito competente.', ordem: 2 }
          ]
        }
      },
      {
        type: 'contato',
        enabled: true,
        conteudo: {
          titulo: 'Vamos Trabalhar Juntos?',
          subtitulo: 'Entre em contato para discutir seu projeto'
        }
      },
      {
        type: 'rodape',
        enabled: true,
        conteudo: {
          texto: '© 2024 [Seu Nome]. Todos os direitos reservados.'
        }
      }
    ]
  },
  {
    id: 'representante-hinode',
    nome: 'Representante Hinode',
    descricao: 'Focado em marketing de relacionamento',
    categoria: 'hinode',
    thumbnail: '/models/representante-hinode.jpg',
    secoesPadrao: [
      {
        type: 'hero-hinode',
        enabled: true,
        conteudo: {
          titulo: 'Seja Bem-vindo à Hinode',
          subtitulo: 'Transforme sua vida com produtos de qualidade',
          texto: 'Olá! Eu sou [Seu Nome], sua consultora Hinode.',
          video: '',
          imagem: ''
        }
      },
      {
        type: 'sobre-hinode',
        enabled: true,
        conteudo: {
          titulo: 'Sobre a Hinode',
          texto: 'A Hinode é uma empresa brasileira líder em cosméticos e produtos de bem-estar.',
          imagem: ''
        }
      },
      {
        type: 'sobre-distribuidor',
        enabled: true,
        conteudo: {
          titulo: 'Sobre Mim',
          texto: 'Sou consultora Hinode há [X] anos e ajudo pessoas a alcançarem seus objetivos.',
          imagem: ''
        }
      },
      {
        type: 'produtos-destaque',
        enabled: true,
        conteudo: {
          titulo: 'Produtos em Destaque',
          cards: [
            { id: '1', titulo: 'Perfumes', texto: 'Fragrâncias exclusivas', imagem: '', ordem: 1 },
            { id: '2', titulo: 'Cosméticos', texto: 'Cuidados com a pele', imagem: '', ordem: 2 },
            { id: '3', titulo: 'Suplementos', texto: 'Saúde e bem-estar', imagem: '', ordem: 3 }
          ]
        }
      },
      {
        type: 'etapas-comecar',
        enabled: true,
        conteudo: {
          titulo: 'Como Começar na Hinode',
          cards: [
            { id: '1', titulo: 'Etapa 1', texto: 'Entre em contato comigo', ordem: 1 },
            { id: '2', titulo: 'Etapa 2', texto: 'Escolha seu kit inicial', ordem: 2 },
            { id: '3', titulo: 'Etapa 3', texto: 'Comece a empreender', ordem: 3 }
          ]
        }
      },
      {
        type: 'contato',
        enabled: true,
        conteudo: {
          titulo: 'Vamos Conversar?',
          subtitulo: 'Tire suas dúvidas e saiba como começar'
        }
      },
      {
        type: 'rodape-hinode',
        enabled: true,
        conteudo: {
          texto: '© 2024 Hinode. Representante independente: [Seu Nome]'
        }
      }
    ]
  }
];

export const getSiteModel = (modelId: string): SiteModel | null => {
  return siteModels.find(model => model.id === modelId) || null;
};

export const getSiteModelsByCategory = (categoria?: string): SiteModel[] => {
  if (!categoria) return siteModels;
  return siteModels.filter(model => model.categoria === categoria);
};
