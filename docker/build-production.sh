#!/bin/bash


if [ -f "./docker/.env.production" ]; then 
    while read line; do
        export $line;
    done < ./docker/.env.production

else 
    echo "${RED}\n - [!] You need to create .env.production file${None}"

fi

docker-compose -f ./docker/docker-compose.production.yml build
