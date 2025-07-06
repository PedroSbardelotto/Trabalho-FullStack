import { Container } from 'react-bootstrap';

function AppFooter() {
  return (
    // 'mt-auto' (margin-top: auto) ajuda a empurrar o footer para baixo
    <footer className="footer mt-auto py-3 bg-dark text-white-50">
      <Container className="text-center">
        <span>© 2025 Ingressos.com | Todos os direitos reservados.</span>
      </Container>
    </footer>
  );
}

export default AppFooter;