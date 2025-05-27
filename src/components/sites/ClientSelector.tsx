
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Cliente {
  id: string;
  nome: string;
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

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const usuariosRef = collection(db, 'usuarios');
        const q = query(usuariosRef, where('tipo', '==', 'cliente'));
        const snapshot = await getDocs(q);
        
        const clientesList = snapshot.docs.map(doc => ({
          id: doc.id,
          nome: doc.data().nome,
          email: doc.data().email
        }));
        
        setClientes(clientesList);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleValueChange = (clientId: string) => {
    onValueChange(clientId);
    const selectedClient = clientes.find(c => c.id === clientId);
    if (selectedClient) {
      onClientDataChange(selectedClient.nome);
    }
  };

  return (
    <FormItem>
      <FormLabel>Cliente</FormLabel>
      <FormControl>
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder={loading ? "Carregando clientes..." : "Selecione um cliente"} />
          </SelectTrigger>
          <SelectContent>
            {clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={cliente.id}>
                {cliente.nome} ({cliente.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
