
export const saveBase64Image = (base64: string, clienteId: string, fileName: string): string => {
  // Since this is a frontend application, we'll simulate the file saving
  // In a real implementation, this would send the base64 to a backend API
  console.log(`Saving base64 image for client ${clienteId} as ${fileName}`);
  
  // Determine extension based on base64 prefix
  let extension = '.jpg';
  if (base64.startsWith('data:image/png')) {
    extension = '.png';
  } else if (base64.startsWith('data:image/gif')) {
    extension = '.gif';
  } else if (base64.startsWith('data:image/webp')) {
    extension = '.webp';
  }
  
  // Ensure fileName has extension
  const fileNameWithExt = fileName.includes('.') ? fileName : `${fileName}${extension}`;
  
  // Return the expected public path
  return `/sites/${clienteId}/${fileNameWithExt}`;
};

export const createSitesDirectory = (clienteId: string) => {
  console.log(`Creating sites directory for client: ${clienteId}`);
  // This would be handled by backend in a real implementation
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
  
  console.log('Converting YouTube URL to embed format:', url);
  
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
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      console.log('YouTube URL converted:', url, '->', embedUrl);
      return embedUrl;
    }
  } catch (error) {
    console.error('Error converting YouTube URL:', error);
  }
  
  return url; // Retorna a URL original se não conseguir converter
};

export const processImageData = (data: any, clienteId: string): any => {
  const processedData = { ...data };
  
  // Create client directory
  createSitesDirectory(clienteId);
  
  // Function to recursively process nested objects
  const processObject = (obj: any, prefix = ''): any => {
    const processed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (isBase64Image(value)) {
        // This is a base64 image - convert to file path
        const fileName = prefix ? `${prefix}_${key}` : key;
        console.log(`Converting base64 image for field: ${fileName}`);
        
        // Save the image and get the file path
        const imagePath = saveBase64Image(value as string, clienteId, fileName);
        processed[key] = imagePath;
        
        console.log(`Base64 image converted to: ${imagePath}`);
      } else if (isYouTubeUrl(value)) {
        // This is a YouTube URL - convert to embed format
        console.log(`Converting YouTube URL for field: ${key}`);
        const embedUrl = convertYouTubeToEmbed(value as string);
        processed[key] = embedUrl;
      } else if (Array.isArray(value)) {
        // Process arrays (like product cards)
        processed[key] = value.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return processObject(item, `${prefix || key}${index + 1}`);
          }
          return item;
        });
      } else if (typeof value === 'object' && value !== null) {
        // Process nested objects
        processed[key] = processObject(value, prefix ? `${prefix}_${key}` : key);
      } else {
        // Primitive value, keep as is
        processed[key] = value;
      }
    }
    
    return processed;
  };
  
  return processObject(processedData);
};

// Helper function to detect all base64 images in an object
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
