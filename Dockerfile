# Root Dockerfile for srida backend
FROM node:18-alpine

# Install dependencies required for health check
RUN apk add --no-cache curl

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production --quiet

# Copy app source
COPY backend/ ./

# Expose port
EXPOSE 5000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Start the server
CMD ["node", "server.js"]
