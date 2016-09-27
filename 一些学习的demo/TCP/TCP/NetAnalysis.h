//
//  NetAnalysis.h
//  Socketcf
//
//  Created by 米花 mihuasama on 16/3/14.
//  Copyright © 2016年 tongguan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Protocol.h"

@interface LoginModel : NSObject
@property (assign,nonatomic) unsigned int success;
@property (assign,nonatomic) unsigned int  userID;
@property (copy,nonatomic) NSString * gprs_IP;
@property (copy,nonatomic) NSString * gprs_Port;
@property (assign,nonatomic) unsigned int userType;
@property (copy,nonatomic) NSString * concrete_IP;
@property (copy,nonatomic) NSString * concrete_Port;
@end

@interface UserInfoModel : NSObject
@property (assign,nonatomic) unsigned int userID;
@property (assign,nonatomic) unsigned int userTypeID;
@property (assign,nonatomic) unsigned int groupID;
@property (copy,nonatomic) NSString * username;
@property (copy,nonatomic) NSString * password;
@property (copy,nonatomic) NSString * ownerName;
@property (copy,nonatomic) NSString * sTel;
@property (copy,nonatomic) NSString * sMemo;
@property (copy,nonatomic) NSString * timeLimit;
@property (copy,nonatomic) NSString * birthday;
@property (copy,nonatomic) NSString * signLimit;
@property (copy,nonatomic) NSString * menu;
@end

@interface UserGroupModel : NSObject
@property (assign,nonatomic) unsigned int userGroupID;
@property (copy,nonatomic) NSString * userGroupName;
@property (assign,nonatomic) unsigned int userTypeID;
@property (copy,nonatomic) NSString * userGroupMemo;
@end

//获取用户名下所有车组资料
@interface UserALLCarGroupModel : NSObject
@property (assign,nonatomic) unsigned int vehGroupID;
@property (copy,nonatomic) NSString * vehGroupName;
@property (copy,nonatomic) NSString * contact;
@property (copy,nonatomic) NSString * sTel1;
@property (copy,nonatomic) NSString * sTel2;
@property (copy,nonatomic) NSString * address;
@property (assign,nonatomic) unsigned int fVehGroupID;
@property (copy,nonatomic) NSString * updateTime;
@end

//获取用户名下所有车辆资料
@interface UserALLCarsInfoModel: NSObject
@property (copy,nonatomic) NSString * carInfo;
@end

//下载车辆历史轨迹
@interface  CarPathModel: NSObject
@property (assign,nonatomic) unsigned int carID;
@property (assign,nonatomic) double longitude;
@property (assign,nonatomic) double latitude;
@property (assign,nonatomic) unsigned int orietation;
@property (assign,nonatomic) unsigned int speed;
@property (assign,nonatomic) BOOL isAlarm;
@property (assign,nonatomic) unsigned int mileage;
@property (copy,nonatomic)   NSString * status;
@property (assign,nonatomic) BOOL isLocation;
@property (copy,nonatomic)   NSString * date;
@end


@interface AlarmModel : NSObject
@property (assign,nonatomic) unsigned int carID;
@property (copy,nonatomic) NSString * time;
@property (copy,nonatomic) NSString * type;
@property (assign,nonatomic) double  longitude;
@property (assign,nonatomic) double latitude;
@property (assign,nonatomic) unsigned int  speed;
@property (assign,nonatomic) unsigned int orietation;
@property (copy,nonatomic) NSString * where;
@end

@interface NetAnalysis : NSObject
+ (NetAnalysis*)defaultNetAnalysis;
//登录指令
- (NSData*)dataWithLoginName:(NSString*)name password:(NSString*)password result:(void(^)(LoginModel*model))resultBlock;
//读取用户信息指令
- (NSData*)dataWithUserInfo:(unsigned int)userID result:(void(^)(UserInfoModel*model))resultBlock;
//读用户所属用户组资料
- (NSData*)dataWithUserGroupInfo:(unsigned int)userID result:(void(^)(UserGroupModel*model))resultBlock;
//获取用户名下所有车组资料
- (NSData*)dataWithUserCarGroupInfo:(unsigned int)userID result:(void(^)(NSArray<UserALLCarGroupModel*>*array))resultBlock;
//获取用户名下所有车资料
- (NSData*)dataWithALLCarsInfo:(unsigned int)userID result:(void(^)(NSArray<UserALLCarsInfoModel*>*array))resultBlock;
//下载车辆历史轨迹
- (NSData*)dataWithAllCarPathInfo:(unsigned int)carID statTime:(NSString*)startTime endTime:(NSString*)endTime result:(void(^)(void))resultBlock;
//查询车辆行驶里程
//type:0按日统计 1：按周统计 2：按月统计 3：按季度统计
- (NSData*)dataWithAllCardistance:(unsigned int)carID statTime:(NSString*)startTime endTime:(NSString*)endTime type:(unsigned int)type result:(void(^)(void))resultBlock;
//查询报警数据
//carID 内容为车辆ID列表 多个车辆ID用,分割 当为空时 为所有车辆
//type 内容为报警类型 多个报警类型用,分割
- (NSData*)querryalarmData:(NSString*)carID statTime:(NSString*)startTime endTime:(NSString*)endTime type:(NSString*)type result:(void(^)(void))resultBlock;


#pragma mark - =======转发服务器在下面=======


- (NSData*)loginTransmitCenterName:(NSString*)name password:(NSString*)password loginGprs:(void(^)(BOOL success))loginGprs;
- (NSData*)transmit:(NSData*)data fakeIP:(NSString*)fakeIP;



#pragma mark - =======gprs在下面=======
- (NSData *)gprs_followLocation:(unsigned long long)userID;
- (NSData *)gprs_loginData:(unsigned int)userID;
- (NSData*)setListenPhoneNumber:(unsigned long long)number userID:(unsigned long long)userID;

#pragma mark- =======gprs在上面=======
//心跳。
- (NSData*)heartBeat;

- (void)analysisReceiveData:(NSData*)data;
- (void)analysisgprsReceiveData:(NSData*)data;

+ (NSData*)initWithLoginStruct:(netStruct_twoData*)netstruct name:(NSString*)name password:(NSString*)password;


@end
