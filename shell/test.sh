#!/bin/sh

Pre="OBJS-\$("

Header="/Users/weichengniandashu/develop/ffmpeg_build/scratch/armv7/config.h"

function findMatchFlag(){
find=0
while read config_line
do
    let i=0
    for item in $config_line
    do
        let i=i+1
        if [ $i -eq 2 -a $item = $1 ];then
        flg="${config_line##*$item}"
        find=1
        break;
        fi
    done
    if [ $find -eq 1 ];then
    echo $flg
    break
    fi
done < $Header
}


while read line
match=0
key=0
do
    match=0
    findMatch=-1
    for word in $line
    do
        if [ $match -eq 1 -a $word != += ];
        then
if [ $findMatch -eq -1 ];then
findMatch=1
        findMatchFlag $key
fi
echo $word
#        echo "key:$key flg:$flg"
        elif [ `echo $word | grep ^${Pre}` ];then
            match=1
            key="${word#$Pre}"
            key=${key%)}
            echo $key
            findMatch=-1
        else continue
        fi
    done
done < $1

IF_FileName=A0505420040605000000.AVL
if [ `echo $IF_FileName|grep ^A` ];then
echo YES
fi
