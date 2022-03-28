#!/bin/bash

docker-compose -f ./docker/db/docker-compose.dev.yml down --remove-orphans

echo "Local Postgres instance stopped (if it was running)."
