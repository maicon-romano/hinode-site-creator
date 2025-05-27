
import React from 'react';
import { getImageUrl } from '@/lib/imageUtils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  fallback = '/placeholder.svg',
  alt = '',
  className = '',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (src) {
      const imageUrl = getImageUrl(src);
      setImageSrc(imageUrl);
      setHasError(false);
    } else {
      setImageSrc(fallback);
    }
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      console.warn(`Failed to load image: ${imageSrc}`);
      setHasError(true);
      setImageSrc(fallback);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
