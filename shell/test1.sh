#!/bin/sh

Pre="OBJS-\$("

configFile="/Users/tongguan/Desktop/ffmpeg-iphone-build-master/scratch/arm64/config.h"
makeFile="/Users/tongguan/Desktop/ffmpeg-iphone-build-master/ffmpeg-3.0/libavformat/Makefile"


i=0
while read line
do
    item_key=`echo $line|awk '{print $2}'`
    item_value=`echo $line|awk '{print $3}'`
    config_key[$i]=$item_key
    config_value[$i]=$item_value
    echo "key$i:${config_key[$i]}  value$i:${config_value[$i]}"
let i=i+1
done < $configFile

findMatchFlag(){
i=0
findMatchFlagFind=0
for key in ${config_key[@]}
do
    if [ "${key}x" = "${1}x" ];then
        echo ${config_value[$i]}
        findMatchFlagFind=1
        break
    fi
    let i=i+1
done
if [ $findMatchFlagFind -eq 0 ];then
echo 2
fi
}

#didAddMatchCache(){
#didAddMatchCache=0
#for key in ${makeFileDidMatchKey[@]}
#do
#    if [ "${makeFileDidMatchKey}x" = "${1}x" ];then
#        let didAddMatchCache=1
#        echo 0
#    break
#    fi
#done
#if [ didAddMatchCache -eq 0];then
#    lenth="${#didAddMatchCache[@]}"
#    makeFileDidMatchKey[$lenth]=$1
#    echo 1
#fi
#}

cat $makeFile | while read line
do
    key=0
    match=0
    findMatch=-1
    for word in $line
    do
        if [ $match -eq 1 -a $word != += ];
        then
            if [ $findMatch -eq -1 ];then
                findMatch=`findMatchFlag $key`
            fi
            word=${word%".o"}
            echo  "${key}  ${word}   ${findMatch}"
        elif [ `echo $word | grep ^${Pre}` ];then
            match=1
            key="${word#$Pre}"
            key=${key%)}
            findMatch=-1
        else continue
        fi
    done
done
