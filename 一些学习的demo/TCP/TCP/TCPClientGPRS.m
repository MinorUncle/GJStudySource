//
//  TCPClient+GPRS.m
//  TCP
//
//  Created by 米花 mihuasama on 16/5/2.
//  Copyright © 2016年 tongguan. All rights reserved.
//

#import "TCPClientGPRS.h"

@implementation TCPClientGPRS
NSMutableData* localcontentData;

- (void)socket:(GCDAsyncSocket *)sock didReadData:(NSData *)data withTag:(long)tag {
    
//    NSLog(@"接收到服务器返回的数据:data%@",data);
//    NSLog(@"analysisGPRSReceiveData:%@",data);
    const void * content = [data bytes];
    //解析转发：
 

    if (self.analysis == nil) {
        self.analysis = [NetAnalysis defaultNetAnalysis];
    }
    
    unsigned int tail;
    int length = (int)data.length-1;
    char * point = (char*)data.bytes;
    memcpy(&tail,point+length, 1);
    unsigned short int transmitHeader;
    memcpy(&transmitHeader, content, 2);
    
    
    if (transmitHeader == 0x2929) {
            localcontentData = nil;
            if (tail == 0x0d) {
                [self.analysis analysisgprsReceiveData:data];
                [sock readDataWithTimeout:-1 tag:200];
                return;
            }
            else
            {
                localcontentData = [NSMutableData data];
                [localcontentData appendData:data];
            }
        }
        else
        {
            unsigned int tail;
            int length = (int)data.length-4;
            char * point = (char*)data.bytes;
            memcpy(&tail,point+length, 4);
            tail = CFSwapInt32BigToHost(tail);
            if (tail == 0x0d) {
                [localcontentData appendData:data];
                [self.analysis analysisReceiveData:localcontentData];
                [sock readDataWithTimeout:-1 tag:200];
                return;
            }
            else
            {
                [localcontentData appendData:data];
            }
            
        }
    [sock readDataWithTimeout:-1 tag:200];
    return;
}


@end
