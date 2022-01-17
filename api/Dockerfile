FROM node

WORKDIR /app/api

COPY package*.json ./

RUN npm install \
    npm i -D jest

COPY . .

EXPOSE 3000
