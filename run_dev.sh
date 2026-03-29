#!/bin/bash

# Bring in the environment
source .env.dev

required_variables=("CERTS_DIR" "IMAGE_NAME" "CONTAINER_NAME" "SERVER_NAME" "SSL_PORT"
	"DB_HOST" "DB_NAME")


for var in ${required_variables[@]}; do
	if [ -z "${!var}" ]
	then
		echo -e "\n  Error: environment variable ${var} not defined\n" 1>&2
		exit 2
	fi
done

podman run -d \
	--replace \
	--name ${CONTAINER_NAME} \
	--network=host \
	-p ${SSL_PORT}:${SSL_PORT} \
	-e SERVER_NAME=${SERVER_NAME} \
	-e DB_HOST=${DB_HOST} \
	-e DB_NAME=${DB_NAME} \
	--secret contacts_db_username,type=env,target=DB_USER \
	--secret contacts_db_password,type=env,target=DB_PASSWORD \
	-v ${CERTS_DIR}:/etc/ssl:ro,Z \
	${IMAGE_NAME}

STATUS=$?

if [ $STATUS -ne 0 ]
then
	echo -e "\n  Error: podman run returned status code $STATUS\n\n"
fi
