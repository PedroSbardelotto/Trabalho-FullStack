import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function AdminProtectedRoute() {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Se o usuário não está logado ou não é admin, redireciona para a home
  if (!isAuthenticated || user?.tipo !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Se for admin, permite o acesso à página
  return <Outlet />;
}

export default AdminProtectedRoute;