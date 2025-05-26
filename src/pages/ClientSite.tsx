
import React from 'react';
import { useParams } from 'react-router-dom';

const ClientSite = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Site do Cliente {id}
        </h1>
        <p className="text-center text-gray-600">
          Esta é a página pública do cliente. Aqui será exibido o site personalizado.
        </p>
      </div>
    </div>
  );
};

export default ClientSite;
