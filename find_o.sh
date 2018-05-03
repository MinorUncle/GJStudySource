#!/bin/bash
function getdir(){
for element in `ls $1`
do  
dir_or_file=$1"/"$element
if [ -d $dir_or_file ]
then 
getdir $dir_or_file
elif [[ $dir_or_file =~ \.o ]]
then
OLD_IFS="$IFS"
IFS="/"
arr=($dir_or_file)
let len=${#arr[@]}
let len=$len-1
echo ${arr[$len]}
IFS="$OLD_IFS"
fi  
done
}

getdir $1
