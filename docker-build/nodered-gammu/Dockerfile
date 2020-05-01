FROM node:12-buster-slim

USER root

RUN apt-get update && apt-get --assume-yes install apt-utils sudo gammu-smsd locales iputils-ping procps

RUN sed -i 's/^# *\(fr_FR.UTF-8\)/\1/' /etc/locale.gen && locale-gen

RUN adduser node sudo && echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN npm install -g --unsafe-perm node-red

COPY start.sh /start.sh
COPY gammu-smsdrc.conf /etc/gammu-smsdrc

USER node

CMD [ "bash","/start.sh" ]
