import { Container } from 'react-bootstrap';

function AppFooter() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container className="text-center">
        <span>© 2025 Ingressos.com - Todos os direitos reservados.</span>
        <p className="mb-0">Contato: (51) 99999-9999 | email@ingressos.com</p>
      </Container>
    </footer>
  );
}

export default AppFooter;