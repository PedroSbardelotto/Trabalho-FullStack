import 'dotenv/config';
import { Router } from 'express';
import { criarCliente, loginCliente } from '../controllers/ClienteController';
import { criarEvento, listarEventosDisponiveis } from '../controllers/EventoController';
import { criarPedido, relatorioPedidos } from '../controllers/PedidoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();


router.post('/clientes', criarCliente);
router.post('/login', loginCliente);


router.post('/eventos', authMiddleware, criarEvento);
router.get('/eventos', listarEventosDisponiveis); 

router.post('/pedidos', authMiddleware, criarPedido);
router.get('/relatorio', authMiddleware, relatorioPedidos);

export default router;