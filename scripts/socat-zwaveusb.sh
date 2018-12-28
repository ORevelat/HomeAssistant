#!/bin/bash

(while sleep 1; do
        socat pty,link=/dev/ttyACM5,user=root,group=dialout,mode=777,waitslave,ignoreeof,raw,echo=0 tcp:192.168.254.225:54320
        test $? -gt 128 && break
done) &

exit 0
