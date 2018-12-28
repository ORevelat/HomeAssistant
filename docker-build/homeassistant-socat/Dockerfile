FROM "homeassistant/home-assistant:0.82.1"
LABEL maintainer="Nobody"

COPY run.sh /run.sh

# Install socat
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install --assume-yes apt-utils
RUN apt-get install --assume-yes socat
RUN apt-get install --assume-yes jq

# clear apt stuff

CMD [ "bash","/run.sh" ]
