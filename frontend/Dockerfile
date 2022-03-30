FROM node:17-alpine3.14

WORKDIR /app

COPY yarn.lock /app/

RUN yarn run install

COPY . /app/

RUN yarn run build

CMD ["yarn", "run", "start"]
