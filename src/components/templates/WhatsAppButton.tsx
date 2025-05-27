
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsapp: string;
  isPreview?: boolean;
  color?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  whatsapp, 
  isPreview = false,
  color = '#25D366'
}) => {
  const handleClick = () => {
    if (!isPreview) {
      window.open(`https://wa.me/${whatsapp}`, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
      style={{ backgroundColor: color }}
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </button>
  );
};
