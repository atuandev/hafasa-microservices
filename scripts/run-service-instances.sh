#!/bin/bash

# This script starts multiple instances of a service on different ports
# Usage: ./run-service-instances.sh <service-name> <base-port> <number-of-instances>

SERVICE_NAME=$1
BASE_PORT=$2
INSTANCES=$3

if [ -z "$SERVICE_NAME" ] || [ -z "$BASE_PORT" ] || [ -z "$INSTANCES" ]; then
  echo "Usage: ./run-service-instances.sh <service-name> <base-port> <number-of-instances>"
  exit 1
fi

echo "Starting $INSTANCES instances of $SERVICE_NAME..."

for (( i=0; i<$INSTANCES; i++ ))
do
  PORT=$(($BASE_PORT + $i))
  echo "Starting $SERVICE_NAME instance on port $PORT"
  cd "../$SERVICE_NAME"
  mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=$PORT --eureka.instance.instance-id=${SERVICE_NAME}:${PORT}" &
done

echo "All instances started successfully!"