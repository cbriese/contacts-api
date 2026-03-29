#!/usr/bin/bash

# make a new version of the container and run it

ENV_FILE=.env.dev

# Bring in the environment information
[ -f $ENV_FILE ] && source $ENV_FILE || { echo -e "\n  Error: environment file $ENV_FILE not found!\n" 1>&2; exit 2; }

if [ -z "${CONTAINER_NAME}" ]
then
	echo -e "\n  Error: environment variable CONTAINER_NAME not defined\n" 1>&2
	exit 2
fi

if [ -z "${IMAGE_NAME}" ]
then
	echo -e "\n  Error: environment variable IMAGE_NAME not defined\n" 1>&2
	exit 2
fi

# Stop existing container
echo "Stopping existing container ${CONTAINER_NAME}..."
podman stop ${CONTAINER_NAME}

sleep 3

echo "Removing existing container ${CONTAINER_NAME}..."
podman rm ${CONTAINER_NAME}

# Remove existing image
echo "Removing existing image ${IMAGE_NAME}"
podman image rm ${IMAGE_NAME}

sleep 3

echo "Building new image ${IMAGE_NAME} for container ${CONTAINER_NAME}"
podman build -t ${IMAGE_NAME} .

sleep 3

echo "Running container ${CONTAINER_NAME} using new image ${IMAGE_NAME}"
bash ./run_dev.sh

STATUS=$?

if [ $STATUS -ne 0 ]
then
	echo -e "\n  Error: Something went wrong starting container ${CONTAINER_NAME}" 1>&2
	exit 2
fi

# Wait for the container to start up
sleep 3

echo $(curl -s https://${SERVER_NAME}:${SSL_PORT}/api/status)
