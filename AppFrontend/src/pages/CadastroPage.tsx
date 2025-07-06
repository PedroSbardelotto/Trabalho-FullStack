
import { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/clientes', { nome, email, cpf, senha });
      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => navigate('/login'), 3000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Crie sua Conta</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CPF (somente números)</Form.Label>
            <Form.Control type="text" value={cpf} onChange={e => setCpf(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </Form.Group>
          
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Cadastrar'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CadastroPage;