import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DynamicSiteEditor } from './DynamicSiteEditor';
import hinodeModel from '@/models/hinode.json';

export const SiteBuilder: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }

      try {
        // Determine the document ID based on user type
        let docId;
        if (userData?.tipo === 'admin' && userData?.selectedClient) {
          // Admin creating/editing for a client
          docId = userData.selectedClient;
        } else {
          // Client creating/editing their own site
          docId = currentUser.uid;
        }

        // Fetch existing data from Firestore
        const siteDoc = await doc(db, 'sites', docId).get();
        if (siteDoc.exists()) {
          console.log('Existing site data:', siteDoc.data());
          setInitialData(siteDoc.data());
        } else {
          console.log('No existing site data found, starting with a blank slate.');
          setInitialData(null);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast.error('Erro ao carregar os dados do site. Tente novamente.');
      }
    };

    fetchInitialData();
  }, [currentUser, userData]);

  const handleSiteSubmit = async (data: any) => {
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting site data:', data);

      // Determine the collection and document ID based on user type
      let docId;
      let collectionName = 'sites';
      
      if (userData?.tipo === 'admin' && data.clientId) {
        // Admin creating for a client
        docId = data.clientId;
      } else {
        // Client creating their own site
        docId = currentUser.uid;
      }

      console.log('Saving to document ID:', docId);

      // Save to Firestore
      await setDoc(doc(db, collectionName, docId), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: currentUser.uid,
        createdBy: userData?.tipo === 'admin' ? 'admin' : 'client'
      }, { merge: true });

      console.log('Site saved successfully!');
      
      // Show success message
      toast.success('Site salvo com sucesso!');
      
      // Redirect to sites management or preview
      if (userData?.tipo === 'admin') {
        navigate('/manage-sites');
      } else {
        navigate(`/cliente/${docId}`);
      }
    } catch (error) {
      console.error('Error saving site:', error);
      toast.error('Erro ao salvar o site. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">
        {userData?.tipo === 'admin' ? 'Criar Site para Cliente' : 'Personalize Seu Site'}
      </h1>
      <DynamicSiteEditor
        modelConfig={hinodeModel}
        onSubmit={handleSiteSubmit}
        initialData={initialData}
      />
    </div>
  );
};
