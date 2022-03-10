FROM node

WORKDIR /app

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
