# Talker Manager API 🗣️

[![Node.js 20](https://img.shields.io/badge/Node.js-20.x-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express 4.17](https://img.shields.io/badge/Express-4.17.1-000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM 6.19](https://img.shields.io/badge/Prisma-6.19.3-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Autonomous-003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3-85EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1.svg?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Jest 29](https://img.shields.io/badge/Jest-29.7.0-C21325.svg?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🇧🇷 **Português** | 🇺🇸 [**English Version**](README.en.md)

API RESTful completa e escalável para **gerenciamento de eventos, palestrantes e palestras**. Projeto desenvolvido com arquitetura em camadas (**Layered / MSC com Repository Pattern**), validação estrita com **Zod**, autenticação segura com **JWT + Bcrypt**, persistência autônoma com **Prisma ORM + SQLite** e documentação interativa com **Swagger (OpenAPI 3.0)**.

## 📌 Navegação Rápida

- [📝 Sobre o Projeto](#-sobre-o-projeto)
- [🖼️ Preview](#️-preview)
- [🌐 Demonstração Online do Swagger](#-demonstração-online-do-swagger)
- [⚡ API Endpoints](#-api-endpoints)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias e Ferramentas Utilizadas](#️-tecnologias-e-ferramentas-utilizadas)
- [🏛️ Arquitetura da Solução](#️-arquitetura-da-solução)
- [📁 Estrutura do Repositório](#-estrutura-do-repositório)
- [💡 Decisões Técnicas](#-decisões-técnicas)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📄 Licença](#-licença)

## 📝 Sobre o Projeto
O **Talker Manager API** é uma solução moderna para cadastro, curadoria e avaliação de palestrantes em eventos de tecnologia e conferências. O projeto foi construído para demonstrar excelência em engenharia de software backend, adotando tipagem estática rigorosa em TypeScript, isolamento de camadas de negócio e infraestrutura, validações declarativas de entrada e containerização com Docker pronta para execução em qualquer ambiente em nuvem.

## 🖼️ Preview
<img src="./images/projeto.gif" alt="Demonstração do App" />

## 🌐 Demonstração Online do Swagger
Acesse a aplicação em produção:
👉 **[Talker Manager API](https://project-talker-manager.onrender.com/api-docs/)**

*(O endpoint raiz `/` redireciona automaticamente para o Swagger interativo)*

## ⚡ API Endpoints

### Autenticação (`/auth`)
| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Cadastra novo usuário com senha criptografada | Não |
| `POST` | `/auth/login` | Autentica usuário e retorna Bearer Token JWT | Não |

### Palestrantes e Palestras (`/talkers`)
| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `GET` | `/talkers` | Lista todas as pessoas palestrantes cadastradas | Não |
| `GET` | `/talkers/:id` | Retorna os detalhes de um palestrante pelo ID | Não |
| `GET` | `/talkers/search?q=termo&rate=5` | Busca palestrantes por termo no nome ou nota | Sim (Bearer) |
| `GET` | `/talkers/metrics` | Retorna estatísticas gerais (média de notas e totais) | Não |
| `POST` | `/talkers` | Cadastra novo palestrante e sua respectiva palestra | Sim (Bearer) |
| `PUT` | `/talkers/:id` | Atualiza os dados cadastrais e palestra de um palestrante | Sim (Bearer) |
| `DELETE` | `/talkers/:id` | Remove um palestrante e seus registros vinculados | Sim (Bearer) |

> 💡 *Nota: Compatibilidade reversa integral com rotas legadas `/talker` e `POST /login` mantida.*

## ✨ Funcionalidades
- **Autenticação e Autorização**: Emissão de JWT seguro com hash de senha via Bcrypt (salt rounds 10).
- **CRUD Completo de Palestrantes**: Cadastro, leitura detalhada, atualização e remoção em cascata.
- **Filtros e Consultas Inteligentes**: Busca combinada por texto (`q`) e avaliação numérica (`rate`).
- **Painel de Métricas**: Cálculo em tempo real da média de satisfação das palestras e contadores globais.
- **Validação Declarativa Estrita**: Schemas Zod impedindo dados inconsistentes antes de chegarem à regra de negócio.
- **Tratamento Centralizado de Erros**: Middleware global mapeando exceções controladas (`AppError`) e de schema (`ZodError`).
- **Seed Demonstrativo Automático**: Inicialização autônoma do banco populando dados de exemplo e usuário admin.

## 🛠️ Tecnologias e Ferramentas Utilizadas

| Camada / Finalidade | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Linguagem Principal** | **TypeScript 5.9.3** | Tipagem estática rigorosa, generics e segurança de tempo de compilação |
| **Ambiente de Execução** | **Node.js 20 LTS** | Runtime assíncrono moderno e de alta performance |
| **Framework Web** | **Express 4.17.1** | Roteamento modular, middlewares desacoplados e ciclo de vida HTTP |
| **Persistência de Dados** | **Prisma ORM 6.19.3** | Mapeamento Objeto-Relacional declarativo, type-safe e migrações ágeis |
| **Banco de Dados** | **SQLite (Embutido)** | Banco relacional SQL autocontido, sem dependência de serviços externos |
| **Validação de Schemas** | **Zod 4.6.2** | Validação declarativa tipada para payloads e parâmetros de consulta |
| **Segurança e Criptografia** | **JWT & BcryptJS** | Assinatura digital de tokens de acesso e hash salt para senhas |
| **Documentação Interativa** | **Swagger UI / OpenAPI 3.0** | Especificação viva e console de testes integrado no navegador |
| **Testes Automatizados** | **Jest 29 & Supertest 7** | Suíte de testes de integração cobrindo endpoints e contratos |
| **Containerização** | **Docker & Docker Compose** | Multi-stage build otimizado gerando imagem Alpine de produção enxuta |

## 🏛️ Arquitetura da Solução
A aplicação segue os princípios de **Arquitetura em Camadas (Layered Architecture / MSC com Repository Pattern)**, promovendo isolamento total entre protocolo HTTP, regras de domínio e acesso a banco de dados:

```
[ Cliente / Swagger / Frontend ]
               │
               ▼
       [ Express Router ]
               │
         ┌─────┴─────┐
         ▼           ▼
[ authMiddleware ]  [ validateRequest (Zod) ]
         │           │
         └─────┬─────┘
               ▼
     [ Controller Layer ]  ──> Extrai params/body e devolve status HTTP
               │
               ▼
      [ Service Layer ]    ──> Regras de negócio, cálculos e validações
               │
               ▼
    [ Repository Layer ]   ──> Isolamento de acesso a dados via Prisma
               │
               ▼
     [ SQLite Database ]   ──> dev.db autocontido e relacional
```

## 📁 Estrutura do Repositório
```text
.
├── prisma/
│   ├── schema.prisma           # Modelagem relacional (User, Talker, Talk)
│   ├── seed.js                 # Seed autônomo com dados de demonstração
│   └── seed.ts                 # Script fonte do seed em TypeScript
├── src/
│   ├── @types/                 # Extensões de tipagem do Express
│   ├── config/                 # Variáveis de ambiente centralizadas e tipadas
│   ├── controllers/            # Controladores HTTP (AuthController, TalkerController)
│   ├── database/               # Instância singleton do Prisma Client
│   ├── docs/                   # Especificação OpenAPI 3.0 do Swagger
│   ├── errors/                 # Classe customizada AppError
│   ├── middlewares/            # Middlewares de Auth, Zod e Tratamento de Erros
│   ├── repositories/           # Camada de acesso ao banco (Repository Pattern)
│   ├── routes/                 # Roteamento modular desacoplado
│   ├── schemas/                # Schemas de validação Zod
│   ├── services/               # Camada de regras de negócio
│   ├── tests/                  # Testes de integração automatizados
│   ├── app.ts                  # Configuração do Express, CORS e Swagger
│   └── server.ts               # Ponto de entrada e bootstrap do servidor
├── Dockerfile                  # Multi-stage build para Docker
├── docker-compose.yml          # Orquestração de containers para desenvolvimento
├── jest.config.js              # Configuração do executor de testes Jest
├── package.json                # Manifesto de dependências e scripts
└── tsconfig.json               # Configurações do compilador TypeScript
```

## 💡 Decisões Técnicas
1. **Banco Autocontido (SQLite com Prisma)**: Similar ao uso de H2 no ecossistema Java, o SQLite elimina a necessidade de infraestrutura pesada de banco para portfólio, garantindo deploy vitalício e gratuito sem expiração.
2. **Reaproveitamento de Artefatos no Docker Multi-Stage**: O estágio de compilação gera os binários do Prisma e o JavaScript compilado em `dist/`, entregando uma imagem final limpa em `node:20-alpine` sem ferramentas desnecessárias.
3. **Repository Pattern sobre o Prisma**: Os Services interagem exclusivamente com interfaces de Repositório. Isso permite trocar a engine de banco ou o ORM no futuro sem alterar uma única linha da regra de negócio.
4. **Tratamento Global com AppError**: O Express captura exceções da aplicação via `express-async-errors` e repassa para o middleware de erro, garantindo respostas padronizadas em JSON sem poluir controllers com blocos `try/catch`.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: Versão 20 ou superior
- **Git** instalado

### 1. Clonar o repositório
```bash
git clone git@github.com:Ludson96/project-talker-manager.git
cd project-talker-manager
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Crie seu arquivo `.env` a partir do modelo:
```bash
cp .env.example .env
```

### 4. Inicializar o Banco de Dados e Rodar o Seed
```bash
npx prisma db push
npm run prisma:seed
```

### 5. Executar a aplicação em desenvolvimento
```bash
npm run dev
```
O servidor estará acessível em `http://localhost:3000`.

### 6. Executar via Docker (Opcional)
```bash
docker build -t talker-manager-api .
docker run -p 3000:3000 talker-manager-api
```

### 7. Executar os Testes Automatizados
```bash
npm test
```

## 📄 Licença
Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).

<div align="center">
  Desenvolvido por <strong>Ludson Pereira dos Santos</strong> 🚀<br />
  <a href="https://www.linkedin.com/in/ludson96/">LinkedIn</a> • <a href="https://github.com/ludson96">GitHub</a> • <a href="mailto:ludson_ps27@hotmail.com">E-mail</a>
</div>
