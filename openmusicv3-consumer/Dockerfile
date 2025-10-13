# Dockerfile for OpenMusic v3 Consumer
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S consumer -u 1001

# Change ownership
RUN chown -R consumer:nodejs /app
USER consumer

# Expose port (if needed for health checks)
EXPOSE 3000

# Start the consumer
CMD ["npm", "start"]
