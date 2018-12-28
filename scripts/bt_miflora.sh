#!/bin/bash

source mqtt_config.sh

me=`basename "$0"`

bt="C4:7C:8D:64:43:F2"
sensor="sensor_miflora1"

default_value="Characteristic value/descriptor: aa bb cc dd ee ff 99 88 77 66 00 00 00 00 00 00"

# enable live mode
RET=1
until [ ${RET} -eq 0 ]; do
    sleep 2
    data=$(/usr/bin/timeout 20 /usr/bin/gatttool -b $bt --char-write-req --handle=0x0033 -n A01F | grep "Characteristic value was written successfully")
    RET=$?
done

# get data for sensor & battery
data1=$(/usr/bin/gatttool -b $bt --char-read -a 0x35)
data2=$(/usr/bin/gatttool -b $bt --char-read -a 0x38)

if [ "$(echo $data1)" = "$(echo $default_value)" ]
then
   logger "$me $bt / $sensor - failed to read data"
   exit 0
fi

temperature=$((0x$(echo $data1 | cut -c37-38)$(echo $data1 | cut -c34-35)))
light=$((0x$(echo $data1 | cut -c52-53)$(echo $data1 | cut -c49-50)$(echo $data1 | cut -c46-47)$(echo $data1 | cut -c43-44)))
moisture=$((0x$(echo $data1 | cut -c55-56)))
fertility=$((0x$(echo $data1 | cut -c61-62)$(echo $data1 | cut -c58-59)))
battery=$((0x$(echo $data2 | cut -c34-35)))

if [ $temperature -gt 32768 ]
then
    temperature=$((-65536 + $temperature))
fi

temperature=`echo "scale=1;$temperature/10" | bc`
temperature=$(echo $temperature | bc -l | sed -e 's/^-\./-0./' -e 's/^\./0./')

## from mqtt_config.sh
#mqtt_ip=broker_ip
#mqtt_user=broker_username
#mqtt_passwd=broker_userpass

if [[ "$temperature" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$light" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$moisture" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$fertility" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$battery" =~ ^[0-9]+(\.[0-9]+)?$ ]] && [[ "$temperature" > "0" ]]
then
    /usr/bin/mosquitto_pub -h $mqtt_ip -V mqttv311 -u $mqtt_user -P $mqtt_passwd -t "homeassistant/xiaomi/$sensor" -m "{\"temperature\": $temperature, \"light\": $light, \"humidity\": $moisture, \"fertility\": $fertility, \"battery\": $battery}"
    logger "$me $bt / $sensor - data sent to mqtt : {\"temperature\": $temperature, \"light\": $light, \"humidity\": $moisture, \"fertility\": $fertility, \"battery\": $battery}"
else
    logger "$me $bt / $sensor - failed to get data"
fi

exit 0
