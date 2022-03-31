# Packages stage
FROM node:17-alpine3.14 AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Build stage
FROM node:17-alpine3.14 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Run stage
FROM node:17-alpine3.14 AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/ .
COPY --from=builder --chown=nextjs:nodejs /app/ .

USER nextjs

CMD ["yarn", "start"]
