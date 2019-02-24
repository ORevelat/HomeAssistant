#!/bin/bash

folder=`dirname "$0"`

echo Stopping reveseproxy (nginx) ...
docker stop reverseproxy

echo Updating certificates ...
docker run -it --rm -p 443:443 -p 83:80 --name certbot -v "/srv/disk1/data/letsencrypt:/etc/letsencrypt" -v "/srv/disk1/data/letsencrypt-lib/:/var/lib/letsencrypt" certbot/dns-ovh -q renew

echo Restarting reverseproxy (nginx) ...
docker start reverseproxy

echo Certificates renewed: $(date +"%Y%m%d_%H%M%S")

exit 0
