# Estágio 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia manifestos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala todas as dependências e gera o Prisma Client
RUN npm ci || npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# Estágio 2: Imagem final enxuta de produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Copia manifestos e instala apenas dependências de produção
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev || npm install --omit=dev

# Copia o Prisma Client já gerado e os artefatos compilados do estágio builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Inicializa o banco SQLite embutido, executa o seed demonstrativo e inicia o servidor
CMD ["sh", "-c", "npx prisma db push && npm run prisma:seed && node dist/server.js"]
