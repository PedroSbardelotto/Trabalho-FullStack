import { Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  // Hook para controlar a navegação
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Bem-vindo ao nosso Portal de Eventos!</h1>
      <p className="lead text-muted">Navegue pelos eventos disponíveis no menu acima ou crie sua conta para começar.</p>

      {/* Adicionando um container para centralizar o card */}
      <div className="d-flex justify-content-center mt-5">
        <Card style={{ width: '30rem' }} className="p-3">
          <Card.Body>
            <Card.Title>Pronto para Começar?</Card.Title>
            <Card.Text>
              Clique no botão abaixo para fazer seu cadastro. Caso já seja cliente, faça seu login.
            </Card.Text>
            
            {/* O componente Stack ajuda a alinhar os botões lado a lado com um espaçamento */}
            <Stack direction="horizontal" gap={3} className="justify-content-center">
              <Button variant="primary" size="lg" onClick={() => navigate('/cadastro')}>
                Quero me Cadastrar
              </Button>
              <Button variant="outline-secondary" size="lg" onClick={() => navigate('/login')}>
                Fazer Login
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;