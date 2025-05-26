# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy built files and dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Start the NestJS application
CMD ["node", "dist/main"]

# Expose the port NestJS runs on
EXPOSE 3000