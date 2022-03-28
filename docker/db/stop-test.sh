#!/bin/bash

docker-compose -p test -f ./docker/db/docker-compose.test.yml down --remove-orphans

echo "Local Postgres instance stopped (if it was running)."
