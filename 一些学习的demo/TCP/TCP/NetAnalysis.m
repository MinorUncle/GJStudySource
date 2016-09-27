//
//  NetAnalysis.m
//  Socketcf
//
//  Created by 米花 mihuasama on 16/3/1trail4.
//  Copyright © 2016年 tongguan. All rights reserved.
//

#import "NetAnalysis.h"
#import "STZlib.h"
#import "CRC.h"

@implementation LoginModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"success%d userID:%u gprs_IP:%@ gprs_Port:%@ ip:%@ port:%@",self.success,self.userID,self.gprs_IP,self.gprs_Port,self.concrete_IP,self.concrete_Port];
}
@end

@implementation UserInfoModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"userID:%u userTypeID:%u groupID:%u username:%@ password:%@ ownerName:%@ sTel:%@ sMemo:%@ timeLimit:%@ birthday:%@ menu:%@",self.userID,self.userTypeID,self.groupID,_username,_password,_ownerName,_sTel,_sMemo,_timeLimit,_birthday,_menu];
}
@end

@implementation UserGroupModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"%u %@ %u %@",_userGroupID,_userGroupName,_userTypeID,_userGroupMemo];
}
@end

@implementation UserALLCarGroupModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"%u %@ %@ %@ %@ %@%u %@",_vehGroupID,_vehGroupName,_contact,_sTel1,_sTel2,_address,_fVehGroupID,_updateTime];
}
@end

@implementation UserALLCarsInfoModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"%@",_carInfo];
}
@end

@implementation CarPathModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"%u | %f | %f | %u |%u |%u |%d | %d |%@",_carID,_longitude,_latitude,_mileage,_speed,_orietation,_isAlarm,_isLocation,_date];
}
@end

@implementation AlarmModel
- (NSString *)description
{
    return [NSString stringWithFormat:@"%u| %@ | %@ | %@ | %f",_carID,_time,_type,_where,_longitude];
}
@end

@interface NetAnalysis ()
@property (copy,nonatomic) void(^resultBlock1)(LoginModel*model);
@property (copy,nonatomic) void(^resultBlock2)(UserInfoModel*model);
@property (copy,nonatomic) void(^resultBlock3)(UserGroupModel*model);
@property (copy,nonatomic) void(^resultBlock4)(NSArray<UserALLCarGroupModel *>*model);
@property (copy,nonatomic) void(^resultBlock5)(NSArray<UserALLCarsInfoModel *>*model);
@property (copy,nonatomic) void(^loginGprs)(BOOL success);
//@property (copy,nonatomic) void(^resultBlock6)(UserALLCarsInfoModel*model);
@end

@implementation NetAnalysis
/*
 typedef struct NetStruct_twoData
 {
 int header;//包头
 int length;//包总长度
 int cmd;//信号令
 int num;//数据条数
 int dataNum;//字段数
 int dataType_one;//字段类型
 int dataType_two;//字段类型
 int dataLength_one;//字段长度
 int dataLength_two;//字段长度
 int data[50];//字段
 Byte verify;//校验
 Byte version;//版本号
 int tail;//包尾
 */

+ (NetAnalysis*)defaultNetAnalysis
{
    static NetAnalysis *defaultAnalysis;
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        defaultAnalysis = [[NetAnalysis alloc]init];
    });
    return defaultAnalysis;
}

- (NSData*)heartBeat
{
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(8*4+2+4);
    unsigned int cmd = 0x00000000;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000001;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendBytes:"abcdefghui" length:4];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    NSLog(@"%@ %lu",contentData,contentData.length);
    return contentData;
}
- (NSData*)dataWithLoginName:(NSString*)name password:(NSString*)password result:(void(^)(LoginModel*model))resultBlock;
{
    _resultBlock1 = resultBlock;
    
    NSString * nameAndpasswordString = [NSString stringWithFormat:@"%@%@",name,password];
    NSData * nameAndpasswordData = [STZlib dataByDeflatingData:[nameAndpasswordString dataUsingEncoding:NSASCIIStringEncoding] withMode:STZlibDeflateModeZlib];
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(10*4+2+nameAndpasswordData.length);
    unsigned int cmd = 0x00000001;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000002;
    unsigned int dataType_one = 0x00000001;
    unsigned int dataType_two = 0x00000001;
    unsigned int dataLength_one = (int)name.length;
    unsigned int dataLength_two = (int)password.length;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataType_two = CFSwapInt32BigToHost(dataType_two);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    dataLength_two = CFSwapInt32BigToHost(dataLength_two);
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataType_two length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendBytes:&dataLength_two length:4];
    [contentData appendData:nameAndpasswordData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    
    return contentData;
}

- (NSData*)dataWithUserInfo:(unsigned int)userID result:(void (^)(UserInfoModel *))resultBlock
{
    _resultBlock2 = resultBlock;
    
    NSData * userIDData = [STZlib dataByDeflatingData:[NSData dataWithBytes:&userID length:4] withMode:STZlibDeflateModeZlib];
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(8*4+2+userIDData.length);
    unsigned int cmd = 0x00000003;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000001;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    
    return contentData;

}

- (NSData*)dataWithUserGroupInfo:(unsigned int)userID result:(void (^)(UserGroupModel *))resultBlock
{
    _resultBlock3 = resultBlock;

    NSData * userIDData = [STZlib dataByDeflatingData:[NSData dataWithBytes:&userID length:4] withMode:STZlibDeflateModeZlib];
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(8*4+2+userIDData.length);
    unsigned int cmd = 0x00000004;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000001;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    
    return contentData;
    
}

- (NSData*)dataWithUserCarGroupInfo:(unsigned int)userID result:(void (^)(NSArray<UserALLCarGroupModel *> *))resultBlock
{
    _resultBlock4 = resultBlock;

    
    NSData * userIDData = [STZlib dataByDeflatingData:[NSData dataWithBytes:&userID length:4] withMode:STZlibDeflateModeZlib];
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(8*4+2+userIDData.length);
    unsigned int cmd = 0x00000005;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000001;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    
    return contentData;
}

- (NSData*)dataWithALLCarsInfo:(unsigned int)userID result:(void (^)(NSArray<UserALLCarsInfoModel *> *))resultBlock
{
    _resultBlock5 = resultBlock;
    NSData * carIDdata = [NSData dataWithBytes:&userID length:4];
    NSMutableData * totalData = [NSMutableData data];
    [totalData appendData:carIDdata];
    
    NSData * userIDData = [STZlib dataByDeflatingData:totalData withMode:STZlibDeflateModeZlib];
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(8*4+2+userIDData.length);
    unsigned int cmd = 0x00000006;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000001;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);

    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    
    return contentData;
}


- (NSData*)dataWithAllCarPathInfo:(unsigned int)carID statTime:(NSString*)startTime endTime:(NSString*)endTime result:(void (^)(void))resultBlock
{
    unsigned int k = CFSwapInt32BigToHost(carID);
    NSData * carIDdata = [NSData dataWithBytes:&k length:sizeof(k)];
    NSData * startData = [startTime dataUsingEncoding:NSASCIIStringEncoding];
    NSData * endData = [endTime dataUsingEncoding:NSASCIIStringEncoding];
    NSMutableData * totalData = [NSMutableData data];
    [totalData appendData:carIDdata];
    [totalData appendData:startData];
    [totalData appendData:endData];
    
    NSLog(@"%@ %@ %@ %@",carIDdata,startData,endData,totalData);

    
    NSData * userIDData = [STZlib dataByDeflatingData:totalData withMode:STZlibDeflateModeZlib];
    NSData * data = [STZlib dataByInflatingData:userIDData withMode:STZlibDeflateModeZlib];
    NSLog(@"4+ length:%lu + %lu data.length%lu",startTime.length,endTime.length,data.length);
    
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(12*4+2+userIDData.length);
    unsigned int cmd = 0x00000011;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000003;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    unsigned int dataType_two = 0x00000001;
    unsigned int dataLength_two = (int)startData.length;
    unsigned int dataType_three = 0x00000001;
    unsigned int dataLength_three = (int)endData.length;
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataType_two = CFSwapInt32BigToHost(dataType_two);
    dataType_three = CFSwapInt32BigToHost(dataType_three);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    dataLength_two = CFSwapInt32BigToHost(dataLength_two);
    dataLength_three = CFSwapInt32BigToHost(dataLength_three);

    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataType_two length:4];
    [contentData appendBytes:&dataType_three length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendBytes:&dataLength_two length:4];
    [contentData appendBytes:&dataLength_three length:4];

    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    NSLog(@"contentData:%@ length:%lu",contentData,contentData.length);
    return contentData;
}

- (NSData*)dataWithAllCardistance:(unsigned int)carID statTime:(NSString*)startTime endTime:(NSString*)endTime type:(unsigned int)type result:(void(^)(void))resultBlock
{
    unsigned int k = CFSwapInt32BigToHost(carID);
    unsigned int contentType = CFSwapInt32BigToHost(type);
    NSData * carIDdata = [NSData dataWithBytes:&k length:sizeof(k)];
    NSData * startData = [startTime dataUsingEncoding:NSASCIIStringEncoding];
    NSData * endData = [endTime dataUsingEncoding:NSASCIIStringEncoding];
    NSData * typeData = [NSData dataWithBytes:&contentType length:sizeof(contentType)];
    
    NSMutableData * totalData = [NSMutableData data];
    [totalData appendData:carIDdata];
    [totalData appendData:startData];
    [totalData appendData:endData];
    [totalData appendData:typeData];

    
    NSData * userIDData = [STZlib dataByDeflatingData:totalData withMode:STZlibDeflateModeZlib];
 
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(14*4+2+userIDData.length);
    NSLog(@"%u",length);
    unsigned int cmd = 0x00000012;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000004;
    unsigned int dataType_one = 0x00000002;
    unsigned int dataLength_one = 4;
    unsigned int dataType_two = 0x00000001;
    unsigned int dataLength_two = (int)startData.length;
    unsigned int dataType_three = 0x00000001;
    unsigned int dataLength_three = (int)endData.length;
    unsigned int dataType_four = 0x00000002;
    unsigned int dataLength_four = 0x00000004;

    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataType_two = CFSwapInt32BigToHost(dataType_two);
    dataType_three = CFSwapInt32BigToHost(dataType_three);
    dataType_four = CFSwapInt32BigToHost(dataType_four);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    dataLength_two = CFSwapInt32BigToHost(dataLength_two);
    dataLength_three = CFSwapInt32BigToHost(dataLength_three);
    dataLength_four = CFSwapInt32BigToHost(dataLength_four);
    
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataType_two length:4];
    [contentData appendBytes:&dataType_three length:4];
    [contentData appendBytes:&dataType_four length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendBytes:&dataLength_two length:4];
    [contentData appendBytes:&dataLength_three length:4];
    [contentData appendBytes:&dataLength_four length:4];
    
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    NSLog(@"contentData:%@ length:%lu",contentData,contentData.length);
    return contentData;

}

- (NSData*)querryalarmData:(NSString*)carID statTime:(NSString*)startTime endTime:(NSString*)endTime type:(NSString*)type result:(void(^)(void))resultBlock
{
    NSData * carIDdata = [carID dataUsingEncoding:NSASCIIStringEncoding];
    NSData * startData = [startTime dataUsingEncoding:NSASCIIStringEncoding];
    NSData * endData =  [endTime dataUsingEncoding:NSASCIIStringEncoding];
    NSData * typeData = [type dataUsingEncoding:NSASCIIStringEncoding];
    
    NSMutableData * totalData = [NSMutableData data];
    [totalData appendData:startData];
    [totalData appendData:endData];
    [totalData appendData:carIDdata];
    [totalData appendData:typeData];
    
    
    NSData * userIDData = [STZlib dataByDeflatingData:totalData withMode:STZlibDeflateModeZlib];
    NSData * data = [STZlib dataByInflatingData:userIDData withMode:STZlibDeflateModeZlib];
    NSLog(@"4+ length:%lu + %lu data.length%lu",startTime.length,endTime.length,data.length);
    
    
    unsigned int   header = 0x12345678;
    unsigned int length = (unsigned int)(14*4+2+userIDData.length);
    NSLog(@"%u",length);
    unsigned int cmd = 0x00000013;
    unsigned int num = 0x00000001;
    unsigned int datanum = 0x00000004;
    unsigned int dataType_one = 0x00000001;
    unsigned int dataLength_one = (int)startData.length;
    unsigned int dataType_two = 0x00000001;
    unsigned int dataLength_two = (int)endData.length;
    unsigned int dataType_three = 0x00000001;
    unsigned int dataLength_three = (int)carIDdata.length;
    unsigned int dataType_four = 0x00000001;
    unsigned int dataLength_four = (int)typeData.length;
    
    header = CFSwapInt32BigToHost(header);
    length = CFSwapInt32BigToHost(length);
    cmd = CFSwapInt32BigToHost(cmd);
    num = CFSwapInt32BigToHost(num);
    datanum = CFSwapInt32BigToHost(datanum);
    dataType_one = CFSwapInt32BigToHost(dataType_one);
    dataType_two = CFSwapInt32BigToHost(dataType_two);
    dataType_three = CFSwapInt32BigToHost(dataType_three);
    dataType_four = CFSwapInt32BigToHost(dataType_four);
    dataLength_one = CFSwapInt32BigToHost(dataLength_one);
    dataLength_two = CFSwapInt32BigToHost(dataLength_two);
    dataLength_three = CFSwapInt32BigToHost(dataLength_three);
    dataLength_four = CFSwapInt32BigToHost(dataLength_four);
    
    
    NSMutableData * contentData = [[NSMutableData alloc]init];
    [contentData appendBytes:&header length:4];
    [contentData appendBytes:&length length:4];
    [contentData appendBytes:&cmd length:4];
    [contentData appendBytes:&num length:4];
    [contentData appendBytes:&datanum length:4];
    [contentData appendBytes:&dataType_one length:4];
    [contentData appendBytes:&dataType_two length:4];
    [contentData appendBytes:&dataType_three length:4];
    [contentData appendBytes:&dataType_four length:4];
    [contentData appendBytes:&dataLength_one length:4];
    [contentData appendBytes:&dataLength_two length:4];
    [contentData appendBytes:&dataLength_three length:4];
    [contentData appendBytes:&dataLength_four length:4];
    
    [contentData appendData:userIDData];
    
    Byte * dataString = (Byte *)[contentData bytes];
    Byte eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    [contentData appendBytes:&eox length:1];
    
    
    unsigned int version = 0x01;
    unsigned int tail = 0x87654321;
    
    tail = CFSwapInt32BigToHost(tail);
    
    [contentData appendBytes:&version length:1];
    [contentData appendBytes:&tail length:4];
    NSLog(@"contentData:%@ length:%lu",contentData,contentData.length);
    return contentData;
}

- (void)analysisReceiveData:(NSData*)data
{
    NSLog(@"analysisReceiveData:%@",data);
    const void * content = [data bytes];
    int operation;
    memcpy(&operation,content+8, 4);
    NSLog(@"befor%x",operation);
    operation = CFSwapInt32HostToBig(operation);
    NSLog(@"after%x",operation);
    
    int totalLength;
    memcpy(&totalLength, content+4, 4);
    totalLength = CFSwapInt32HostToBig(totalLength);

    int datanum;
    memcpy(&datanum, content+16, 4);
    datanum = CFSwapInt32HostToBig(datanum);
    //数据量：
    NSLog(@"datanum:%d",datanum);
    
    
    //段个数
    unsigned int sectionNum;
    memcpy(&sectionNum, content+12, 4);
    sectionNum = CFSwapInt32HostToBig(sectionNum);
    NSLog(@"section%u",sectionNum);
    
    unsigned int dataType[datanum];
    unsigned int dataLength[datanum];
    //获取类型
    for (NSUInteger i = 0; i < datanum; i ++) {
        memcpy(dataType+i,content+20+i*4, 4);
        dataType[i] = CFSwapInt32HostToBig(dataType[i]);
    }
    //获取长度
    for (NSUInteger i = 0; i < datanum; i ++) {
        memcpy(dataLength+i,content+20+datanum*4+4*i, 4);
        dataLength[i] = CFSwapInt32HostToBig(dataLength[i]);
//        NSLog(@"dataLength:%d",dataLength[i]);
    }
    
    //数据长度
    int stringLength = totalLength - 4*4-2 - datanum*8;
    Byte dataString[stringLength];
    memcpy(dataString, content+3*4+(datanum+1)*8, stringLength);
//    NSLog(@"stringLength:%d",stringLength);
    
    NSStringEncoding gbkEncoding =CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);

    
    //解压：
    NSData * stringData = [STZlib dataByInflatingData:[NSData dataWithBytes:dataString length:stringLength] withMode:STZlibDeflateModeZlib];
//    NSLog(@"stringData:%lu %x",stringData.length,operation);
    const void * contentString = [stringData bytes];
    
    switch (operation) {
        case 0xffff0001:
        {
            LoginModel * loginmodel = [[LoginModel alloc]init];
            int dataLengthOffeset = 0;
            unsigned int success;
            memcpy(&success, contentString + dataLengthOffeset,dataLength[0]);
            dataLengthOffeset += dataLength[0];
            unsigned int userID;
            memcpy(&userID, contentString+dataLengthOffeset,dataLength[1]);
            dataLengthOffeset += dataLength[1];
            char gprs_IP[dataLength[2]];
            memcpy(gprs_IP, contentString+dataLengthOffeset,dataLength[2]);
            dataLengthOffeset += dataLength[2];
            char gprs_Port[dataLength[3]];
            memcpy(gprs_Port, contentString+dataLengthOffeset, dataLength[3]);
            dataLengthOffeset += dataLength[3];
            unsigned int userType;
            memcpy(&userType, contentString+dataLengthOffeset,4);
            dataLengthOffeset += 4;
            char concrete_IP[dataLength[5]];
            memcpy(concrete_IP, contentString+dataLengthOffeset, dataLength[5]);
            dataLengthOffeset += dataLength[5];
            char concrete_Port[dataLength[6]];
            memcpy(concrete_Port, contentString+dataLengthOffeset, dataLength[6]);
            dataLengthOffeset += dataLength[6];
            loginmodel.success = CFSwapInt32BigToHost(success);
            loginmodel.userID = CFSwapInt32BigToHost(userID);
            loginmodel.gprs_IP = [NSString stringWithCString:gprs_IP encoding:gbkEncoding];
            loginmodel.gprs_Port = [NSString stringWithCString:gprs_Port encoding:gbkEncoding];
            loginmodel.userType = CFSwapInt32BigToHost(userType);
            loginmodel.concrete_IP = [NSString stringWithCString:concrete_IP encoding:gbkEncoding];
            loginmodel.concrete_Port = [NSString stringWithCString:concrete_Port encoding:gbkEncoding];
            NSLog(@"%@",loginmodel);
            
            _resultBlock1(loginmodel);
            return;


        }
            break;
        case 0xffff0003:
        {
            UserInfoModel * infomodel = [[UserInfoModel alloc]init];
            int dataLengthOffeset = 0;
            unsigned int userid;
            memcpy(&userid, contentString + dataLengthOffeset,dataLength[0]);
            dataLengthOffeset += dataLength[0];
            char username[dataLength[1]];
            memcpy(username, contentString + dataLengthOffeset,dataLength[1]);
            dataLengthOffeset += dataLength[1];
            char password[dataLength[2]];
            memcpy(password, contentString + dataLengthOffeset,dataLength[2]);
            dataLengthOffeset += dataLength[2];
            unsigned int userTypeID;
            memcpy(&userTypeID, contentString + dataLengthOffeset, dataLength[3]);
            dataLengthOffeset += dataLength[3];
            char ownerName[dataLength[4]];
            memcpy(&ownerName, contentString + dataLengthOffeset, dataLength[4]);
            dataLengthOffeset += dataLength[4];
            char sTel[dataLength[5]];
            memcpy(&sTel, contentString + dataLengthOffeset, dataLength[5]);
            dataLengthOffeset += dataLength[5];
            char sMemo[dataLength[6]];
            memcpy(&sMemo, contentString + dataLengthOffeset, dataLength[6]);
            dataLengthOffeset += dataLength[6];
            char timeLimit[dataLength[7]];
            memcpy(&timeLimit, contentString + dataLengthOffeset, dataLength[7]);
            dataLengthOffeset += dataLength[7];
            char birthday[dataLength[8]];
            memcpy(&birthday, contentString + dataLengthOffeset, dataLength[8]);
            dataLengthOffeset += dataLength[8];
            char signlimit[dataLength[9]];
            memcpy(&signlimit, contentString + dataLengthOffeset, dataLength[9]);
            dataLengthOffeset += dataLength[9];
            unsigned int group;
            memcpy(&group, contentString + dataLengthOffeset, dataLength[10]);
            dataLengthOffeset += dataLength[10];
            char menu[dataLength[11]];
            memcpy(&menu, contentString + dataLengthOffeset, dataLength[11]);
            dataLengthOffeset += dataLength[11];
            
            infomodel.userID = CFSwapInt32BigToHost(userid);
            infomodel.userTypeID = CFSwapInt32BigToHost(userTypeID);
            infomodel.groupID = CFSwapInt32BigToHost(group);
            infomodel.username = [NSString stringWithCString:username encoding:gbkEncoding];
            infomodel.password = [NSString stringWithCString:password encoding:gbkEncoding];
            infomodel.ownerName = [NSString stringWithCString:ownerName encoding:gbkEncoding];
            infomodel.sTel = [NSString stringWithCString:sTel encoding:gbkEncoding];
            infomodel.sMemo = [NSString stringWithCString:sMemo encoding:gbkEncoding];
            infomodel.timeLimit = [NSString stringWithCString:timeLimit encoding:gbkEncoding];
            infomodel.birthday = [NSString stringWithCString:birthday encoding:gbkEncoding];
            infomodel.signLimit = [NSString stringWithCString:signlimit encoding:gbkEncoding];
            infomodel.menu = [NSString stringWithCString:menu encoding:gbkEncoding];
            NSLog(@"%@",infomodel);
            
            _resultBlock2(infomodel);
            return;

            
        }
            break;
        case 0xffff0004:
        {
            UserGroupModel * groupmodel = [[UserGroupModel alloc]init];
            int dataLengthOffeset = 0;
            unsigned int userGroupID;
            memcpy(&userGroupID, contentString + dataLengthOffeset,dataLength[0]);
            dataLengthOffeset += dataLength[0];
            char userGroupName[dataLength[1]];
            memcpy(userGroupName, contentString + dataLengthOffeset,dataLength[1]);
            dataLengthOffeset += dataLength[1];
            unsigned int userTypeID;
            memcpy(&userTypeID, contentString + dataLengthOffeset,dataLength[2]);
            dataLengthOffeset += dataLength[2];
            char userGroupMemo[dataLength[3]];
            memcpy(userGroupMemo, contentString + dataLengthOffeset,dataLength[3]);
            dataLengthOffeset += dataLength[3];
            
            groupmodel.userGroupID = CFSwapInt32BigToHost(userGroupID);
            groupmodel.userTypeID = CFSwapInt32BigToHost(userTypeID);
            groupmodel.userGroupName = [NSString stringWithCString:userGroupName encoding:gbkEncoding];
            groupmodel.userGroupMemo = [NSString stringWithCString:userGroupMemo encoding:gbkEncoding];
            NSLog(@"groupmodel:%@ ",groupmodel);
            
            _resultBlock3(groupmodel);
            return;


        }
            break;
        case 0xffff0005:
        {
            int dataLengthOffeset = 0;
            int maxLength = 0;
            for (NSUInteger i =0; i < datanum; i ++) {
                maxLength += dataLength[i];
            }
            NSMutableArray * array = [[NSMutableArray alloc]init];
            for (NSUInteger i = 0; i < sectionNum; i ++) {
            dataLengthOffeset = maxLength*(int)i;
            UserALLCarGroupModel * allcargroupmodel = [[UserALLCarGroupModel alloc]init];
            unsigned int vehGroupID;
            memcpy(&vehGroupID, contentString + dataLengthOffeset,dataLength[0]);
            dataLengthOffeset += dataLength[0];
            char vehGroupName[dataLength[1]];
            memcpy(vehGroupName, contentString + dataLengthOffeset,dataLength[1]);
            dataLengthOffeset += dataLength[1];
            char contact[dataLength[2]];
            memcpy(contact, contentString + dataLengthOffeset,dataLength[2]);
            dataLengthOffeset += dataLength[2];
            char sTel1[dataLength[3]];
            memcpy(sTel1, contentString + dataLengthOffeset,dataLength[3]);
            dataLengthOffeset += dataLength[3];
            char sTel2[dataLength[4]];
            memcpy(sTel2, contentString + dataLengthOffeset,dataLength[4]);
            dataLengthOffeset += dataLength[4];
            char address[dataLength[5]];
            memcpy(address, contentString + dataLengthOffeset,dataLength[5]);
            dataLengthOffeset += dataLength[5];
            unsigned int fVehGroupID;
            memcpy(&fVehGroupID, contentString + dataLengthOffeset,dataLength[6]);
            dataLengthOffeset += dataLength[6];
            char updateTime[dataLength[7]];
            memcpy(updateTime, contentString + dataLengthOffeset,dataLength[7]);
            dataLengthOffeset += dataLength[7];
            
            allcargroupmodel.fVehGroupID = CFSwapInt32BigToHost(fVehGroupID);
            allcargroupmodel.vehGroupID = CFSwapInt32BigToHost(vehGroupID);
                
            allcargroupmodel.vehGroupName = [NSString stringWithCString:vehGroupName encoding:gbkEncoding];
            allcargroupmodel.contact = [NSString stringWithCString:contact encoding:gbkEncoding];
            allcargroupmodel.sTel1 = [NSString stringWithCString:sTel1 encoding:gbkEncoding];
            allcargroupmodel.sTel2 = [NSString stringWithCString:sTel2 encoding:gbkEncoding];
            allcargroupmodel.address = [NSString stringWithCString:address encoding:gbkEncoding];
            allcargroupmodel.updateTime = [NSString stringWithCString:updateTime encoding:gbkEncoding];

            NSLog(@"allcargroupmodel:%@ ",allcargroupmodel);
            [array addObject:allcargroupmodel];
            }
            
            _resultBlock4(array);
            return;

        }
            break;
        case 0xffff0006:
        {
            int dataLengthOffeset = 0;
            int maxLength = 0;
            for (NSUInteger i =0; i < datanum; i ++) {
                maxLength += dataLength[i];
            }            NSMutableArray * array = [[NSMutableArray alloc]init];
            for (NSUInteger i = 0; i < sectionNum; i ++) {
                dataLengthOffeset = maxLength * (int)i;
                UserALLCarsInfoModel * model = [[UserALLCarsInfoModel alloc]init];
                NSMutableString * modelcontent = [NSMutableString string];
                for (NSUInteger j = 0; j < datanum; j ++) {
                    char carInfo[dataLength[j]];
                    memcpy(carInfo,contentString + dataLengthOffeset,dataLength[j]);
                    dataLengthOffeset += dataLength[j];
                    NSString * content = [NSString stringWithCString:carInfo encoding:gbkEncoding];
                    if([content isEqualToString:@""])
                    {
                        content = @"空";
                    }
                    [modelcontent appendString:[NSString stringWithFormat:@"%@=",content]];
                }
                
                model.carInfo = [NSString stringWithFormat:@"%@",modelcontent];
                NSLog(@"model:%@",model);
                [array addObject:model];
            }
            _resultBlock5(array);
            return;
        }
            break;
        case 0xffff0011:
        {
            int dataLengthOffeset = 0;
            int maxLength = 0;
            for (NSUInteger i =0; i < datanum; i ++) {
                maxLength += dataLength[i];
            }
            NSMutableArray * array = [[NSMutableArray alloc]init];
            for (NSUInteger i = 0; i < sectionNum; i ++) {
                dataLengthOffeset = maxLength*(int)i;
                CarPathModel * carPathmodel = [[CarPathModel alloc]init];
                unsigned int carID;
                memcpy(&carID, contentString + dataLengthOffeset,dataLength[0]);
                dataLengthOffeset += dataLength[0];
                double logitude;
                memcpy(&logitude, contentString + dataLengthOffeset,dataLength[1]);
                dataLengthOffeset += dataLength[1];
                double latitude;
                memcpy(&latitude, contentString + dataLengthOffeset,dataLength[2]);
                dataLengthOffeset += dataLength[2];
                unsigned int orietation;
                memcpy(&orietation, contentString + dataLengthOffeset,dataLength[3]);
                dataLengthOffeset += dataLength[3];
                unsigned int speed;
                memcpy(&speed, contentString + dataLengthOffeset,dataLength[4]);
                dataLengthOffeset += dataLength[4];
                unsigned int isalarm;
                memcpy(&isalarm, contentString + dataLengthOffeset,dataLength[5]);
                dataLengthOffeset += dataLength[5];
                unsigned int mileage;
                memcpy(&mileage, contentString + dataLengthOffeset,4);
                dataLengthOffeset += dataLength[6];
                char status[dataLength[7]];
                memcpy(status, contentString + dataLengthOffeset,dataLength[7]);
                dataLengthOffeset += dataLength[7];
                unsigned int islocation;
                memcpy(&islocation, contentString + dataLengthOffeset,dataLength[8]);
                dataLengthOffeset += dataLength[8];
                char date[dataLength[9]];
                memcpy(date, contentString + dataLengthOffeset,dataLength[9]);
                dataLengthOffeset += dataLength[9];
                
                carPathmodel.carID = CFSwapInt32BigToHost(carID);
                carPathmodel.longitude = logitude;
//                CFSwapInt64BigToHost(logitude);
                carPathmodel.latitude = latitude;
//                CFSwapInt64BigToHost(latitude);
                carPathmodel.speed = CFSwapInt32BigToHost(speed);
                carPathmodel.isAlarm = CFSwapInt32BigToHost(isalarm);
                carPathmodel.mileage = CFSwapInt32BigToHost(mileage);
                carPathmodel.isLocation = CFSwapInt32BigToHost(islocation);
                carPathmodel.status = [NSString stringWithCString:status encoding:gbkEncoding];
                carPathmodel.date = [NSString stringWithCString:date encoding:gbkEncoding];

                
                NSLog(@"carPathmodel:%@ ",carPathmodel);
                [array addObject:carPathmodel];
                return;

            }
        }
            break;
        case 0xffff0013:
        {
            int dataLengthOffeset = 0;
            int maxLength = 0;
            for (NSUInteger i =0; i < datanum; i ++) {
                maxLength += dataLength[i];
            }
            NSMutableArray * array = [[NSMutableArray alloc]init];
            for (NSUInteger i = 0; i < sectionNum; i ++) {
                dataLengthOffeset = maxLength*(int)i;
                AlarmModel * alarmmodel = [[AlarmModel alloc]init];
                unsigned int carID;
                memcpy(&carID, contentString + dataLengthOffeset,dataLength[0]);
                dataLengthOffeset += dataLength[0];
                char time[dataLength[1]];
                memcpy(time, contentString + dataLengthOffeset,dataLength[1]);
                dataLengthOffeset += dataLength[1];
                char type[dataLength[2]];
                memcpy(type, contentString + dataLengthOffeset,dataLength[2]);
                dataLengthOffeset += dataLength[2];
                double longitude;
                memcpy(&longitude, contentString + dataLengthOffeset,dataLength[3]);
                dataLengthOffeset += dataLength[3];
                double latitude;
                memcpy(&latitude, contentString + dataLengthOffeset,dataLength[4]);
                dataLengthOffeset += dataLength[4];
                unsigned int speed;
                memcpy(&speed, contentString + dataLengthOffeset,dataLength[5]);
                dataLengthOffeset += dataLength[5];
                unsigned int orientation;
                memcpy(&orientation, contentString + dataLengthOffeset,dataLength[6]);
                dataLengthOffeset += dataLength[6];
                char where[dataLength[7]];
                memcpy(where, contentString + dataLengthOffeset,dataLength[7]);
                dataLengthOffeset += dataLength[7];
                
                alarmmodel.carID = CFSwapInt32BigToHost(carID);
                alarmmodel.longitude = longitude;
                alarmmodel.latitude = latitude;
                alarmmodel.speed = CFSwapInt32BigToHost(speed);
                alarmmodel.orietation = CFSwapInt32BigToHost(orientation);
                alarmmodel.time = [NSString stringWithCString:time encoding:gbkEncoding];
                alarmmodel.type = [NSString stringWithCString:type encoding:gbkEncoding];
                alarmmodel.where = [NSString stringWithCString:where encoding:gbkEncoding];
                
                
                NSLog(@"carPathmodel:%@ ",alarmmodel);
                [array addObject:alarmmodel];
                return;

            }

        }
            break;
        case 7:
        {
            
        }
            break;
        case 0xffffffff:
        {
            int dataLengthOffeset = 0;
            unsigned int operation;
            memcpy(&operation, contentString + dataLengthOffeset,dataLength[0]);
            dataLengthOffeset += dataLength[0];
            char errorMessage[dataLength[1]];
            memcpy(&errorMessage, contentString+dataLengthOffeset,dataLength[1]);
            dataLengthOffeset += dataLength[1];
            NSString * errormessage = [NSString stringWithCString:errorMessage encoding:gbkEncoding];
            
            NSLog(@"请求错误：%x %@",CFSwapInt32BigToHost(operation),errormessage);
            return;
        }
            break;
            
        default:
            break;
    }
    
}

- (void)analysisgprsReceiveData:(NSData*)data
{
    const void * content = [data bytes];
    //解析转发：
    unsigned short int transmitHeader;
    memcpy(&transmitHeader, content, 2);
    if (transmitHeader != 0x2929) {
        return;
    }
    
    unsigned char transmitCMD;
    memcpy(&transmitCMD,content+2,1);
    switch (transmitCMD) {
        case 0xe3:
        {
            NSLog(@"analysisgprsReceiveData loginSuccess:%@",data);
            //            登录应答
            bool success;
            memcpy(&success,content+5,1);
            if (success == YES) {
                NSLog(@"GPRS：登录成功。");
                _loginGprs(YES);
            }
            else
            {
                _loginGprs(NO);
            }
        }
            break;
        case 0xaa:
        {
            //gprs通讯。
            unsigned short int packetLength;
            memcpy(&packetLength, content+5, 2);
            unsigned char protocol;
            memcpy(&protocol, content+9,1);
            char gprsDatastr[packetLength-15];
            memcpy(gprsDatastr, content+13, packetLength-15);
            
            int ip1 = 0;
            int ip2 = 0;
            int ip3 = 0;
            int ip4 = 0;
            memcpy(&ip1,content+5, 1);
            memcpy(&ip2,content+6, 1);
            memcpy(&ip3,content+7, 1);
            memcpy(&ip4,content+8, 1);
            NSLog(@"ip:%d.%d.%d.%d",ip1,ip2,ip3,ip4);
            
            unsigned short int gprsProtocol = 0;
            memcpy(&gprsProtocol, gprsDatastr+11,2);
            gprsProtocol = CFSwapInt16HostToBig(gprsProtocol);
            
            NSData * gprsProtocolData = [NSData dataWithBytes:&gprsProtocol length:2];
//            NSData * gprsData = [NSData dataWithBytes:gprsDatastr length:packetLength-15];
            NSData * gprsData = [NSData dataWithBytes:gprsDatastr length:30];
            //终端id
            char deviceid[8] = {0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0};
            memcpy(deviceid,gprsDatastr+4,7);
            unsigned long long deviceDDD = 0x0;
            memcpy(&deviceDDD, deviceid, 8);
            deviceDDD = CFSwapInt64HostToBig(deviceDDD);
            deviceDDD = deviceDDD>>8;
            for (int i =8*8; i>=0; i --) {
                if ((0xf&deviceDDD) == 0xf) {
                    deviceDDD = deviceDDD>>4;
                }
                else
                {
                    break;
                }
            }
            
            switch (gprsProtocol) {
                case 0x9955:
                {
                    NSLog(@"%llx的位置信息。",deviceDDD);
                }
                    break;
                case 0x9999:
                {
                    NSLog(@"报警信息。");
                }
                    break;
                default :
                {
                    NSLog(@"其%@",gprsProtocolData);
                }
                    break;
            }
            
        }
            
        default:
            break;
    }

}


- (NSData *)gprs_loginData:(unsigned int)userID
{
    unsigned int header = 0x2424;//头
    short int length = 2+2+7+2+2+2;
    length = CFSwapInt16HostToBig(length);//长度
    unsigned long long _userID = userID;//用户id
    unsigned long long i = 0x8000000000000000;
    int number = -3;
    while (!(i&_userID))
    {
        i>>=2;
        if (i == 0) {
            break;
        }
        number ++;
    };
    
    _userID = _userID<<(number*2);
    char id_string[8];
    memcpy(id_string,&_userID,8);
    
    unsigned long long true_id = 0x0;
    memcpy(&true_id,id_string,8);
    
    unsigned long long k = 0xffffffffffffffff;
    k = k << (64-number*2);
    k = k >> (64-number*2);
    
    unsigned long long trueUserID = true_id|k;
    
    trueUserID = CFSwapInt64BigToHost(trueUserID);
    
    unsigned short int cmd = 0x5000;//指令
    cmd = CFSwapInt16HostToBig(cmd);
    unsigned short int trail = 0x0d0a;
    trail = CFSwapInt16HostToBig(trail);
    //数据内容。
    char loginData[1024];
    memcpy(loginData, &header, 2);
    memcpy(loginData+2, &length, 2);
    memcpy(loginData+4, &trueUserID,7);
    memcpy(loginData+11, &cmd, 2);
    NSData * data = [NSData dataWithBytes:loginData length:13];
    uint16_t crc = CRC_GetModbus16((unsigned char *)[data bytes], (unsigned int)data.length);//校验码
    crc = CFSwapInt16BigToHost(crc);
    memcpy(loginData+13, &crc, 2);
    memcpy(loginData+15, &trail, 2);
    data = [NSData dataWithBytes:loginData length:17];
    NSLog(@"gprs_loginData：%@",data);
    
    
    return data;
}

- (NSData *)gprs_currentLocation:(unsigned int)userID
{
    unsigned int header = 0x2424;
    short int length = 2+2+7+2+2+2;
    length = CFSwapInt16HostToBig(length);
    unsigned long long _userID = userID;
    //    _userID = CFSwapInt32HostToBig(_userID);
    
    unsigned long long i = 0x8000000000000000;
    int number = -3;
    while (!(i&_userID))
    {
        i>>=2;
        if (i == 0) {
            break;
        }
        number ++;
    };
    
    _userID = _userID<<(number*2);
    char id_string[8];
    memcpy(id_string,&_userID,8);
    
    unsigned long long true_id = 0x0;
    memcpy(&true_id,id_string,8);
    
    unsigned long long k = 0xffffffffffffffff;
    k = k << (64-number*2);
    k = k >> (64-number*2);
    
    unsigned long long trueUserID = true_id|k;
    
    trueUserID = CFSwapInt64BigToHost(trueUserID);
    
    unsigned short int cmd = 0x5000;
    cmd = CFSwapInt16HostToBig(cmd);
    unsigned short int trail = 0x0d0a;
    trail = CFSwapInt16HostToBig(trail);
    //数据内容。
    char loginData[1024];
    memcpy(loginData, &header, 2);
    memcpy(loginData+2, &length, 2);
    memcpy(loginData+4, &trueUserID,7);
    memcpy(loginData+11, &cmd, 2);
    NSData * data = [NSData dataWithBytes:loginData length:13];
    uint16_t crc = CRC_GetModbus16((unsigned char *)[data bytes], (unsigned int)data.length);
    crc = CFSwapInt16BigToHost(crc);
    memcpy(loginData+13, &crc, 2);
    memcpy(loginData+15, &trail, 2);
    data = [NSData dataWithBytes:loginData length:17];
    NSLog(@"%@",data);
    
    return data;
}

- (NSData*)setListenPhoneNumber:(unsigned long long)number userID:(unsigned long long)userID
{
    unsigned int header = 0x4040;
    unsigned short int length = 2+2+7+11+2+2;
    unsigned long long temp1 = 0xf000000000000000;
    unsigned long long temp2 = 0x000000000000000f;

    for (NSUInteger i = 0; i < 16; i ++) {
        NSLog(@"%llx",(temp1&userID));
        if ((temp1&userID) == 0) {
            userID = userID<<4;
            userID = userID|temp2;
        }
        else
        {
            break;
        }
//        temp1 >>=4;
        temp2 = temp2|(temp2<<4);
    }
    unsigned short int cmd = 0x4130;
    NSMutableData * data = [NSMutableData data];
    [data appendBytes:&header length:2];
    length = CFSwapInt16HostToBig(length);
    [data appendBytes:&length length:2];
    userID = CFSwapInt64HostToBig(userID);
    [data appendBytes:&userID length:7];
    cmd = CFSwapInt16(cmd);
    [data appendBytes:&cmd length:sizeof(cmd)];
    [data appendBytes:&number length:11];
    NSData * phoneNumberData = [NSData dataWithBytes:&number length:11];
    NSLog(@"phoneNumberData:%@",phoneNumberData);
    
    
    uint16_t crc = CRC_GetModbus16((unsigned char *)[data bytes], (unsigned int)data.length);
    [data appendBytes:&crc length:sizeof(crc)];
    unsigned short int trail = 0x0d0a;
    trail = CFSwapInt16HostToBig(trail);
    [data appendBytes:&trail length:sizeof(trail)];
    NSLog(@"setListenPhoneNumber:%@",data);
    return data;
}


- (NSData *)gprs_followLocation:(unsigned long long)userID
{
    unsigned int header = 0x4040;
    short int length = 19;
    length = CFSwapInt16HostToBig(length);
    unsigned long long _userID = userID;
    //    _userID = CFSwapInt32HostToBig(_userID);
    
    unsigned long long i = 0x8000000000000000;
    int number = -3;
    while (!(i&_userID))
    {
        i>>=4;
        if (i == 0) {
            break;
        }
        number ++;
    };
    
    _userID = _userID<<number;
    char id_string[8];
    memcpy(id_string,&_userID,8);
    
    unsigned long long true_id = 0x0;
    memcpy(&true_id,id_string,8);
    
    unsigned long long k = 0xffffffffffffffff;
    k = k << (64-number*2);
    k = k >> (64-number*2);
    
    unsigned long long trueUserID = true_id|k;
    
    trueUserID = CFSwapInt64BigToHost(trueUserID);
    
    unsigned short int cmd = 0x4102;
    cmd = CFSwapInt16HostToBig(cmd);
    
    
    unsigned short timeInterval = 10;
    timeInterval = CFSwapInt16BigToHost(timeInterval);
    unsigned short int trail = 0x0d0a;
    trail = CFSwapInt16HostToBig(trail);
    //数据内容。
    char loginData[1024];
    memcpy(loginData, &header, 2);
    memcpy(loginData+2, &length, 2);
    memcpy(loginData+4, &trueUserID,7);
    memcpy(loginData+11, &cmd, 2);
    memcpy(loginData+13,&timeInterval,2);
    NSData * data = [NSData dataWithBytes:loginData length:15];
    uint16_t crc = CRC_GetModbus16((unsigned char *)[data bytes], (unsigned int)data.length);
    crc = CFSwapInt16BigToHost(crc);
    memcpy(loginData+15, &crc, 2);
    memcpy(loginData+17, &trail, 2);
    data = [NSData dataWithBytes:loginData length:19];
    NSLog(@"%@",data);
    
    return data;
}

- (NSData*)loginTransmitCenterName:(NSString*)name password:(NSString*)password loginGprs:(void(^)(BOOL success))loginGprs
{
    _loginGprs = loginGprs;
    unsigned short int header = 0x2929;
    unsigned char cmd = 0xA3;
    unsigned short int Length = 0x002E;
    Length = CFSwapInt16BigToHost(Length);
    unsigned int fakeIP = 0x00000000;
    unsigned char put = 0x20;
    unsigned char tail = 0x0d;
    
    NSMutableData * contentData = [NSMutableData data];
    [contentData appendBytes:&header length:sizeof(header)];
    [contentData appendBytes:&cmd length:sizeof(cmd)];
    [contentData appendBytes:&Length length:sizeof(Length)];
    [contentData appendBytes:&fakeIP length:sizeof(fakeIP)];
    [contentData appendBytes:[name cStringUsingEncoding:NSASCIIStringEncoding] length:name.length];

    for (NSUInteger i = 0 ; i < (20-name.length); i++) {
        [contentData appendBytes:&put length:1];
    }
    [contentData appendBytes:[password cStringUsingEncoding:NSASCIIStringEncoding] length:password.length];
    for (NSUInteger i = 0 ; i < (20-password.length); i++) {
        [contentData appendBytes:&put length:1];
    }
    
    unsigned char * dataString = (unsigned char *)[contentData bytes];
    unsigned char eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    
    [contentData appendBytes:&eox length:1];
    [contentData appendBytes:&tail length:1];
    
    return contentData;
}


- (NSData*)transmit:(NSData*)data fakeIP:(NSString*)fakeIP
{
    NSArray * fakeIPArray = [fakeIP componentsSeparatedByString:@"."];
    int ip1 = [fakeIPArray[0] intValue];
    int ip2 = [fakeIPArray[1] intValue];
    int ip3 = [fakeIPArray[2] intValue];
    int ip4 = [fakeIPArray[3] intValue];
    
    NSMutableData * contentData = [NSMutableData data];
    unsigned short int header = 0x2929;
    unsigned char cmd = 0xAA;
    unsigned short int Length = 15+data.length;
    Length = CFSwapInt16BigToHost(Length);
    char fake_IP[4];
    memcpy(fake_IP,&ip1, 1);
    memcpy(fake_IP+1,&ip2,1);
    memcpy(fake_IP+2,&ip3,1);
    memcpy(fake_IP+3,&ip4,1);
    unsigned char hold1 = 0x00;
    unsigned char hold2 = 0x02;
    unsigned char tail = 0x0d;
    unsigned char protocol = 0x05;

    [contentData appendBytes:&header length:sizeof(header)];
    [contentData appendBytes:&cmd length:sizeof(cmd)];
    [contentData appendBytes:&Length length:sizeof(Length)];
    [contentData appendBytes:fake_IP length:4];
    NSData * datadata = [NSData dataWithBytes:fake_IP length:4];
    NSLog(@"datadataip:%@",datadata);
    
    [contentData appendBytes:&protocol length:sizeof(protocol)];
    [contentData appendBytes:&hold1 length:sizeof(hold1)];
    [contentData appendBytes:&hold2 length:sizeof(hold2)];
    [contentData appendBytes:&hold1 length:sizeof(hold1)];
    
    [contentData appendData:data];
    unsigned char * dataString = (unsigned char *)[contentData bytes];
    unsigned char eox;
    memcpy(&eox, dataString, 1);
    for (NSUInteger i = 1 ; i < contentData.length; i ++) {
        eox = eox^dataString[i];
    }
    
    [contentData appendBytes:&eox length:1];
    [contentData appendBytes:&tail length:1];
    return contentData;
}

//16进制转换为nsdata
+ (NSData*)dataFormHexString:(NSString*)string{
    NSString * hexString =[[string uppercaseString] stringByReplacingOccurrencesOfString:@" " withString:@""];
    if (!(hexString && [hexString length] > 0 && [hexString length]%2 == 0)) {
        return nil;
    }
    Byte tempbyt[1]={0};
    NSMutableData* bytes=[NSMutableData data];
    for(int i=0;i<[hexString length];i++)
    {
        unichar hex_char1 = [hexString characterAtIndex:i]; ////两位16进制数中的第一位(高位*16)
        int int_ch1;
        if(hex_char1 >= '0' && hex_char1 <='9')
            int_ch1 = (hex_char1-48)*16;   //// 0 的Ascll - 48
        else if(hex_char1 >= 'A' && hex_char1 <='F')
            int_ch1 = (hex_char1-55)*16; //// A 的Ascll - 65
        else
            return nil;
        i++;
        
        unichar hex_char2 = [hexString characterAtIndex:i]; ///两位16进制数中的第二位(低位)
        int int_ch2;
        if(hex_char2 >= '0' && hex_char2 <='9')
            int_ch2 = (hex_char2-48); //// 0 的Ascll - 48
        else if(hex_char2 >= 'A' && hex_char2 <='F')
            int_ch2 = hex_char2-55; //// A 的Ascll - 65
        else
            return nil;
        
        tempbyt[0] = int_ch1+int_ch2;  ///将转化后的数放入Byte数组里
        [bytes appendBytes:tempbyt length:1];
    }
    return bytes;
}

//
- (NSString *)hexStringFromData:(NSData*)data{
    return [[[[NSString stringWithFormat:@"%@",data]
              stringByReplacingOccurrencesOfString: @"<" withString: @""]
             stringByReplacingOccurrencesOfString: @">" withString: @""]
            stringByReplacingOccurrencesOfString: @" " withString: @""];
}

//转ASCII
char *chstohex (const char* chs )
{
    char hex[16] = { '0', '1', '2', '3', '4', '5', '6', \
        '7', '8','9', 'A', 'B', 'C', 'D', 'E', 'F'
    };
    unsigned long len = strlen ( chs );
    char* ascii = NULL ;
    ascii = (char*)calloc ( len * 3 + 1, sizeof(char) );
    int i = 0;
    while( i < len )
    {
        ascii[i*2] = hex[(int)( (char)chs[i] / 16 )] ;
        ascii[i*2 + 1] = hex[(int)( (char)chs[i] % 16 )] ;
        ++i;
    }
    NSLog(@"\nascii:%s",ascii);
    return ascii;
}

//大小端转换
unsigned int * convertToLittleEndian(unsigned int *data, int len)
{
    for (int index = 0; index < len; index ++) {
        *data = ((*data & 0xff000000) >> 24)
        | ((*data & 0x00ff0000) >>  8)
        | ((*data & 0x0000ff00) <<  8)
        | ((*data & 0x000000ff) << 24);
        data ++;
    }
    //NSData * contentData = [NSData dataWithBytes:data length:sizeof(data)];
    return data;
}

@end