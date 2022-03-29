#!/bin/bash

docker-compose -p dev -f ./docker/db/docker-compose.dev.yml down --remove-orphans

echo "Local Postgres instance stopped (if it was running)."
