#!/bin/bash


. ./docker/colors.sh

while read line; do
    export $line;
done < ./docker/.env.test

docker-compose -f ./docker/docker-compose.test.yml build
