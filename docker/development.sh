#!/bin/bash


while read line; do
    export $line;
done < .env.development

docker-compose -f docker-compose.development.yml build
