FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /dashboard
COPY dashboard/package.json .
COPY dashboard/.next/ .next/
COPY dashboard/public/ public
COPY dashboard/next.config.js .
COPY node_modules/ node_modules/

EXPOSE 3000
CMD yarn start