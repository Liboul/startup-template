#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# import env variables from .env
set -a

# Example
# DATABASE_URL="postgresql://postgres:password@localhost:5432/startup-template"
DB_NAME=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $2}')
DB_CONTAINER_NAME="$DB_NAME-postgres"
DB_USER=$(echo "$DATABASE_URL" | awk -F':' '{print $2}' | awk -F'\/' '{print $3}')
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

docker run \
  --name "$DB_CONTAINER_NAME" \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p "$DB_PORT":5432 \
  -v "$(pwd)/data/postgres:/var/lib/postgresql/data" \
  docker.io/postgres && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
