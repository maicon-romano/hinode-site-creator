
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientSite from "./pages/ClientSite";
import ManageUsers from "./pages/ManageUsers";
import ManageSites from "./pages/ManageSites";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['master', 'admin', 'cliente']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manage-users" 
              element={
                <ProtectedRoute allowedRoles={['master', 'admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manage-sites" 
              element={
                <ProtectedRoute allowedRoles={['master', 'admin']}>
                  <ManageSites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/system-settings" 
              element={
                <ProtectedRoute allowedRoles={['master', 'admin']}>
                  <SystemSettings />
                </ProtectedRoute>
              } 
            />
            <Route path="/cliente/:id" element={<ClientSite />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
