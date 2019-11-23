FROM node:12.8.0-alpine

RUN mkdir -p /home/react/app

WORKDIR /home/react/app

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . .

CMD npm start