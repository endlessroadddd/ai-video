# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Use pnpm via corepack
RUN corepack enable

# Build-time public env (required by Vite for client bundle injection)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_PUBLISHABLE_KEY=${VITE_SUPABASE_PUBLISHABLE_KEY}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
ARG VITE_KNOWLEDGE_API_BASE_URL
ENV VITE_KNOWLEDGE_API_BASE_URL=${VITE_KNOWLEDGE_API_BASE_URL}
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN test -n "$VITE_SUPABASE_URL" || (echo "Missing build arg VITE_SUPABASE_URL" && exit 1)
RUN test -n "$VITE_SUPABASE_PUBLISHABLE_KEY$VITE_SUPABASE_ANON_KEY" || (echo "Missing build arg VITE_SUPABASE_PUBLISHABLE_KEY" && exit 1)
RUN pnpm build

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["pnpm", "start"]
