// import app from './app';

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

import app from './app';
import database from './database';

const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados e então inicia o servidor
database.connection.sync({ force: false }).then(() => { // use { force: true } para recriar o banco em dev
  console.log('Banco de dados conectado e sincronizado.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
});