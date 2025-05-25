import { Router } from 'express';
import { criarCliente, login } from '../controllers/ClienteController';
import { criarEvento, listarEventos } from '../controllers/EventoController';
import { criarPedido, relatorioPedidos } from '../controllers/PedidoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/clientes', criarCliente);
router.post('/login', login);

router.post('/eventos', authMiddleware, criarEvento);
router.get('/eventos', listarEventos);

router.post('/pedidos', authMiddleware, criarPedido);
router.get('/relatorio', authMiddleware, relatorioPedidos);

export default router;