#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# import env variables from .env
set -a

# Example
# OPENSEARCH_NODE="http://localhost:9200"
PORT=$(echo "$OPENSEARCH_NODE" | awk -F':' '{print $3}' | awk -F'\/' '{print $1}')

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ -z "$OPENSEARCH_CONTAINER_NAME" ]; then
  echo "OPENSEARCH_CONTAINER_NAME environment variable is not set"
  exit 1
fi

if [ "$(docker ps -q -f name=$OPENSEARCH_CONTAINER_NAME)" ]; then
  echo "Database container '$OPENSEARCH_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$OPENSEARCH_CONTAINER_NAME)" ]; then
  docker start "$OPENSEARCH_CONTAINER_NAME"
  echo "Existing database container '$OPENSEARCH_CONTAINER_NAME' started"
  exit 0
fi

docker run \
  -it \
  -p $PORT:9200 \
  -p 9600:9600 \
  -e "discovery.type=single-node" \
  -e "DISABLE_SECURITY_PLUGIN=true" \
  --name $OPENSEARCH_CONTAINER_NAME \
  -d opensearchproject/opensearch:latest \
  && echo "OpenSearch container '$OPENSEARCH_CONTAINER_NAME' was successfully created"
