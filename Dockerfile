# Dockerfile for Cloud Run
FROM node:20-bullseye

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV=production
ENV PORT=8080

# copy package + lock first for caching
COPY package.json pnpm-lock.yaml* ./

# install pnpm and deps
RUN npm i -g pnpm@10 \
 && pnpm install --frozen-lockfile

# copy sources and build (uses your package.json "build" script)
COPY . .
RUN pnpm build

EXPOSE 8080

# production entry (your package.json start -> node dist/index.js)
CMD ["node","dist/index.js"]
