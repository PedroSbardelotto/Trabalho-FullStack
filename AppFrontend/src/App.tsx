import { Outlet } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    // A classe 'd-flex flex-column' do Bootstrap é usada para criar o layout
    // que mantém o footer na parte de baixo da tela.
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <AppNavbar />

      {/* A classe 'flex-grow-1' faz com que esta área ocupe todo o espaço disponível */}
      <main className="flex-grow-1">
        <Container className="py-4">
          {/* O Outlet renderiza a página atual (Home, Login, etc.) aqui dentro */}
          <Outlet />
        </Container>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;