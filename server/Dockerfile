FROM node:12.8.0-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --silent

COPY . .

CMD npm start