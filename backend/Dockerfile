FROM node:18-alpine
WORKDIR /usr/src/app

# Install deps
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]
