FROM node:22-alpine

WORKDIR /app
COPY package*.json ./

RUN apk add --no-cache postgresql-client
RUN npm ci --only=production \
  && npm install -g pm2 \
  && npm cache clean --force

COPY . .

RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

RUN chown -R appuser:nodejs /app
USER appuser
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["pm2-runtime", "src/server.js"]
