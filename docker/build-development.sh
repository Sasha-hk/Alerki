#!/bin/bash


. ./docker/colors.sh

while read line; do
    export $line;
done < ./docker/.env.development

docker-compose -f ./docker/docker-compose.development.yml build
