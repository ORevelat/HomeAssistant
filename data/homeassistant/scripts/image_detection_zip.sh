#!/bin/bash

if [[ $# -eq 0 ]] ; then
    exit 1
fi

DETECTOR=$1
BACKUP_DATE=$(date -d "-2 day 12:00" +"%Y%m%d")
BASE_FOLDER='/config/www/deepstack'

cd ${BASE_FOLDER}/${DETECTOR}

zip -mqju ${DETECTOR}_${BACKUP_DATE}.zip ${DETECTOR}_*_${BACKUP_DATE}_*.jpg

# keep last 7 days
ls -1tr *.zip | head -n -7 | xargs -d '\n' rm -f --

exit 0
