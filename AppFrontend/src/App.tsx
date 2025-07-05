import { Outlet } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <AppNavbar />
        <main className="flex-grow-1">
          <Container>
            {/* O Outlet renderiza o componente da rota atual (ex: LoginPage) */}
            <Outlet /> 
          </Container>
        </main>
        <AppFooter />
      </div>
    </AuthProvider>
  );
}

export default App;