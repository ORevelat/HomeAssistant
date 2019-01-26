FROM "homeassistant/home-assistant:0.84.6"
LABEL maintainer="Nobody"

COPY run.sh /run.sh

# Install socat
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install --assume-yes apt-utils
RUN apt-get install --assume-yes socat
RUN apt-get install --assume-yes jq

# update ozw config - not sure if it really helps :(
RUN mv /usr/local/lib/python3.6/site-packages/python_openzwave/ozw_config/options.xml /usr/local/lib/python3.6/site-packages/python_openzwave/ozw_config/options.xml.original
RUN ln -s /config/options.xml /usr/local/lib/python3.6/site-packages/python_openzwave/ozw_config/options.xml

# clear apt stuff

CMD [ "bash","/run.sh" ]
