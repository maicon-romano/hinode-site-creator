
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Sistema Hinode
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma de gerenciamento de sites para representantes Hinode
        </p>
        
        <div className="space-x-4">
          {currentUser ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Bem-vindo, {userData?.name || userData?.email}!
              </p>
              <div className="space-x-4">
                {(userData?.role === 'master' || userData?.role === 'admin') && (
                  <Link to="/dashboard">
                    <Button size="lg">
                      Ir para Dashboard
                    </Button>
                  </Link>
                )}
                {userData?.role === 'cliente' && (
                  <Link to={`/cliente/${userData.uid}`}>
                    <Button size="lg">
                      Ver Meu Site
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button size="lg">
                Fazer Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
