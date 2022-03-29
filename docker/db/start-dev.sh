#!/bin/bash

docker-compose -p dev -f ./docker/db/docker-compose.dev.yml up -d

echo "Local Postgres instance is ready for development."
