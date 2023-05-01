FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY __tests__ ./__tests__

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
