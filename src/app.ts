import express from 'express';
import cors from 'cors';
import router from './routes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/api', router);
export default app;
