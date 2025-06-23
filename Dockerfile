# Etapa 1 - Build do backend
FROM node:18 as backend-build
WORKDIR /app/backend
COPY backend-conectar ./backend
WORKDIR /app/backend/backend
RUN npm install
RUN npm run build

# Etapa 2 - Build do frontend
FROM node:18 as frontend-build
WORKDIR /app/frontend
COPY frontend-conectar ./frontend
WORKDIR /app/frontend/frontend
RUN npm install
RUN npm run build

# Etapa 3 - Imagem final
FROM node:18
WORKDIR /app
COPY --from=backend-build /app/backend/backend/dist ./dist
COPY --from=backend-build /app/backend/backend/package*.json ./
RUN npm install --only=production

ENV NODE_ENV=production
CMD ["node", "dist/main"]
