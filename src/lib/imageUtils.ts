
export const saveBase64Image = (base64: string, clienteId: string, fileName: string): string => {
  console.log(`imageUtils - Processando imagem base64 para cliente ${clienteId} como ${fileName}`);
  
  try {
    // Determinar extensão baseada no prefixo base64
    let extension = '.jpg';
    if (base64.startsWith('data:image/png')) {
      extension = '.png';
    } else if (base64.startsWith('data:image/gif')) {
      extension = '.gif';
    } else if (base64.startsWith('data:image/webp')) {
      extension = '.webp';
    }
    
    // Garantir que fileName tenha extensão
    const fileNameWithExt = fileName.includes('.') ? fileName : `${fileName}${extension}`;
    
    // Criar blob do base64
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    // Determinar MIME type
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const blob = new Blob([byteArray], { type: mimeType });
    
    // Criar object URL para uso imediato
    const blobUrl = URL.createObjectURL(blob);
    
    // Armazenar a blob URL em um mapa global para recuperação posterior
    if (!window.imageCache) {
      window.imageCache = new Map();
    }
    
    const publicPath = `/sites/${clienteId}/${fileNameWithExt}`;
    window.imageCache.set(publicPath, blobUrl);
    
    console.log(`imageUtils - Imagem base64 convertida para blob URL: ${publicPath} -> ${blobUrl}`);
    
    // Retornar o caminho público esperado
    return publicPath;
  } catch (error) {
    console.error('imageUtils - Erro ao processar imagem base64:', error);
    // Retornar string vazia para evitar 404s
    return '';
  }
};

export const createSitesDirectory = (clienteId: string) => {
  console.log(`imageUtils - Criando diretório de sites para cliente: ${clienteId}`);
  // Isso seria tratado pelo backend em uma implementação real
  // Por enquanto, apenas garantimos que nosso imageCache esteja inicializado
  if (!window.imageCache) {
    window.imageCache = new Map();
  }
  if (!window.logoCache) {
    window.logoCache = new Map();
  }
};

// Função auxiliar para obter a URL real de uma imagem
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  console.log('imageUtils - Obtendo URL para:', imagePath);
  
  // Se já é uma blob URL ou URL completa, retornar como está
  if (imagePath.startsWith('blob:') || imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  // Verificar nosso cache de imagens para blob URLs
  if (window.imageCache && window.imageCache.has(imagePath)) {
    const cachedUrl = window.imageCache.get(imagePath);
    console.log('imageUtils - URL encontrada no cache:', imagePath, '->', cachedUrl);
    return cachedUrl;
  }
  
  // Verificar cache de logos
  if (window.logoCache && window.logoCache.has(imagePath)) {
    const cachedUrl = window.logoCache.get(imagePath);
    console.log('imageUtils - Logo encontrada no cache:', imagePath, '->', cachedUrl);
    return cachedUrl;
  }
  
  // Se começa com /sites/, é nosso formato esperado
  if (imagePath.startsWith('/sites/')) {
    console.log('imageUtils - Caminho de sites, retornando como está:', imagePath);
    return imagePath;
  }
  
  return imagePath;
};

const isBase64Image = (value: any): boolean => {
  return typeof value === 'string' && value.startsWith('data:image/');
};

const isYouTubeUrl = (value: any): boolean => {
  if (typeof value !== 'string') return false;
  return value.includes('youtube.com') || value.includes('youtu.be');
};

export const convertYouTubeToEmbed = (url: string): string => {
  if (!isYouTubeUrl(url)) return url;
  
  console.log('imageUtils - Convertendo URL do YouTube para embed:', url);
  
  // Se já é uma URL de embed, retorna como está
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  let videoId = '';
  
  try {
    // Diferentes formatos de URL do YouTube
    if (url.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtube.com/live/')) {
      videoId = url.split('/live/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      return url; // Já está no formato correto
    }
    
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
      console.log('imageUtils - URL do YouTube convertida:', url, '->', embedUrl);
      return embedUrl;
    }
  } catch (error) {
    console.error('imageUtils - Erro ao converter URL do YouTube:', error);
  }
  
  return url; // Retorna a URL original se não conseguir converter
};

export const processImageData = (data: any, clienteId: string): any => {
  console.log('imageUtils - Processando dados de imagem para cliente:', clienteId);
  console.log('imageUtils - Dados recebidos:', data);
  
  const processedData = { ...data };
  
  // Criar diretório do cliente
  createSitesDirectory(clienteId);
  
  // Função para processar objetos recursivamente
  const processObject = (obj: any, prefix = ''): any => {
    const processed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (isBase64Image(value)) {
        // Esta é uma imagem base64 - converter para caminho de arquivo
        const fileName = prefix ? `${prefix}_${key}` : key;
        console.log(`imageUtils - Convertendo imagem base64 para campo: ${fileName}`);
        
        // Salvar a imagem e obter o caminho do arquivo
        const imagePath = saveBase64Image(value as string, clienteId, fileName);
        
        // Se o salvamento falhou, usar string vazia em vez de base64 para evitar problemas no Firestore
        processed[key] = imagePath || '';
        
        console.log(`imageUtils - Imagem base64 convertida para: ${imagePath || 'fallback'}`);
      } else if (isYouTubeUrl(value)) {
        // Esta é uma URL do YouTube - converter para formato embed
        console.log(`imageUtils - Convertendo URL do YouTube para campo: ${key}`);
        const embedUrl = convertYouTubeToEmbed(value as string);
        processed[key] = embedUrl;
      } else if (Array.isArray(value)) {
        // Processar arrays (como cards de produtos)
        processed[key] = value.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return processObject(item, `${prefix || key}${index + 1}`);
          }
          return item;
        });
      } else if (typeof value === 'object' && value !== null) {
        // Processar objetos aninhados
        processed[key] = processObject(value, prefix ? `${prefix}_${key}` : key);
      } else {
        // Valor primitivo, manter como está
        processed[key] = value;
      }
    }
    
    return processed;
  };
  
  const result = processObject(processedData);
  console.log('imageUtils - Dados processados:', result);
  return result;
};

// Função auxiliar para detectar todas as imagens base64 em um objeto
export const detectBase64Images = (obj: any, path = ''): string[] => {
  const images: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (isBase64Image(value)) {
      images.push(currentPath);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          images.push(...detectBase64Images(item, `${currentPath}[${index}]`));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      images.push(...detectBase64Images(value, currentPath));
    }
  }
  
  return images;
};

// Estender interface window para TypeScript
declare global {
  interface Window {
    imageCache: Map<string, string>;
    logoCache: Map<string, string>;
  }
}
