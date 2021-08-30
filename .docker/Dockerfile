FROM node:16.8.0 AS build

WORKDIR /app

COPY ./package-lock.json ./package.json ./

RUN npm ci --no-optional

COPY ./vite.config.js ./index.html ./
COPY ./public /app/public
COPY ./src /app/src

RUN npm run build

FROM nginx:1.21.1-alpine AS production

ARG SERVER_NAME="localhost"
ARG BASE_URL="/"
ARG PORT="80"

ENV SERVER_NAME=$SERVER_NAME
ENV BASE_URL=$BASE_URL
ENV PORT=$PORT

COPY --from=build /app/dist /usr/share/nginx/html
