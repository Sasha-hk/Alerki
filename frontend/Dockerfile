FROM node

WORKDIR /app/frontnend

COPY package*.json ./

RUN npm update && npm install

COPY . .

EXPOSE 3000
