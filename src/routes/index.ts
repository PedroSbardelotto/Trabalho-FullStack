import 'dotenv/config';
import { z } from 'zod';
import { validate } from '../middleware/validateRequest';
import { 
  criarClienteUser, 
  criarClienteAdmin, 
  loginCliente,
  listarClientes,
  deletarCliente
} from '../controllers/ClienteController';

import { Router } from 'express';
import { criarEvento, listarEventosDisponiveis } from '../controllers/EventoController';
import { criarPedido, relatorioPedidos } from '../controllers/PedidoController';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../config/multer';

const router = Router();


router.post('/clientes', criarClienteUser);
router.post('/login', loginCliente);
router.post('/admin/clientes', criarClienteAdmin);
router.get('/clientes', listarClientes);
router.delete('/clientes/:id', deletarCliente);





router.get('/eventos', listarEventosDisponiveis); 
router.post('/eventos', authMiddleware, upload.single('imagem'), criarEvento);


router.post('/pedidos', authMiddleware, criarPedido);
router.get('/relatorio', authMiddleware, relatorioPedidos);



const createClienteSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
    senha: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  }),
});

router.post('/clientes', validate(createClienteSchema), criarClienteUser);










export default router;