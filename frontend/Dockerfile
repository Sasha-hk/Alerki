FROM node:17-alpine3.14

WORKDIR /app

COPY yarn.lock /app/

RUN yarn install

COPY . /app/

RUN yarn build

CMD ["yarn", "run", "start"]
