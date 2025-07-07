import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Spinner } from 'react-bootstrap'; // Usaremos um spinner para o feedback visual

function AdminProtectedRoute() {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // 1. Se o contexto ainda estiver carregando, mostre um indicador
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  // 2. Se não estiver autenticado ou não for admin, redirecione
  if (!isAuthenticated || user?.tipo !== 'admin') {
    return <Navigate to="/login" replace />; // Redireciona para o login 
  }

  // 3. Se tudo estiver certo, renderize a página
  return <Outlet />;
}

export default AdminProtectedRoute;