import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup, Modal, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

function PedidoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  // Pega os dados passados da página de eventos
  const { evento, quantidade } = location.state || {};

  // Se o usuário chegar aqui sem dados, redireciona de volta
  if (!evento) {
    return (
      <div className="text-center">
        <h2>Nenhum ingresso selecionado.</h2>
        <p>Por favor, selecione um evento para continuar.</p>
        <Button onClick={() => navigate('/eventos')}>Ver Eventos</Button>
      </div>
    );
  }

  const handleFinalizarCompra = async () => {
    if (!user) {
      setError("Você precisa estar logado para finalizar a compra.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await api.post('/pedidos', {
        cpfCliente: user.cpf,
        idEvento: evento.id,
        // A API já considera a quantidade como 1, mas se quisesse passar:
        // quantidade: quantidade 
      });

      setLoading(false);
      setCompraFinalizada(true);

    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Não foi possível processar seu pedido.");
      setShowModal(false); // Fecha o modal em caso de erro
    }
  };

  const handleCloseAndRedirect = () => {
    setShowModal(false);
    navigate('/'); // Redireciona para a home
  }

  const precoTotal = evento.valor * quantidade;

  return (
    <>
      <Card>
        <Card.Header as="h2">Confirmação do Pedido</Card.Header>
        <Card.Body>
          <Card.Title>{evento.nome}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Local:</strong> {evento.local}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data:</strong> {new Date(evento.horario).toLocaleString('pt-BR')}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Ingressos:</strong> {quantidade}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Valor Total:</strong> R$ {precoTotal.toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <p className="mt-3 text-muted">Confira os detalhes antes de finalizar a compra.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
            Finalizar Compra
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {compraFinalizada ? "Compra Realizada com Sucesso!" : "Confirmar Pedido"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {compraFinalizada ? (
            <p>Seus ingressos foram encaminhados para o e-mail cadastrado! (ambiente de teste)</p>
          ) : (
            <>
              <h5>Detalhes do Cliente</h5>
              <p>CPF: {user?.cpf}</p>
              <hr />
              <h5>Resumo da Compra</h5>
              <p><strong>Evento:</strong> {evento.nome}</p>
              <p><strong>Ingressos:</strong> {quantidade}</p>
              <p><strong>Total: R$ {precoTotal.toFixed(2)}</strong></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {compraFinalizada ? (
            <Button variant="success" onClick={handleCloseAndRedirect}>
              OK
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleFinalizarCompra} disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Confirmar e Finalizar"}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PedidoPage;