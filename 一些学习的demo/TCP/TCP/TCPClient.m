//
//  TCPClient.m
//  TCP
//
//  Created by 米花 mihuasama on 16/4/23.
//  Copyright © 2016年 tongguan. All rights reserved.
//

#import "TCPClient.h"
#import "NetAnalysis.h"
#import "GCDAsyncSocket.h"

@interface TCPClient ()
@property (copy,nonatomic) void(^successBlock)(void);
@end

@implementation TCPClient
{
    // 申明一个变量名 TCP socket连接
    GCDAsyncSocket * _sendSocket;
    
    // 用来存放所有的socket连接
    NSMutableArray * _allClientArray;
    BOOL reconnect;
    
    NSMutableData * contentData;
}

- (void)createTcpsocket:(NSString*)ip port:(uint16_t)port connectSuccess:(void(^)(void))success
{
    _successBlock = success;
    _allClientArray = [NSMutableArray array];
    
    //创建一个后台队列等待接受数据
    dispatch_queue_t dQueue = dispatch_queue_create("socket queue", NULL);
    _sendSocket  = [[GCDAsyncSocket alloc]initWithDelegate:self delegateQueue:dQueue socketQueue:nil];
    NSString * host = ip;
    NSError * error;
    [_sendSocket connectToHost:host onPort:port error:&error];
    NSLog(@"error%@",error);
}




#pragma mark -GCDAsyncSocketDelegate
- (void)socket:(GCDAsyncSocket *)sock didConnectToHost:(NSString *)host port:(uint16_t)port {
    NSLog(@"连接成功");
    // 等待数据来啊
    _successBlock();
    [sock readDataWithTimeout:-1 tag:200];
}

- (void)writeData:(NSData*)data
{
    [_sendSocket writeData:data withTimeout:-1 tag:10];
}

- (void)socket:(GCDAsyncSocket *)sock didReadData:(NSData *)data withTag:(long)tag {
    
    NSLog(@"接收到服务器返回的数据:data%lu",data.length);
    
    if (self.analysis == nil) {
        self.analysis = [NetAnalysis defaultNetAnalysis];
    }
    
    if (data.length<4) {
        return;
    }
    else
    {
        unsigned int header;
        memcpy(&header, [data bytes], 4);
        header = CFSwapInt32BigToHost(header);
        if (header == 0x12345678) {
            contentData = nil;
            unsigned int tail;
            int length = (int)data.length-4;
            char * point = (char*)data.bytes;
            memcpy(&tail,point+length, 4);
            tail = CFSwapInt32BigToHost(tail);
            if (tail == 0x87654321) {
                [self.analysis analysisReceiveData:data];
                [sock readDataWithTimeout:-1 tag:200];
                return;
            }
            else
            {
                contentData = [NSMutableData data];
                [contentData appendData:data];
            }
        }
        else
        {
            unsigned int tail;
            int length = (int)data.length-4;
            char * point = (char*)data.bytes;
            memcpy(&tail,point+length, 4);
            tail = CFSwapInt32BigToHost(tail);
            if (tail == 0x87654321) {
                [contentData appendData:data];
                [sock readDataWithTimeout:-1 tag:200];
                [self.analysis analysisReceiveData:contentData];
                return;
            }
            else
            {
                [contentData appendData:data];
            }
            
        }
    }
    
    [sock readDataWithTimeout:-1 tag:200];
    return;
}






@end
