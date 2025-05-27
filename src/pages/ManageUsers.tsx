import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserData } from '@/contexts/AuthContext';
import { Plus, Trash2, ArrowLeft, LogOut, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface CreateUserForm {
  email: string;
  password: string;
  name: string;
  tipo: 'admin' | 'cliente';
}

interface EditUserForm {
  email: string;
  name: string;
  tipo: 'admin' | 'cliente';
}

const ManageUsers = () => {
  const { createUser, userData, currentUser, logout } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<CreateUserForm>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      tipo: 'cliente'
    }
  });

  const editForm = useForm<EditUserForm>({
    defaultValues: {
      email: '',
      name: '',
      tipo: 'cliente'
    }
  });

  const fetchUsers = async () => {
    // Só carrega usuários se estiver autenticado e for admin
    if (!currentUser || userData?.tipo !== 'admin') {
      console.log('User not authenticated or not admin, skipping user fetch');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      console.log('Carregando usuários para admin:', currentUser.uid);
      
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => {
        const data = doc.data() as UserData;
        console.log('Usuário carregado:', data);
        return data;
      });
      
      setUsers(userList);
      console.log('Total de usuários carregados:', userList.length);
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error);
      
      let errorMessage = "Não foi possível carregar os usuários";
      
      if (error.code === 'permission-denied') {
        errorMessage = "Você não tem permissão para acessar estes dados. Verifique se você é um administrador.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Serviço temporariamente indisponível. Tente novamente.";
      }
      
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Aguarda a autenticação completa antes de tentar carregar usuários
    if (currentUser && userData) {
      fetchUsers();
    } else if (currentUser && !userData) {
      // Usuário autenticado mas userData ainda não carregou
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser, userData]);

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser(data.email, data.password, data.tipo, data.name);
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso!"
      });
      setIsDialogOpen(false);
      form.reset();
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o usuário",
        variant: "destructive"
      });
    }
  };

  const onEditSubmit = async (data: EditUserForm) => {
    if (!editingUser) return;

    try {
      const userRef = doc(db, 'users', editingUser.uid);
      await updateDoc(userRef, {
        email: data.email,
        name: data.name,
        tipo: data.tipo
      });

      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso!"
      });
      setIsEditDialogOpen(false);
      setEditingUser(null);
      editForm.reset();
      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o usuário",
        variant: "destructive"
      });
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    editForm.reset({
      email: user.email,
      name: user.name || '',
      tipo: user.tipo
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        toast({
          title: "Sucesso",
          description: "Usuário excluído com sucesso!"
        });
        fetchUsers();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o usuário",
          variant: "destructive"
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    
    // Check if it's a Firestore timestamp with toDate method
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString();
    }
    
    // Check if it's already a Date object
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    // Try to parse it as a date string
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  if (userData?.tipo !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar esta página. Apenas administradores podem gerenciar usuários.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              UID atual: {currentUser?.uid || 'Não autenticado'}
            </p>
            <p className="text-sm text-gray-600">
              Tipo de usuário: {userData?.tipo || 'Não definido'}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Voltar ao Dashboard
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Fazer Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
              <p className="text-gray-600">Criar, editar e excluir usuários do sistema</p>
              <p className="text-sm text-gray-500">UID: {currentUser?.uid}</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar um novo usuário no sistema.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do usuário" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ 
                      required: "Senha é obrigatória",
                      minLength: {
                        value: 6,
                        message: "Senha deve ter pelo menos 6 caracteres"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Usuário</FormLabel>
                        <FormControl>
                          <select className="w-full p-2 border rounded-md" {...field}>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Admin</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Criar Usuário
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Edite as informações do usuário.
              </DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <strong>UID:</strong> {editingUser?.uid}
                </div>
                <FormField
                  control={editForm.control}
                  name="name"
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do usuário" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="email"
                  rules={{ 
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Usuário</FormLabel>
                      <FormControl>
                        <select className="w-full p-2 border rounded-md" {...field}>
                          <option value="cliente">Cliente</option>
                          <option value="admin">Admin</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Salvar Alterações
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os usuários do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <div className="space-y-2">
                  <Button onClick={fetchUsers} variant="outline">
                    Tentar Novamente
                  </Button>
                  <Button onClick={handleLogout} variant="destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Fazer Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>UID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="font-mono text-xs">{user.uid}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          user.tipo === 'admin' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.tipo}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.uid)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageUsers;
