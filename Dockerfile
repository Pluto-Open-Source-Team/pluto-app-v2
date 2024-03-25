FROM node:21.7.1-bullseye-slim AS base

FROM base AS deps
WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
ARG npm_install_command=ci
RUN \
  if [ -f package-lock.json ]; then npm ${npm_install_command}; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base as build
ENV NODE_ENV=production
RUN apt-get update
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f package-lock.json ]; then npm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base as production
ARG PLUTO_SERVER_PORT=3000
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_TELEMETRY_DISABLED 1 \
    NODE_ENV=production \
    PLUTO_SERVER_PORT=${PLUTO_SERVER_PORT} \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}

RUN groupadd -r plutoadm && useradd -r -m -g plutoadm plutoadm ;\
    mkdir /app && chown plutoadm /app
WORKDIR /app
COPY --from=build /app/public ./public
RUN mkdir .next && chown plutoadm:plutoadm .next

COPY --from=build --chown=plutoadm:plutoadm /app/.next/standalone ./
COPY --from=build --chown=plutoadm:plutoadm /app/.next/static ./.next/static

EXPOSE ${PLUTO_SERVER_PORT}
CMD HOSTNAME="0.0.0.0" node server.js

