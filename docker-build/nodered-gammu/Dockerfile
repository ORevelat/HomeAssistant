FROM "nodered/node-red-docker:v8"
LABEL maintainer="Nobody"

USER root

COPY start.sh /start.sh

RUN apt-get update
RUN apt-get --assume-yes install apt-utils
RUN apt-get --assume-yes install sudo
RUN apt-get --assume-yes install gammu-smsd
RUN apt-get --assume-yes install locales
RUN sed -i 's/^# *\(fr_FR.UTF-8\)/\1/' /etc/locale.gen
RUN locale-gen

RUN adduser node sudo

RUN echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER node

CMD [ "bash","/start.sh" ]
