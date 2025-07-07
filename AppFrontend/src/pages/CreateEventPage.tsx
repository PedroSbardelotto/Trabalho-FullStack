import { useContext, useState } from 'react';
import { Form, Button, Card, Alert, Spinner, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

function CreateEventPage() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [horario, setHorario] = useState('');
  const [valor, setValor] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData();
    
    formData.append('nome', nome);
    formData.append('local', local);
    formData.append('horario', new Date(horario).toISOString());
    formData.append('valor', valor);
    formData.append('quantidadeDisponivel', quantidadeDisponivel);
    formData.append('cpf', user?.cpf!)
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      await api.post('/eventos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Evento cadastrado com sucesso!');
      setTimeout(() => navigate('/eventos'), 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar evento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Cadastrar Novo Evento</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Evento</Form.Label>
            <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </Form.Group>
          
          {/* INÍCIO DOS CAMPOS CORRIGIDOS */}
          <Form.Group className="mb-3">
            <Form.Label>Local</Form.Label>
            <Form.Control type="text" value={local} onChange={e => setLocal(e.target.value)} required />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Horário</Form.Label>
                <Form.Control type="datetime-local" value={horario} onChange={e => setHorario(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Ingressos Disponíveis</Form.Label>
                <Form.Control type="number" value={quantidadeDisponivel} onChange={e => setQuantidadeDisponivel(e.target.value)} required />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Imagem do Evento</Form.Label>
            <Form.Control type="file" onChange={e => setImagem((e.target as HTMLInputElement).files?.[0] || null)} />
          </Form.Group>
          {/* FIM DOS CAMPOS CORRIGIDOS */}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Cadastrar Evento'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateEventPage;