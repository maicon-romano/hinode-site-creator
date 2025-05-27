
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Cliente {
  id: string;
  name: string;
  email: string;
}

interface ClientSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onClientDataChange: (clientName: string) => void;
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({ 
  value, 
  onValueChange, 
  onClientDataChange 
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    const fetchClientes = async () => {
      if (!currentUser || userData?.tipo !== 'admin') {
        console.log('Usuário não é admin, não carregando clientes');
        setLoading(false);
        return;
      }

      try {
        setError(null);
        console.log('Carregando clientes para admin:', currentUser.uid);
        
        // Usar a coleção 'users' em vez de 'usuarios'
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('tipo', '==', 'cliente'));
        const snapshot = await getDocs(q);
        
        const clientesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || doc.data().email || 'Cliente sem nome',
          email: doc.data().email
        }));
        
        console.log('Clientes carregados:', clientesList);
        setClientes(clientesList);
      } catch (error: any) {
        console.error('Erro ao carregar clientes:', error);
        
        let errorMessage = "Não foi possível carregar os clientes";
        
        if (error.code === 'permission-denied') {
          errorMessage = "Você não tem permissão para acessar os dados dos clientes.";
        } else if (error.code === 'unavailable') {
          errorMessage = "Serviço temporariamente indisponível. Tente novamente.";
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && userData) {
      fetchClientes();
    } else if (currentUser && !userData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser, userData]);

  const handleValueChange = (clientId: string) => {
    onValueChange(clientId);
    const selectedClient = clientes.find(c => c.id === clientId);
    if (selectedClient) {
      onClientDataChange(selectedClient.name);
    }
  };

  if (error) {
    return (
      <FormItem>
        <FormLabel>Cliente</FormLabel>
        <FormControl>
          <div className="text-red-600 text-sm p-2 border border-red-300 rounded">
            {error}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  return (
    <FormItem>
      <FormLabel>Cliente</FormLabel>
      <FormControl>
        <Select value={value} onValueChange={handleValueChange} disabled={loading}>
          <SelectTrigger>
            <SelectValue placeholder={loading ? "Carregando clientes..." : "Selecione um cliente"} />
          </SelectTrigger>
          <SelectContent>
            {clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={cliente.id}>
                {cliente.name} ({cliente.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
