import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Row } from 'react-bootstrap'; // Importe o Row
import EventoCard from '../components/EventoCard'; // Importe o Card

interface Evento {
  id: string;
  nome: string;
  local: string;
  horario: string;
  valor: number;
  imagem?: string;
  quantidadeDisponivel: number;
}

function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  return (
    <div>
      <h1 className="mb-4">Eventos Disponíveis</h1>
      {eventos.length === 0 ? (
        <p>Nenhum evento disponível no momento.</p>
      ) : (
        <Row>
          {/* Mapeia a lista de eventos e renderiza um Card para cada um */}
          {eventos.map(evento => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </Row>
      )}
    </div>
  );
}
export default EventosPage;