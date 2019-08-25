#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
B=$(which bash)

sudo rm -f /var/run/gammu-smsd.pid
sleep 1
sudo /usr/bin/gammu-smsd --pid=/var/run/gammu-smsd.pid --daemon

export LC_ALL=fr_FR.UTF-8
export LANG=fr_FR.UTF-8
export LANGUAGE=fr_FR.UTF-8

cd /usr/src/node-red
/usr/local/bin/node $NODE_OPTIONS node_modules/node-red/red.js -v $FLOWS "--userDir" "/data"
