# Talker Manager API 🗣️

[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](http://localhost:3000/api-docs)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

API RESTful completa e escalável para **gerenciamento de eventos, palestrantes e palestras**. Projeto refatorado e elevado a padrão corporativo, utilizando arquitetura em camadas (**Layered / MSC com Repository Pattern**), validação estrita com **Zod**, autenticação segura com **JWT + Bcrypt**, persistência relacional com **PostgreSQL + Prisma ORM** e documentação interativa com **Swagger (OpenAPI 3.0)**.

---

## 🚀 Principais Tecnologias & Destaques de Arquitetura

- **TypeScript**: Tipagem estática rigorosa em todo o ciclo da aplicação.
- **Arquitetura em Camadas**:
  - `Routes`: Definição e roteamento desacoplado.
  - `Middlewares`: Autenticação JWT, validação de schema e tratamento centralizado de erros.
  - `Controllers`: Gerenciamento de status HTTP e payloads.
  - `Services`: Regras de negócio, cálculos e validações de domínio.
  - `Repositories`: Isolamento da camada de dados com Prisma ORM.
- **Validação com Zod**: Validação declarativa de entrada para corpo e query params.
- **Autenticação Segura**: Hashing de senha com `bcryptjs` e emissão de tokens JWT com expiração.
- **Tratamento Global de Erros**: Middleware customizado (`errorMiddleware`) e classe `AppError`, eliminando blocos `try/catch` repetitivos.
- **Documentação OpenAPI / Swagger**: Interface interativa completa disponível em `/api-docs`.

---

## 🏗️ Estrutura do Projeto

```text
src/
├── @types/                 # Definições de tipagem global
├── config/                 # Variáveis de ambiente validadas
├── controllers/            # Controladores da aplicação (Auth, Talker)
├── database/               # Instância singleton do Prisma Client
├── docs/                   # Especificação OpenAPI 3.0 (Swagger)
├── errors/                 # Classe customizada AppError
├── middlewares/            # Auth JWT, ErrorHandler global e validador Zod
├── repositories/           # Acesso ao banco com Prisma
├── routes/                 # Definição e agrupamento de rotas
├── schemas/                # Schemas de validação Zod (Auth, Talker)
├── services/               # Regras de negócio da aplicação
├── app.ts                  # Configuração do Express, CORS e Swagger
└── server.ts               # Ponto de entrada e listener HTTP
prisma/
├── schema.prisma           # Modelos de dados relacionais (User, Talker, Talk)
└── seed.ts                 # Script de população inicial do banco
```

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- Docker & Docker Compose (para o PostgreSQL)

### 1. Clonar o repositório
```bash
git clone git@github.com:Ludson96/project-talker-manager.git
cd project-talker-manager
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 4. Subir o Banco de Dados (PostgreSQL)
```bash
docker-compose up -d
```

### 5. Executar as Migrações e o Seed
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 6. Iniciar o servidor em desenvolvimento
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

---

## 📑 Documentação da API (Swagger)

Com o servidor rodando, acesse a documentação interativa no navegador para testar todos os endpoints:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 📍 Principais Endpoints

### Autenticação (`/auth`)
| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Cria um novo usuário | Não |
| `POST` | `/auth/login` | Autentica e retorna JWT | Não |

### Palestrantes (`/talkers`)
| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `GET` | `/talkers` | Lista todos os palestrantes | Não |
| `GET` | `/talkers/:id` | Busca palestrante por ID | Não |
| `GET` | `/talkers/search?q=nome&rate=5` | Busca com filtros | Sim (Bearer) |
| `GET` | `/talkers/metrics` | Estatísticas gerais (médias, totais) | Não |
| `POST` | `/talkers` | Cadastra novo palestrante | Sim (Bearer) |
| `PUT` | `/talkers/:id` | Atualiza palestrante por ID | Sim (Bearer) |
| `DELETE`| `/talkers/:id` | Remove palestrante | Sim (Bearer) |

> 💡 *Nota: As rotas legadas `/talker` e `POST /login` permanecem ativas garantindo 100% de compatibilidade reversa.*

---

## 🧪 Testes Automatizados

Para executar os testes de integração:
```bash
npm test
```

---

## 👨‍💻 Autor
Desenvolvido por **Ludson** - [GitHub](https://github.com/Ludson96)
