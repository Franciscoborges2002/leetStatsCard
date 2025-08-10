FROM node:22

# Install Chromium dependencies
#RUN apt-get update && apt-get install -y \
#    wget \
#    ca-certificates \
#    chromium \
#    fonts-liberation \
#    libappindicator3-1 \
#    libasound2 \
#    libatk-bridge2.0-0 \
#    libatk1.0-0 \
#    libcups2 \
#    libdbus-1-3 \
#    libgdk-pixbuf2.0-0 \
#    libnspr4 \
#    libnss3 \
#    libx11-xcb1 \
#    libxcomposite1 \
#    libxdamage1 \
#    libxrandr2 \
#    xdg-utils \
#    --no-install-recommends && rm -rf /var/lib/apt/lists/*

#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install dependencies only when needed
FROM node:22-alpine AS deps

WORKDIR /app

# Install dependencies based on the lock file
COPY package.json package-lock.json* ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy only needed files
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]
