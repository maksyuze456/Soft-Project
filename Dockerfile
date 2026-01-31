# Stage 1: Dependencies
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Stage 2: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Sentry auth token for source map uploads during build
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application (Sentry plugin uploads source maps here)
RUN npm run build

# Stage 3: Production
FROM node:22-alpine AS production

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy only necessary files from builder
COPY --from=builder --chown=appuser:nodejs /app/.output ./.output
COPY --from=builder --chown=appuser:nodejs /app/instrument.server.mjs ./instrument.server.mjs
COPY --from=builder --chown=appuser:nodejs /app/package.json ./package.json

# Install only production dependencies for runtime needs (e.g. @sentry/node)
COPY --from=builder --chown=appuser:nodejs /app/package-lock.json ./package-lock.json
RUN npm install --omit=dev && \
    npm pkg delete scripts && \
    rm -rf /root/.npm

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application with Sentry instrumentation
CMD ["node", "--import", "./instrument.server.mjs", "./.output/server/index.mjs"]
