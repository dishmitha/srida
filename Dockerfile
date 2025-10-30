# Root Dockerfile to build the backend when services expect a Dockerfile at repo root
# This simply builds the server located in the backend/ directory.
FROM node:18-alpine

# Set working dir to backend
WORKDIR /usr/src/app/backend

# Copy package files and install dependencies
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --production --silent

# Copy backend source
COPY backend/ ./

# Expose the port (informational)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
