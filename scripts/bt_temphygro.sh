#!/bin/bash

me=`basename "$0"`

source mqtt_config.sh

bt="4C:65:A8:D0:63:55"
sensor="sensor_sdb"

RET=1
until [ ${RET} -eq 0 ]; do
    sleep 1
    data1=$(/usr/bin/timeout 20 /usr/bin/gatttool -b $bt --char-write-req --handle=0x0010 -n 0100 --listen | grep "Notification handle")
    RET=$?
done

RET=1
until [ ${RET} -eq 0 ]; do
    sleep 1
    data2=$(/usr/bin/gatttool -b $bt --char-read -a 0x0018 | grep "Characteristic value/descriptor")
    RET=$?
done

string=$(echo $data1 | cut -c37- | xxd -r -p | tr '\0' '\n')

temperature=$(echo $string | cut -c3-6)
humidity=$(echo $string | cut -c10-13)
battery=$((0x$(echo $data2 | cut -c34-35)))

## from mqtt_config.sh
#mqtt_ip=broker_ip
#mqtt_user=broker_username
#mqtt_passwd=broker_userpass

if [[ "$temperature" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$humidity" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$battery" =~ ^[0-9]+(\.[0-9]+)?$ ]]
then
    /usr/bin/mosquitto_pub -h $mqtt_ip -V mqttv311 -u $mqtt_user -P $mqtt_passwd -t "homeassistant/xiaomi/$sensor" -m "{\"temperature\": $temperature, \"humidity\": $humidity, \"battery\": $battery}"
    logger "$me $bt / $sensor - data sent to mqtt : {\"temperature\": $temperature, \"humidity\": $humidity, \"battery\": $battery}"
else
    logger "$me $bt / $sensor - failed to get data"
fi

exit 0
