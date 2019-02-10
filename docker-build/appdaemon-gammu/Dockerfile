FROM "acockburn/appdaemon:latest"
LABEL maintainer="Nobody"

COPY start.sh /start.sh

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install --assume-yes apt-utils
RUN apt-get --assume-yes install gammu-smsd
RUN apt-get --assume-yes install ffmpeg

RUN pip install pyicloud
RUN pip install pydub
RUN pip install BeautifulSoup4

CMD [ "bash","/start.sh" ]
