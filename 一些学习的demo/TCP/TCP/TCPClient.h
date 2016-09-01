//
//  TCPClient.h
//  TCP
//
//  Created by 米花 mihuasama on 16/4/23.
//  Copyright © 2016年 tongguan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NetAnalysis.h"
#import "GCDAsyncSocket.h"
@interface TCPClient : NSObject<GCDAsyncSocketDelegate>
@property (strong,nonatomic) NetAnalysis * analysis;
- (void)createTcpsocket:(NSString*)ip port:(uint16_t)port connectSuccess:(void(^)(void))success;
- (void)writeData:(NSData*)data;
@end
