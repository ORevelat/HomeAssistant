#!/bin/bash
clear
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mkdir -p "$DIR/conf"
mkdir -p "$DIR/confhass"

TAG="appdaemon/gammu:latest"

COUNT=$( docker ps -a | grep "$TAG" | wc -l )
if [ "$COUNT" == "0" ] ; then
  echo " "
else
  docker ps -a | grep "appdaemon/gammu" | awk '{print $1}' | xargs docker stop
  docker ps -a | grep "appdaemon/gammu" | awk '{print $1}' | xargs docker rm
fi

docker build -t "$TAG" .
docker image list | grep "$TAG"

exit 0

docker run -d \
  --mount type=bind,source="$DIR/conf",target=/conf \
  --mount type=bind,source="$DIR/confhass",target=/confhass \
  --mount type=bind,source="/etc/gammu-smsdrc",target=/etc/gammu-smsdrc,readonly \
  "$TAG"
