#!/bin/sh

shellConfig=`pwd`/GWebRTC/Config.xcconfig

if [ "${PROJECT_FILE_PATH}x" = "x" ];then
    shellConfig=`pwd`/Config.xcconfig
fi

while read line
do
    for word in $line
    do

        if [ "${word}x" = "//x" ];then
            continue
        fi
        config_key=${word%=*}
        config_value="${word#*=}"
        eval "$config_key=$config_value"
    done
done < $shellConfig

###in xcode  generate variable
if [ "${XCODE_PRODUCT_BUILD_VERSION}x" != "x" ];then

if [ $DidBuild -a "yes" ];then
echo "Did build"
exit 0
fi

#####need $PROJECT_DIR $TARGETNAME $PROJECT_FILE_PATH   $$$$
OBJECT_FILE=${PROJECT_DIR}/GWebRTC/objfils.txt
rubyFile=${PROJECT_DIR}/GWebRTC/PraseProduct.rb
getDefineRubyFile=${PROJECT_DIR}/GWebRTC/GetDefine.rb
pathConvert=${PROJECT_DIR}/GWebRTC/pathConversion.rb

SOURCE_FILE_GROUP="Source"
SOURCE_FILE_PATH=${PROJECT_DIR}/obj/webrtc
DEFINE_SAVE_PATH=${PROJECT_DIR}/GWebRTC/PrefixHeader.pch
PATH_CONVERT_SAVE_PATH=${PROJECT_DIR}/GWebRTC/pathConversConfig.txt

echo "PROJECT_DIR=${PROJECT_DIR}" > $shellConfig
echo "TARGETNAME=${TARGETNAME}" >> $shellConfig
echo "PROJECT_FILE_PATH=${PROJECT_FILE_PATH}" >> $shellConfig
echo "SOURCE_FILE_GROUP=${SOURCE_FILE_GROUP}" >> $shellConfig
echo "OBJECT_FILE=${OBJECT_FILE}" >> $shellConfig
echo "rubyFile=${rubyFile}" >> $shellConfig
echo "ignoreSourceGroup=third_party:test" >> $shellConfig
echo "getDefineRubyFile=${getDefineRubyFile}" >> $shellConfig
echo "PATH_CONVERT_SAVE_PATH=${PATH_CONVERT_SAVE_PATH}" >> $shellConfig
echo "${TARGETNAME}:then, please run currentPrase file out of xcode"

#ruby $getDefineRubyFile
#ruby $pathConvert

exit -1
fi

echo "rubyFile:${rubyFile} SOURCE_FILE_GROUP:${SOURCE_FILE_GROUP} TARGETNAME:${TARGETNAME} PROJECT_FILE_PATH:$PROJECT_FILE_PATH OBJECT_FILE:$OBJECT_FILE PATH_CONVERT_SAVE_PATH:$PATH_CONVERT_SAVE_PATH ignoreSourceGroup:$ignoreSourceGroup"
ruby $rubyFile $SOURCE_FILE_GROUP $TARGETNAME $PROJECT_FILE_PATH $OBJECT_FILE $PATH_CONVERT_SAVE_PATH $ignoreSourceGroup
echo "DidBuild=yes" >> $shellConfig
exit 1
