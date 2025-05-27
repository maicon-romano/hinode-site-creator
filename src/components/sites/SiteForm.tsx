
import React from 'react';
import { SiteBuilder } from './SiteBuilder';

interface SiteFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

export const SiteForm: React.FC<SiteFormProps> = ({ 
  initialData, 
  onSubmit, 
  isEditing = false 
}) => {
  return (
    <SiteBuilder
      initialData={initialData}
      onSubmit={onSubmit}
      isEditing={isEditing}
    />
  );
};
