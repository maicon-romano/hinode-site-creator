export const saveBase64Image = (base64: string, clienteId: string, fileName: string): string => {
  // Since this is a frontend application, we'll return the expected path
  // The actual file saving would need to be handled by a backend API
  console.warn('saveBase64Image called in frontend - actual file saving needs backend implementation');
  
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

export const processImageData = (data: any, clienteId: string): any => {
  const processedData = { ...data };
  
  // Function to recursively process nested objects
  const processObject = (obj: any, prefix = ''): any => {
    const processed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        // This is a base64 image - for now, we'll keep it as base64
        // In a real implementation, this would be sent to a backend API for processing
        console.log(`Found base64 image for ${prefix ? prefix + '_' : ''}${key}`);
        processed[key] = value; // Keep as base64 for now
      } else if (Array.isArray(value)) {
        // Process arrays (like product cards)
        processed[key] = value.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return processObject(item, `${prefix || key}_${index + 1}`);
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

export const createSitesDirectory = () => {
  console.log('createSitesDirectory called - this should be handled by backend');
  // This is a no-op in frontend, actual directory creation needs backend
};
