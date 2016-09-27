//
//  LFCGzipUtility.h
//  IosApp
//
//  Created by 苗恒聚 on 12-8-20.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//
#import <Foundation/Foundation.h>

@interface LFCGzipUtility : NSObject
+(NSData *)compressData:(NSData *)uncompressedData; 
+(NSData *)decompressData:(NSData *)compressedData;
@end