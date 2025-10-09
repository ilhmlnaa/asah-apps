FROM node:22-slim

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production \
  && npm install -g pm2 \
  && npm cache clean --force

COPY . .

EXPOSE 5000


CMD ["pm2-runtime", "src/server.js"]
