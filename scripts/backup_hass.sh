#!/bin/bash

folder=`dirname "$0"`

source $folder/backup_config.sh

BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE=/tmp/hass-config_$BACKUP_DATE.zip

pushd /srv/data/butler >/dev/null
zip -9 -q -r $BACKUP_FILE docker-compose.yml
zip -9 -q -r $BACKUP_FILE scripts
zip -9 -q -r $BACKUP_FILE config -x"config/hass/deps/*" -x"config/hass/home-assistant_v2.db" -x"config/hass/home-assistant.log" -x"config/hass/tts/*" -x"config/hass/www/tts/*" -x"config/appdaemon/logs/*"
zip -9 -q -r $BACKUP_FILE docker-build -x"homeassistant-socat/config/*" -x"appdaemon-gammu/conf/*" -x"appdaemon-gammu/confhass/*"
popd >/dev/null

# push backup to NAS
echo "put $BACKUP_FILE" | sftp -P $nas_port $nas_user@$nas_host:/srv/dev-disk-by-label-DISK1/Backup-Hass.io/config

# keep 15 files for backup on NAS
ssh -p $nas_port $nas_user@$nas_host "cd /srv/dev-disk-by-label-DISK1/Backup-Hass.io/config && ls -1tr | head -n -15 | xargs -d '\n' rm -f --"

# do not keep backup on local
rm -f $BACKUP_FILE

echo Backup complete: $BACKUP_DATE

exit 0
