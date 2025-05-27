export const saveBase64Image = (base64: string, clienteId: string, fileName: string): string => {
  // Since this is a frontend application, we'll create a blob URL for immediate use
  // In a real implementation, this would send the base64 to a backend API
  console.log(`Processing base64 image for client ${clienteId} as ${fileName}`);
  
  try {
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
    
    // Create blob from base64
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    // Determine MIME type
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const blob = new Blob([byteArray], { type: mimeType });
    
    // Create object URL for immediate use
    const blobUrl = URL.createObjectURL(blob);
    
    // Store the blob URL in a global map for later retrieval
    if (!window.imageCache) {
      window.imageCache = new Map();
    }
    const publicPath = `/sites/${clienteId}/${fileNameWithExt}`;
    window.imageCache.set(publicPath, blobUrl);
    
    console.log(`Base64 image converted to blob URL: ${publicPath} -> ${blobUrl}`);
    
    // Return the expected public path
    return publicPath;
  } catch (error) {
    console.error('Error processing base64 image:', error);
    // Return a fallback or null to avoid 404s
    return '';
  }
};

export const createSitesDirectory = (clienteId: string) => {
  console.log(`Creating sites directory for client: ${clienteId}`);
  // This would be handled by backend in a real implementation
  // For now, we just ensure our imageCache is initialized
  if (!window.imageCache) {
    window.imageCache = new Map();
  }
};

// Helper function to get the actual URL for an image path
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a blob URL or full URL, return as is
  if (imagePath.startsWith('blob:') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Check our image cache for blob URLs
  if (window.imageCache && window.imageCache.has(imagePath)) {
    return window.imageCache.get(imagePath);
  }
  
  // If it starts with /sites/, it's our expected format
  if (imagePath.startsWith('/sites/')) {
    // For now, return the path as-is and let the browser handle 404s gracefully
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
        
        // If saving failed, use empty string instead of base64 to avoid Firestore issues
        processed[key] = imagePath || '';
        
        console.log(`Base64 image converted to: ${imagePath || 'fallback'}`);
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

// Extend window interface for TypeScript
declare global {
  interface Window {
    imageCache: Map<string, string>;
  }
}
