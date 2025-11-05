# BASE IMAGE
FROM node:22-alpine AS base

# Stage 1: Dependencies
FROM base AS dependencies
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev && npm cache clean --force

# Stage 2: Build
FROM base AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci && npm cache clean --force

COPY . .

RUN npx prisma generate && npm run build

# Stage 3: Production
FROM base AS production
WORKDIR /app
RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

COPY --from=dependencies --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated
COPY --chown=nestjs:nodejs package*.json ./

ENV NODE_ENV=production
ENV PORT=5000

USER nestjs

EXPOSE 5000

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/src/main"]
