FROM node

WORKDIR /app/api

COPY package*.json ./

RUN npm update && npm install

COPY . .

EXPOSE 3001
