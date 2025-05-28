
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DynamicSiteRenderer } from '@/components/templates/DynamicSiteRenderer';

interface SiteData {
  id: string;
  clientId: string;
  clientName: string;
  templateId?: string;
  modelId?: string;
  nomeDoSite: string;
  headline?: string;
  descricao?: string;
  videoUrl?: string;
  whatsapp?: string;
  template?: string;
  variation?: string;
  logoPath?: string;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
    degradeHero?: {
      inicio: string;
      fim: string;
    };
  };
  secoes?: {
    video: boolean;
    formulario: boolean;
    depoimentos: boolean;
    sobre: boolean;
    contato: boolean;
  };
  activeSections?: string[];
  sectionsOrder?: string[];
  [key: string]: any;
}

const ClientSite = () => {
  const { id } = useParams<{ id: string }>();
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteData = async () => {
      if (!id) {
        setError('ID do cliente não fornecido');
        setLoading(false);
        return;
      }

      try {
        console.log('ClientSite - Carregando site para ID:', id);
        
        // First try to get site by document ID
        const siteDoc = await getDoc(doc(db, 'sites', id));
        
        if (siteDoc.exists()) {
          const data = { id: siteDoc.id, ...siteDoc.data() } as SiteData;
          console.log('ClientSite - Site encontrado por document ID:', data);
          setSiteData(data);
        } else {
          // If not found by document ID, try to find by clientId
          console.log('ClientSite - Buscando por clientId:', id);
          const sitesQuery = query(
            collection(db, 'sites'),
            where('clientId', '==', id)
          );
          const sitesSnapshot = await getDocs(sitesQuery);
          
          if (!sitesSnapshot.empty) {
            const siteDoc = sitesSnapshot.docs[0];
            const data = { id: siteDoc.id, ...siteDoc.data() } as SiteData;
            console.log('ClientSite - Site encontrado por clientId:', data);
            setSiteData(data);
          } else {
            console.log('ClientSite - Site não encontrado');
            setError('Site não encontrado');
          }
        }
      } catch (error) {
        console.error('ClientSite - Erro ao carregar dados do site:', error);
        setError('Erro ao carregar o site');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando site...</p>
        </div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Site não encontrado</h1>
          <p className="text-gray-600 mb-4">
            {error || 'O site solicitado não existe ou não está disponível.'}
          </p>
          <p className="text-sm text-gray-500">
            ID solicitado: {id}
          </p>
        </div>
      </div>
    );
  }

  console.log('ClientSite - Renderizando site com dados completos:', siteData);

  // Use DynamicSiteRenderer directly with all the data from Firestore
  return <DynamicSiteRenderer siteData={siteData} isPreview={false} />;
};

export default ClientSite;
