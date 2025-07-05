import { Outlet } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    // Não há mais AuthProvider aqui
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <AppNavbar />
      <main className="flex-grow-1">
        <Container className="py-4">
          <Outlet /> 
        </Container>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;