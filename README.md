# Projeto Users Api Node

### 📝 Descrição

Este projeto é uma API REST construída com **Node.js + Express** usando **TypeScript**.  
O projeto também inclui um front-end rodando em **Vite**, executado em paralelo através do **concurrently**.

### 👀 Demonstração

#### Seção de Interação/Funcionalidade

**Cadastro**

Visão geral da tela de cadastro, com animação e validação nos campos.

<img src="Produto/Foto-produto-cadastro.png" alt="Visão geral da tela de cadastro">
<img src="Produto/Foto-produto-cadastro-realizado.png" 
alt="Visão geral da tela de cadastro">

**Login**

Visão geral da tela de loguin, utilizando de validações das informações cadastradas.

<img src="Produto/Foto-produto-loguin.png"
alt="Captura de tela da tela de login">

**Usuário**

Visão geral da tela de informações do usuario, permite que o usuário alterar informações de cadastro

<img src="Produto/Foto-produto-usuario.png"
alt="Captura de tela da tela de informações do usuário">

### 💻 Tecnologias utilizadas

### Backend

- TypeScript
- Node.js
- Express
- CORS
- SQLite
- Sequelize
- Sessions
- Bcrypt
- ts-node-dev (ambiente de desenvolvimento)

### Frontend

- HTML5
- CSS3
- TypeScript
- icomoon
- Vite (ambiente de desenvolvimento front-end)

### Ferramentas de execução

- concurrently (executar back + front juntos)

### 🎯 Objetivos de aprendizado

- Praticar uso de diferentes ambientes de desenvolvimento como `Vite` e `ts-node-dev`.
- Uso do express para configuração de `rotas express`.
- Praticar o uso do `bcrypt` para criptografia de senhas.
- Pratica ao uso de `SQLite` com node a partir do `Sequelize`.
- Uso de `sessions` para armazenamento de dados.

### 📲 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Murilo-front/Users-Api-Node.git meu-projeto
```

2. Acesse a pasta do projeto:

```bash
cd meu-projeto
```

3. Instale as dependências:

```bash
npm install
```

4. Rodar o projeto:

- Backend:

```bash
npm start:back
```

- Front + Back juntos:

```bash
npm run dev
```
