import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf || !senha) {
      setError('CPF e senha são obrigatórios.');
      return;
    }

    const result = await login(cpf, senha);

    if (result.success) {
      navigate('/eventos'); 
    } else {
      
      setError(result.message || 'Ocorreu um erro desconhecido. Tente novamente.');
    }
  };
  
  // O botão só fica ativo se os campos estiverem preenchidos
  const isFormValid = cpf && senha;

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row>
        <Col md={12}>
          <Card style={{ width: '25rem', padding: '20px' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicCpf">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Digite seu CPF" 
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Digite sua senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={!isFormValid}>
                        Entrar
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;