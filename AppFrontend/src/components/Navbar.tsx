import { useContext } from 'react'; // Importe o useContext
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Importe o AuthContext

function AppNavbar() {
  const { isAuthenticated, user } = useContext(AuthContext); // Pegue o user do contexto

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Ingressos.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/eventos">Eventos</Nav.Link>

            {/* Renderização Condicional do Link */}
            {isAuthenticated && user?.tipo === 'admin' && (
              <Nav.Link as={NavLink} to="/admin/eventos/novo">Cadastrar Evento</Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;