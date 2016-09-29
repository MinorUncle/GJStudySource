#!/bin/sh
par=("1 12" "2 32" "34 we 3" "4 we 23 323 32")
for line in ${par[@]}
do
echo $line
key=0
match=0
findMatch=-1
for word in $line
do
st="${st} nicai"
echo "st"

if [ $match -eq 1 -a $word != "+=" ];
then
if [ $findMatch -eq -1 ];then
findMatch=`findMatchFlag $key`
fi
word=${word%".o"}
echo  "${key}  ${word}   ${findMatch}"
output="$output ${word}:${findMatch}"
elif [ `echo $word | grep ^${Pre}` ];then
match=1
key="${word#$Pre}"
key=${key%)}
findMatch=-1
else
continue
fi
done
done
echo $st
