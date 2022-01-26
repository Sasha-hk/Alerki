#!/bin/bash


if [ -f "./docker/.env.production" ]; then 
    while read line; do
        export $line;
    done < ./docker/.env.production

else 
    echo "${RED}\n - [!] You need to fill .env.production file${None}"
    touch ./docker/.env.production
fi

docker-compose -f ./docker/docker-compose.production.yml build
