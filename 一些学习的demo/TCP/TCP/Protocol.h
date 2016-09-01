//
//  Protocol.h
//  Socketcf
//
//  Created by tongguan on 3/29/16.
//  Copyright © 2016 tongguan. All rights reserved.
//

#ifndef Protocol_h
#define Protocol_h

typedef struct NetStruct_oneData
{
    unsigned int header;//包头
    unsigned int length;//包总长度
    unsigned int cmd;//信号令
    unsigned int num;//数据条数
    unsigned int dataNum;//字段数
    unsigned int dataType;//字段类型
    unsigned int dataLength;//字段长度
    unsigned int data[50];//字段
    Byte verify;//校验
    Byte version;//版本号
    unsigned int tail;//包尾
}netStruct_oneData;

typedef struct NetStruct_twoData
{
    unsigned int header;//包头
    unsigned int length;//包总长度
    unsigned int cmd;//信号令
    unsigned int num;//数据条数
    unsigned int dataNum;//字段数
    unsigned int dataType_one;//字段类型
    unsigned int dataType_two;//字段类型
    unsigned int dataLength_one;//字段长度
    unsigned int dataLength_two;//字段长度
    unsigned int data[50];//字段
    Byte verify;//校验
    Byte version;//版本号
    unsigned int tail;//包尾
}netStruct_twoData;

const int errorCode = 0xfffffff;
const int login_req = 0x00000001;
const int get_UserInfo_req = 0x00000003;
const int get_UserGroupInfo_req = 0x00000004;
const int get_UserCarGroupInfo_req = 0x00000005;
const int get_UserCarsInfo_req = 0x00000006;
const int downLoad_SoilCoast_req = 0x0000000C;
const int downLoad_CarTrail_req = 0x00000011;
const int querry_CarDistance_req = 0x0000012;
const int querry_Alarm_req = 0x00000013;
const int querry_FireState_req = 0x00000014;
const int downLoad_Location_req = 0x00000016;
const int querry_UserAllRoad_req = 0x00000019;
const int get_RoadLocationPoint_req = 0x0000001A;
const int get_Temperature_req = 0x00000020;
const int querry_OverSpeed_req = 0x00000021;
const int modify_Password_req = 0x00000022;
const int querry_Flameout_req = 0x00000024;

#endif /* Protocol_h */


















