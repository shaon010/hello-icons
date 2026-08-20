# syntax=docker/dockerfile:1

# --- deps: install node_modules + generate the Prisma client ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# prisma.config.ts requires DATABASE_URL to be set just to load (postinstall runs `prisma generate`).
ENV DATABASE_URL="file:./build.db"
RUN npm ci

# --- builder: run the actual next build ---
# `/`, `/icons`, and `/categories` are statically prerendered, so `next build`
# queries the database directly — it needs a real, migrated (seeded) db file.
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
COPY . .
ENV DATABASE_URL="file:./build.db"
ENV SESSION_SECRET="build-time-placeholder"
ENV ADMIN_PASSWORD="build-time-placeholder"
RUN npx prisma migrate deploy && npx prisma db seed
RUN npm run build

# --- runner: minimal production image ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:/app/data/prod.db"

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY docker-entrypoint.sh ./

# Drop devDependencies (typescript, tailwind, tsx, eslint, ...) now that the
# build is done — `prisma` itself is a normal dependency so `migrate deploy`
# still works at runtime; seeding is intentionally build-time only.
RUN npm prune --omit=dev && \
    chmod +x docker-entrypoint.sh && \
    mkdir -p /app/data /app/public/icons/uploads && \
    chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
VOLUME ["/app/data", "/app/public/icons/uploads"]

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]
