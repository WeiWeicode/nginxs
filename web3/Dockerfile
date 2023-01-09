FROM node:14

WORKDIR /usr/src/app

COPY ./babel.config.js ./
COPY ./package.json ./
COPY ./vue.config.js ./

RUN npm install

COPY ./public ./public
COPY ./src ./src


CMD ["npm", "run", "serve"]