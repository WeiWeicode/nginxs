FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./server.js ./
COPY ./routes ./routes
COPY ./models ./models
COPY ./Images ./Images
COPY ./config ./config
COPY ./controllers ./controllers

CMD ["npm","run","dev"]