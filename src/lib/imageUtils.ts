
import path from 'path';
import fs from 'fs';

export const saveBase64Image = (base64: string, clienteId: string, fileName: string): string => {
  try {
    // Remove o prefixo data:image/...;base64, se existir
    const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Criar diretório do cliente se não existir
    const clientDir = path.join(process.cwd(), 'public', 'sites', clienteId);
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }
    
    // Determinar extensão baseada no tipo da imagem ou usar padrão
    let extension = '.jpg';
    if (base64.startsWith('data:image/png')) {
      extension = '.png';
    } else if (base64.startsWith('data:image/gif')) {
      extension = '.gif';
    } else if (base64.startsWith('data:image/webp')) {
      extension = '.webp';
    }
    
    // Garantir que o fileName tenha extensão
    const fileNameWithExt = fileName.includes('.') ? fileName : `${fileName}${extension}`;
    
    // Caminho completo do arquivo
    const filePath = path.join(clientDir, fileNameWithExt);
    
    // Converter base64 para buffer e salvar
    const imageBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, imageBuffer);
    
    // Retornar caminho relativo para uso público
    return `/sites/${clienteId}/${fileNameWithExt}`;
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    throw new Error(`Falha ao salvar imagem: ${error.message}`);
  }
};

export const processImageData = (data: any, clienteId: string): any => {
  const processedData = { ...data };
  let imageCounter = 1;
  
  // Função recursiva para processar objetos aninhados
  const processObject = (obj: any, prefix = ''): any => {
    const processed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        // É uma imagem base64, processar
        const fileName = prefix ? `${prefix}_${key}` : key;
        processed[key] = saveBase64Image(value, clienteId, fileName);
      } else if (Array.isArray(value)) {
        // Processar arrays (como cards de produtos)
        processed[key] = value.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return processObject(item, `${prefix || key}_${index + 1}`);
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
  
  // Processar campos específicos conhecidos
  if (processedData.logoPath && processedData.logoPath.startsWith('data:image/')) {
    processedData.logoPath = saveBase64Image(processedData.logoPath, clienteId, 'logo');
  }
  
  // Processar seções com imagens
  const sectionsWithImages = ['bio', 'sobre', 'sobre-hinode', 'sobre-distribuidor', 'hero', 'hero-hinode'];
  sectionsWithImages.forEach(section => {
    if (processedData[section] && processedData[section].imagem && processedData[section].imagem.startsWith('data:image/')) {
      processedData[section] = {
        ...processedData[section],
        imagem: saveBase64Image(processedData[section].imagem, clienteId, section)
      };
    }
  });
  
  // Processar produtos-destaque cards
  if (processedData['produtos-destaque'] && processedData['produtos-destaque'].cards) {
    processedData['produtos-destaque'].cards = processedData['produtos-destaque'].cards.map((card: any, index: number) => {
      if (card.imagem && card.imagem.startsWith('data:image/')) {
        return {
          ...card,
          imagem: saveBase64Image(card.imagem, clienteId, `produto_${index + 1}`)
        };
      }
      return card;
    });
  }
  
  // Processar qualquer outro campo que possa ter imagens
  return processObject(processedData);
};

export const createSitesDirectory = () => {
  const sitesDir = path.join(process.cwd(), 'public', 'sites');
  if (!fs.existsSync(sitesDir)) {
    fs.mkdirSync(sitesDir, { recursive: true });
  }
};
