# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install image processing tools (for WebP to JPEG conversion)
RUN apt-get update && apt-get install -y webp imagemagick && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDeps for build)
RUN npm install

# Copy source files
COPY . .

# Convert WebP files with .jpg extension to real JPEG (fixes "Image corrupt" errors)
RUN find /app/public -name "*.jpg" -type f | while read -r img; do \
      if head -c 12 "$img" | grep -q "WEBP"; then \
        echo "Converting WebP->JPEG: $img"; \
        convert "$img" -quality 85 "$img.tmp" && mv "$img.tmp" "$img"; \
      fi; \
    done

# Build frontend and server
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy build artifacts from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
COPY --from=builder /app/public ./public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
