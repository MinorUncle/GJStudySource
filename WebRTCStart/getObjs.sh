#!/bin/sh

input="./.ninja_log"
#input=$1
#ignore_path=$2
#echo $input
output="objfils.txt"
rm -rf $output
while read line
do
for word in ${line[@]}
do
if [ ${word##*.} == "o" ];then
    if ! [[ $word =~ "third_party" ]] && ! [[ $word =~ "examples" ]] && ! [[ $word =~ "test" ]];then

        echo $word
        echo $word >> $output
    fi
fi
done
done < $input

cp -f $output ./GWebRTC/$output

