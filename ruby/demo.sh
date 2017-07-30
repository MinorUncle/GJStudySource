#!/bin/sh

path=`pwd`
path="${path}/DealLog.log"
logger(){
currentTime=`date "+%Y-%m-%d %H:%M:%S"`
    echo "shell: ${currentTime}: ${1}" >> $path
}
logger "nihao"
