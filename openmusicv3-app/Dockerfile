FROM node:22-slim

WORKDIR /app
COPY package*.json ./

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*
RUN npm ci --only=production \
  && npm install -g pm2 \
  && npm cache clean --force

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["pm2-runtime", "src/server.js"]
