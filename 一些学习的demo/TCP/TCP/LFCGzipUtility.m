//
//  LFCGzipUtility.m
//  IosApp
//
//  Created by 苗恒聚 on 12-8-20.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//
#import "LFCGzipUtility.h"
#import "zlib.h"
#import "zconf.h"

#define MEMLEN 1024 * 10

@implementation LFCGzipUtility

#pragma mark -------压缩-------
+(NSData *)compressData:(NSData *)uncompressedData{
    if (!uncompressedData || [uncompressedData length] == 0)
	{
//		NSLog(@"%s: Error: Can't compress an empty or null NSData object.", __func__);
		return nil;
	}
    //原始数据 
    unsigned char *pchSrc =  (Byte *)[uncompressedData bytes]; 
    unsigned long nSrcLen = [uncompressedData length]; 
    
    //压缩之后的数据 
    unsigned char achComp[MEMLEN]; 
    unsigned long nCompLen = MEMLEN ; 
    
    //压缩 
    compress(achComp,&nCompLen, pchSrc,nSrcLen);
    return [NSData dataWithBytes:achComp length:nCompLen];
}

#pragma mark -------解压-------
+(NSData *)decompressData:(NSData *)compressedData{
    if ([compressedData length] == 0) return compressedData;
    
    unsigned long full_length = [compressedData length];
    unsigned long half_length = [compressedData length] / 2;
    
    NSMutableData *decompressed = [NSMutableData dataWithLength: full_length + half_length];
    BOOL done = NO;
    int status;
    
    z_stream strm;
    strm.next_in = (Bytef *)[compressedData bytes];
    strm.avail_in = (uInt)[compressedData length];
    strm.total_out = 0;
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;

    if (inflateInit2(&strm, (15+32)) != Z_OK) return nil;
    while (!done)
    {
        if (strm.total_out >= [decompressed length])
            [decompressed increaseLengthBy: half_length];
        strm.next_out = [decompressed mutableBytes] + strm.total_out;
        strm.avail_out = (uInt)[decompressed length] - (uInt)strm.total_out;
        
        status = inflate (&strm, Z_SYNC_FLUSH);
        
        if (status == Z_STREAM_END) done = YES;
        
        else if (status != Z_OK) break;
        
    }
    
    if (inflateEnd (&strm) != Z_OK) return nil;
    
    // Set real length.
    if (done)
    {
        [decompressed setLength: strm.total_out];
        return [NSData dataWithData: decompressed];
    }
    else return nil;
}

@end