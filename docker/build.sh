#!/bin/sh

while read line; do
  export $line;
done < ./docker/.env.test

docker-compose -f ./docker/docker-compose.yml build

docker-compose -f ./docker/docker-compose.yml up
