#!/usr/bin/env bash
# Use this script to start a docker container for a local development qstash

# import env variables from .env
set -a

QSTASH_CONTAINER_NAME="startup-template-qstash"
QSTASH_PORT=$(echo "$QSTASH_URL" | awk -F':' '{print $3}')

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$QSTASH_CONTAINER_NAME)" ]; then
  echo "Qstash container '$QSTASH_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$QSTASH_CONTAINER_NAME)" ]; then
  docker start "$QSTASH_CONTAINER_NAME"
  echo "Existing qstash container '$QSTASH_CONTAINER_NAME' started"
  exit 0
fi

docker run \
  --name "$QSTASH_CONTAINER_NAME" \
  -p "$QSTASH_PORT:8080" \
  -d \
  public.ecr.aws/upstash/qstash:latest \
  qstash dev && echo "Qstash container '$QSTASH_CONTAINER_NAME' was successfully created"
