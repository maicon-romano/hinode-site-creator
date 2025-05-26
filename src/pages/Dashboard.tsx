
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Globe, Settings, Plus, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Bem-vindo, {userData?.name || userData?.email}
            </p>
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
              {userData?.tipo}
            </span>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData?.tipo === 'admin' && (
            <>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/manage-users')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Usuários
                  </CardTitle>
                  <CardDescription>
                    Gerenciar usuários do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate('/manage-users')}>
                    Gerenciar Usuários
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/manage-sites')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Sites dos Clientes
                  </CardTitle>
                  <CardDescription>
                    Criar e editar sites dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate('/manage-sites')}>
                    Gerenciar Sites
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/system-settings')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configurações
                  </CardTitle>
                  <CardDescription>
                    Configurações gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate('/system-settings')}>
                    Configurações
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {userData?.tipo === 'cliente' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Meu Site
                </CardTitle>
                <CardDescription>
                  Editar as informações do seu site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate(`/cliente/${userData.uid}`)}>
                  Visualizar Site
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {userData?.tipo === 'admin' && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesso rápido às principais funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={() => navigate('/manage-users')} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                  <Button onClick={() => navigate('/manage-sites')} variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
