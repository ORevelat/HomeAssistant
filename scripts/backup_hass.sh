#!/bin/bash

folder=`dirname "$0"`

source $folder/backup_config.sh

BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE=/tmp/hass-config_$BACKUP_DATE.zip

pushd /srv/disk1/docker-data >/dev/null
zip -9 -q -r $BACKUP_FILE portainer/compose
zip -9 -q -r $BACKUP_FILE scripts
zip -9 -q -r $BACKUP_FILE data/homeassistant -x"data/homeassistant/home-assistant.log*"
zip -9 -q -r $BACKUP_FILE data/nodered -x"data/nodered/node_modules/*"
zip -9 -q -r $BACKUP_FILE data/tileboard
popd >/dev/null

# push backup to NAS
echo "put $BACKUP_FILE" | sftp -P $nas_port $nas_user@$nas_host:/mnt/backup_hyperion/homeassistant

# keep 15 files for backup on NAS
ssh -p $nas_port $nas_user@$nas_host "cd /mnt/backup_hyperion/homeassistant && ls -1tr | head -n -15 | xargs -d '\n' rm -f --"

# do not keep backup on local
rm -f $BACKUP_FILE

echo Backup complete: $BACKUP_DATE

exit 0
