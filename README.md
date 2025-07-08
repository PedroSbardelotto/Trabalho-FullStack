# 🎟️ Sistema de Venda de Ingressos - Full-Stack

Este projeto é uma aplicação web full-stack desenvolvida como um trabalho acadêmico, simulando um portal para venda de ingressos de eventos. A solução é composta por um back-end (API RESTful) em Node.js e um front-end em React, contemplando funcionalidades como autenticação de usuários, controle de acesso baseado em permissões e um fluxo completo de criação e compra de ingressos.

## ✨ Funcionalidades Principais

A aplicação possui dois níveis de acesso: **Usuário Comum** e **Administrador**, cada um com suas respectivas permissões e funcionalidades.

### 🌐 Funcionalidades Públicas (para todos os visitantes)

  - **Cadastro de Clientes:** Novos usuários podem criar uma conta fornecendo nome, e-mail, CPF e senha. Por padrão, todo novo cadastro é do tipo `user`.
  - **Login de Usuários:** Usuários cadastrados podem se autenticar usando CPF e senha.
  - **Listagem de Eventos:** Qualquer visitante pode visualizar a lista de eventos disponíveis, que são exibidos em cards responsivos. Só aparecem na lista os eventos que ainda possuem ingressos (`quantidadeDisponivel > 0`).

### 👤 Funcionalidades do Usuário Comum (autenticado)

  - **Compra de Ingressos:** Após o login, um usuário pode selecionar um evento e iniciar o processo de compra.
  - **Confirmação de Pedido:** O usuário é direcionado para uma tela de resumo para confirmar os detalhes do evento e a quantidade de ingressos antes de finalizar a compra.
  - **Interface Dinâmica:** O menu de navegação é alterado após o login, exibindo uma saudação com o nome do usuário e um botão de "Sair", enquanto oculta as opções de "Login" e "Cadastro".

### 👑 Funcionalidades do Administrador (autenticado com `tipo: 'admin'`)

  - **Acesso Exclusivo:** Apenas administradores têm acesso a funcionalidades de gerenciamento.
  - **Cadastro de Eventos:** O link "Cadastrar Evento" aparece no menu de navegação somente para administradores. A rota é protegida no back-end e no front-end, impedindo o acesso de usuários comuns.
  - **Gerenciamento de Dados (via API):** Foram criados endpoints de API para que o administrador possa listar e deletar clientes para fins de teste e gerenciamento.

-----

## 🛠️ Tecnologias Utilizadas

### Back-end

  - **Node.js:** Ambiente de execução JavaScript no servidor.
  - **Express.js:** Framework para a construção da API RESTful e gerenciamento de rotas.
  - **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
  - **Sequelize:** ORM (Object-Relational Mapper) para interagir com o banco de dados.
  - **SQLite:** Banco de dados relacional baseado em arquivo, utilizado para desenvolvimento.
  - **JSON Web Tokens (JWT):** Para a criação de tokens de sessão e autenticação de rotas.
  - **bcryptjs:** Para a criptografia (hashing) segura de senhas de usuários.
  - **cors:** Middleware para permitir requisições Cross-Origin do front-end.
  - **ts-node-dev:** Ferramenta para rodar o ambiente de desenvolvimento com recarregamento automático.

### Front-end

  - **React:** Biblioteca para a construção da interface de usuário em componentes.
  - **Vite:** Ferramenta de build moderna e rápida para projetos front-end.
  - **TypeScript:** Para adicionar segurança de tipos aos componentes e lógica do React.
  - **React Router DOM:** Para o gerenciamento de rotas e navegação (SPA).
  - **Axios:** Cliente HTTP para fazer as requisições para a API.
  - **React Bootstrap:** Biblioteca de componentes de UI para um design responsivo.
  - **Context API:** Para o gerenciamento de estado global de autenticação.

-----

## 🚀 Como Executar a Aplicação

Para rodar este projeto, você precisará ter o **Node.js** (versão 16 ou superior) e o **npm** instalados. O projeto é dividido em duas partes (back-end e front-end) e cada uma deve ser executada em seu próprio terminal.

### 1\. Executando o Back-end (API)

```bash
# Navegue até a pasta do projeto back-end
cd caminho/para/seu/Trabalho-FullStack-main

# Instale as dependências
npm install

# Crie o arquivo .env na raiz do projeto e adicione a linha abaixo
# JWT_SECRET=sua_chave_super_secreta_aqui

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

O servidor back-end estará rodando em `http://localhost:3000`.

### 2\. Executando o Front-end

```bash
# Em um NOVO terminal, navegue até a pasta do projeto front-end
cd caminho/para/seu/appfrontend

# Instale as dependências
npm install

# Inicie a aplicação React
npm run dev
```

A aplicação front-end estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

-----

## 🗺️ Principais Endpoints da API

  - `POST /api/clientes`: Cadastra um novo cliente (tipo `user`).
  - `POST /api/admin/clientes`: Cadastra um novo cliente (tipo `admin`).
  - `GET /api/clientes`: Lista todos os clientes.
  - `DELETE /api/clientes/:id`: Deleta um cliente específico.
  - `POST /api/login`: Autentica um usuário e retorna um token JWT.
  - `POST /api/eventos`: **(Rota de admin)** Cadastra um novo evento.
  - `GET /api/eventos`: Lista todos os eventos com ingressos disponíveis.
  - `POST /api/pedidos`: **(Rota autenticada)** Cria um novo pedido (compra de ingresso).
  - `GET /api/relatorio`: **(Rota autenticada)** Retorna um relatório de pedidos.