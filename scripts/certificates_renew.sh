#!/bin/bash

folder=`dirname "$0"`

echo Stopping reveseproxy nginx ...
/usr/bin/docker stop reverseproxy

echo Updating certificates ...
/usr/bin/docker run -it --rm -p 443:443 -p 83:80 --name certbot -v "/srv/disk1/docker-data/data/letsencrypt:/etc/letsencrypt" -v "/var/log/letsencrypt:/var/log/letsencrypt" certbot/dns-ovh -q renew

echo Restarting reverseproxy nginx ...
/usr/bin/docker start reverseproxy

echo Certificates renewed: $(date +"%Y%m%d_%H%M%S")

exit 0
