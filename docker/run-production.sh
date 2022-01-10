#!/bin/bash


. ./docker/colors.sh

if [ -f "./docker/.env.production" ]; then 
    while read line; do
        export $line;
    done < ./docker/.env.production

    docker-compose -f ./docker/docker-compose.production.yml build

else 
    echo "${RED}\n - [!] You need to create .env.production file${None}"

fi
