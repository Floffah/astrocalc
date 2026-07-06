FROM oven/bun:latest AS build

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=node:22 /usr/local/bin/node /usr/local/bin/node
COPY . .

RUN apt-get update && apt-get install -y build-essential python3

RUN bun install
RUN bun run build

FROM oven/bun:latest

WORKDIR /usr/src/app

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=node:22 /usr/local/bin/node /usr/local/bin/node

COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./bun.lock ./bun.lock
COPY ./swisseph/ephe ./swisseph/ephe

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules/node-gyp-build ./node_modules/node-gyp-build
COPY --from=build /usr/src/app/node_modules/sweph/prebuilds ./dist/prebuilds

CMD [ "bun", "run", "dist/index.js" ]
