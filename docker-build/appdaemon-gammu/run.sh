#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
B=$(which bash)

rm /var/run/gammu-smsd.pid
sleep 10 
/usr/bin/gammu-smsd --pid=/var/run/gammu-smsd.pid --daemon

cd /usr/src/app
./dockerStart.sh
