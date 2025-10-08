FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev
RUN npm install -g pm2

COPY . .

EXPOSE 9000

CMD ["pm2-runtime", "src/server.js"]