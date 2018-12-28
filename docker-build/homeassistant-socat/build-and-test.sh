#!/bin/bash
clear
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mkdir -p "$DIR/config"

TAG="homeassistant/socat:latest"

COUNT=$( docker ps -a | grep "$TAG" | wc -l )
if [ "$COUNT" == "0" ] ; then
  echo " "
else
  docker ps -a | grep "homeassistant/socat" | awk '{print $1}' | xargs docker stop
  docker ps -a | grep "homeassistant/socat" | awk '{print $1}' | xargs docker rm
fi

docker build -t "$TAG" .
docker image list | grep "$TAG"

exit 0

docker run -d \
  -e "SOCAT_ZWAVE_HOST=127.0.0.1" \
  -e "SOCAT_ZWAVE_PORT=7676" \
  -e "SOCAT_ZWAVE_LINK=/dev/zwave" \
  -p "9123:8123" \
  --mount type=bind,source="$DIR/config",target=/config \
  "$TAG"
