FROM oven/bun AS build

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=node:22 /usr/local/bin/node /usr/local/bin/node
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun

WORKDIR /usr/src/app

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=node:22 /usr/local/bin/node /usr/local/bin/node
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./bun.lock ./bun.lock
COPY --from=build /usr/src/app/dist ./dist

CMD [ "bun", "run", "dist/index.js" ]
