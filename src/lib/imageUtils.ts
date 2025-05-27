
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
