# Estágio 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm install

# Copia o código fonte e compila TypeScript
COPY . .
RUN npx prisma generate
RUN npm run build

# Estágio 2: Imagem final de produção enxuta
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia dependências de produção e artefatos compilados
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --only=production
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
