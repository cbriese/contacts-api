#!/bin/bash

# Bring in the environment
source .env.dev

if [ -z "${CERTS_DIR}" ]
then
	echo -e "\n  Error: environment variable CERTS_DIR not defined\n\n" 1>&2
	exit 2
fi

if [ -z "${IMAGE_NAME}" ]
then
	echo -e "\n  Error: environment variable IMAGE_NAME not defined\n\n" 1>&2
	exit 2
fi

if [ -z "${CONTAINER_NAME}" ]
then
	echo -e "\n  Error: environment variable CONTAINER_NAME not defined\n\n" 1>&2
	exit 2
fi

if [ -z "${SERVER_NAME}" ]
then
	echo -e "\n  Error: environment variable SERVER_NAME is not defined\n\n" 1>&2
	exit 2
fi

if [ -z "${SSL_PORT}" ]
then
	echo -e "\n  Error: environment variable SSL_PORT is not defined\n\n" 1>&2
	exit 2
fi


podman run -d \
	--replace \
	--name ${CONTAINER_NAME} \
	-p ${SSL_PORT}:${SSL_PORT} \
	-e SERVER_NAME=${SERVER_NAME} \
	-v ${CERTS_DIR}:/etc/ssl:ro,Z \
	${IMAGE_NAME}

STATUS=$?

if [ $STATUS -ne 0 ]
then
	echo -e "\n  Error: podman run returned status code $STATUS\n\n"
fi
