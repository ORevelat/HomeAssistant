#!/bin/bash

if [[ $# -eq 0 ]] ; then
    exit 1
fi

DETECTOR=$1
BACKUP_DATE=$(date -d "-2 day 12:00" +"%Y%m%d")
BASE_FOLDER='/config/www/deepstack'

zip -mqju ${BASE_FOLDER}/${DETECTOR}/${DETECTOR}_${BACKUP_DATE}.zip ${BASE_FOLDER}/${DETECTOR}/${DETECTOR}_*_${BACKUP_DATE}_*.jpg

exit 0
