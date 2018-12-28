#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
B=$(which bash)

if [[ -z "${SOCAT_ZWAVE_TYPE}" ]]; then
  SOCAT_ZWAVE_TYPE="tcp"
fi
if [[ -z "${SOCAT_ZWAVE_LINK}" ]]; then
  SOCAT_ZWAVE_LINK="/dev/zwave"
fi

(while sleep 1; do
        socat pty,link=$SOCAT_ZWAVE_LINK,raw,group=dialout,mode=777,waitslave,ignoreeof,raw,echo=0 $SOCAT_ZWAVE_TYPE:$SOCAT_ZWAVE_HOST:$SOCAT_ZWAVE_PORT
        test $? -gt 128 && break
done) &

cd /usr/src/app
exec python -m homeassistant --config /config
