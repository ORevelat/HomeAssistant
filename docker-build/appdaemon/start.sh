#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
B=$(which bash)

cd /usr/src/app
./dockerStart.sh
