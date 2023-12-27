# Reference: https://pnpm.io/docker
FROM node:20 as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --chown=node:node . /usr/src/app

WORKDIR /usr/src/app

### 
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

###
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

###
FROM node:20-alpine

COPY --chown=node:node --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
