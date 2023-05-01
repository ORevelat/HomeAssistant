#!/bin/bash

folder=`dirname "$0"`

source $folder/backup_config.sh

BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE=/tmp/docker-stacks_$BACKUP_DATE.zip

pushd /srv/disk1/docker-data >/dev/null
zip -9 -q -r $BACKUP_FILE * -x"lost+found"
popd >/dev/null

# push backup to NAS
echo "put $BACKUP_FILE" | sftp -P $nas_port $nas_user@$nas_host:/mnt/backup_hyperion/docker-stacks

# keep 4 files for backup on NAS
ssh -p $nas_port $nas_user@$nas_host "cd /mnt/backup_hyperion/docker-stacks && ls -1tr | head -n -4 | xargs -d '\n' rm -f --"

# do not keep backup on local
rm -f $BACKUP_FILE

echo Backup complete: $BACKUP_DATE

exit 0
