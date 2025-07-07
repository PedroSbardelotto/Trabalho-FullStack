import { useContext } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // 1. Importe o AuthContext

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext); // 2. Acesse o estado de autenticação e o usuário

  return (
    <div className="text-center">
      <h1>Bem-vindo ao nosso Portal de Eventos!</h1>
      
      {/* 3. Lógica de renderização condicional */}
      {isAuthenticated ? (
        // Se o usuário ESTÁ LOGADO, mostre uma saudação
        <p className="lead text-muted mt-3">
          Olá, {user?.nome}! Explore os eventos no menu acima.
        </p>
      ) : (
        // Se NÃO ESTÁ LOGADO, mostre o card de cadastro/login
        <>
          <p className="lead text-muted">
            Navegue pelos eventos disponíveis no menu acima ou crie sua conta para começar.
          </p>
          <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '30rem' }} className="p-3">
              <Card.Body>
                <Card.Title>Pronto para Começar?</Card.Title>
                <Card.Text>
                  Clique no botão abaixo para fazer seu cadastro. Caso já seja cliente, faça seu login.
                </Card.Text>
                
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
        </>
      )}
    </div>
  );
}

export default HomePage;