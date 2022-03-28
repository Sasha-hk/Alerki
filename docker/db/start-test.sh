#!/bin/bash

docker-compose -f ./docker/db/docker-compose.test.yml up -d

echo "Local Postgres instance is ready for development."
