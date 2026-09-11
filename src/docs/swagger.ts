export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Talker Manager API',
    description: 'API RESTful profissional para gerenciamento de eventos, palestrantes e avaliações. Desenvolvida com Node.js, TypeScript, PostgreSQL, Prisma ORM, JWT e Zod.',
    version: '2.0.0',
    contact: {
      name: 'Ludson',
      url: 'https://github.com/Ludson96',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'admin@email.com' },
          password: { type: 'string', minLength: 6, example: '123456' },
        },
      },
      Register: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Ludson Silva' },
          email: { type: 'string', format: 'email', example: 'ludson@email.com' },
          password: { type: 'string', minLength: 6, example: '123456' },
        },
      },
      Talk: {
        type: 'object',
        required: ['watchedAt', 'rate'],
        properties: {
          watchedAt: { type: 'string', example: '22/10/2020' },
          rate: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
        },
      },
      Talker: {
        type: 'object',
        required: ['name', 'age', 'talk'],
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Henrique Oliveira' },
          age: { type: 'integer', example: 38 },
          talk: { $ref: '#/components/schemas/Talk' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Register' },
            },
          },
        },
        responses: {
          201: { description: 'Usuário registrado com sucesso' },
          400: { description: 'Erro de validação' },
          409: { description: 'Email já cadastrado' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Autenticar usuário e gerar JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Login' },
            },
          },
        },
        responses: {
          200: { description: 'Autenticado com sucesso, retorna token JWT' },
          400: { description: 'Campos inválidos ou ausentes' },
          401: { description: 'Credenciais inválidas' },
        },
      },
    },
    '/talkers': {
      get: {
        tags: ['Talkers'],
        summary: 'Listar todos os palestrantes',
        responses: {
          200: {
            description: 'Lista de palestrantes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Talker' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Talkers'],
        summary: 'Cadastrar nova pessoa palestrante',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Talker' },
            },
          },
        },
        responses: {
          201: { description: 'Palestrante cadastrado' },
          400: { description: 'Validação falhou' },
          401: { description: 'Token ausente ou inválido' },
        },
      },
    },
    '/talkers/metrics': {
      get: {
        tags: ['Talkers'],
        summary: 'Obter métricas e estatísticas das palestras',
        responses: {
          200: {
            description: 'Métricas gerais calculadas',
          },
        },
      },
    },
    '/talkers/search': {
      get: {
        tags: ['Talkers'],
        summary: 'Buscar palestrantes por termo ou nota',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Termo de busca no nome' },
          { name: 'rate', in: 'query', schema: { type: 'integer' }, description: 'Filtrar por nota (1 a 5)' },
        ],
        responses: {
          200: { description: 'Resultados da busca' },
          401: { description: 'Token não fornecido ou inválido' },
        },
      },
    },
    '/talkers/{id}': {
      get: {
        tags: ['Talkers'],
        summary: 'Buscar palestrante por ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Dados do palestrante' },
          404: { description: 'Pessoa palestrante não encontrada' },
        },
      },
      put: {
        tags: ['Talkers'],
        summary: 'Atualizar palestrante por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Talker' },
            },
          },
        },
        responses: {
          200: { description: 'Palestrante atualizado com sucesso' },
          400: { description: 'Campos inválidos' },
          401: { description: 'Não autorizado' },
          404: { description: 'Palestrante não encontrado' },
        },
      },
      delete: {
        tags: ['Talkers'],
        summary: 'Deletar palestrante por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          204: { description: 'Removido com sucesso' },
          401: { description: 'Não autorizado' },
          404: { description: 'Palestrante não encontrado' },
        },
      },
    },
  },
};
