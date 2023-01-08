FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./server.js ./
COPY ./routes ./routes
COPY ./models ./models
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./middleware ./middleware

CMD ["node", "server"]