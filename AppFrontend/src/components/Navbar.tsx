import { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function AppNavbar() {
  // 1. Acessamos o estado de autenticação e as funções do nosso contexto
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('Dados do usuário no Navbar:', user);
  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate('/login'); // Redireciona o usuário para a página de login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Ingressos.com
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/eventos">
              Eventos
            </Nav.Link>

            {/* 2. Lógica de renderização condicional */}
            {isAuthenticated ? (
              // Se o usuário ESTÁ LOGADO
              <>
                {user?.tipo === 'admin' && (
                  <Nav.Link as={NavLink} to="/admin/eventos/novo">
                    Cadastrar Evento
                  </Nav.Link>
                )}
                <NavDropdown title={`Olá, ${user?.nome}`} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>
                    Sair
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (

              <>
                <Nav.Link as={NavLink} to="/cadastro">
                  Cadastrar
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;