
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ContactFormProps {
  clientId: string;
  isPreview?: boolean;
  cores: {
    principal: string;
    fundo: string;
    destaque: string;
    texto: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({
  clientId,
  isPreview = false,
  cores
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPreview) {
      toast({
        title: "Preview Mode",
        description: "Formulário não enviado no modo preview"
      });
      return;
    }

    if (!clientId) {
      toast({
        title: "Erro",
        description: "Cliente não identificado",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'clientes', clientId, 'contatos'), {
        ...formData,
        timestamp: new Date(),
        clienteId: clientId
      });

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve."
      });

      setFormData({
        nome: '',
        telefone: '',
        email: '',
        mensagem: ''
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <Input
            name="nome"
            placeholder="Seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Input
            name="telefone"
            placeholder="Seu telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Textarea
            name="mensagem"
            placeholder="Sua mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full text-white"
          style={{ backgroundColor: cores.destaque }}
        >
          {loading ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </div>
    </form>
  );
};
