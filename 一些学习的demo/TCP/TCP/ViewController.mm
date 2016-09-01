//
//  ViewController.m
//  TCP
//
//  Created by tongguan on 15/8/26.
//  Copyright (c) 2015年 tongguan. All rights reserved.
//

#import "ViewController.h"
#import "GCDAsyncSocket.h"
#import "TGProtocol.h"
#import "NetAnalysis.h"
#import "STZlib.h"
#import "LFCGzipUtility.h"
#import "TCPClient.h"
#import "TCPClientGPRS.h"

//typedef struct{
//
//    char serverIP[32];
//    unsigned short serverPort;
//    char szUsername[16];
//    char szPwd[16];
//    LoginType lLoginType;
//    int64_t llNodeId;
//    MsgCallBack cb;
//    void *context;
//
//}NET_LOGIN_GW_INF, *LPNET_LOGIN_GW_INF;

typedef struct _tagTG_GET_TCS_REQ{
    uint32_t  type;
    char LoginName[16];
    char password[128];
    
}TG_GET_TCS_REQ;

@interface ViewController () <GCDAsyncSocketDelegate>
@property (strong,nonatomic) NetAnalysis * analysis;
@property (strong,nonatomic) TCPClient * tcpClient1;
@property (strong,nonatomic) TCPClientGPRS * tcpClient2;
@property (strong,nonatomic) LoginModel * model;
@end

@implementation ViewController
{
    // 申明一个变量名 TCP socket连接
    GCDAsyncSocket * _sendSocket;
    
    // 用来存放所有的socket连接
    NSMutableArray * _allClientArray;
    BOOL reconnect;
    
    NSMutableData * contentData;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    
//    92.160.1.149
#pragma mark - =======调用demo=======
    _tcpClient1 = [[TCPClient alloc]init];
    [_tcpClient1 createTcpsocket:@"61.145.122.143" port:4519 connectSuccess:^{
        _analysis = [NetAnalysis defaultNetAnalysis];
        
        __weak ViewController * wkSelf = self;
        NSData * loginData = [_analysis dataWithLoginName:@"lkk" password:@"lkk" result:^(LoginModel *model) {
            if (model.success == 1) {

                NSData * data = [_analysis dataWithALLCarsInfo:02 result:^(NSArray<UserALLCarsInfoModel *> *array) {
                    
                }];
                [_tcpClient1 writeData:data];
            }
            
            
            NSLog(@"登录成功 %@",model);
            wkSelf.model = model;
            [wkSelf connectAnotherServer];
            
        }];
        [_tcpClient1 writeData:loginData];
        
    }];
    

#pragma mark - =======调用=======
    
    //     [self createTcpsocket];
    
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)connectAnotherServer
{
    _tcpClient2 = [[TCPClientGPRS alloc]init];
    [_tcpClient2 createTcpsocket:self.model.gprs_IP port:[self.model.gprs_Port intValue] connectSuccess:^{
        
//        NSData * data = [_analysis gprs_loginData:self.model.userID];
        
        NSData * data = [_analysis loginTransmitCenterName:@"lkk" password:@"lkk" loginGprs:^(BOOL success) {
             NSData * data = [_analysis setListenPhoneNumber:13538217865 userID:13592320121];
                data = [_analysis transmit:data fakeIP:@"92.160.1.149"];
                NSLog(@"transmitData %@",data);
                [_tcpClient2 writeData:data];
        }];
        
        data = [_analysis transmit:data fakeIP:@"92.160.1.149"];
        [_tcpClient2 writeData:data];
        
    }];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
