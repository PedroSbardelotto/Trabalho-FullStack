import { useState } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// O tipo Evento deve ser o mesmo que definimos na EventosPage
interface Evento {
  id: string;
  nome: string;
  local: string;
  horario: string;
  valor: number;
  imagem?: string;
  quantidadeDisponivel: number;
}

interface EventoCardProps {
  evento: Evento;
}

function EventoCard({ evento }: EventoCardProps) {
  const [quantidade, setQuantidade] = useState(1);
  const navigate = useNavigate();

  const handleCompraClick = () => {
    // Navega para a página de confirmação, passando os dados do evento e a quantidade
    // via 'state' do react-router-dom
    navigate('/pedido', { state: { evento, quantidade } });
  };

  // Formata a data para uma melhor leitura
  const dataFormatada = new Date(evento.horario).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100">
        <Card.Img 
            variant="top" 
            src={evento.imagem ? `http://localhost:3000/uploads/${evento.imagem}` : 'https://via.placeholder.com/400x200'} 
            style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{evento.nome}</Card.Title>
          <Card.Text>
            <strong>Local:</strong> {evento.local} <br />
            <strong>Data:</strong> {dataFormatada} <br />
            <strong>Valor:</strong> R$ {evento.valor.toFixed(2)}
          </Card.Text>
          
          <div className="mt-auto">
            <Form.Group as={Row} className="align-items-center mb-3">
              <Col xs="auto">
                <Form.Label className="mb-0">Ingressos:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  min="1"
                  max={evento.quantidadeDisponivel}
                />
              </Col>
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" onClick={handleCompraClick}>
                Comprar Ingressos
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default EventoCard;