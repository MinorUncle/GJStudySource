//
//  getUUID.m
//  UUID
//
//  Created by tongguan on 15/11/6.
//  Copyright © 2015年 tongguan. All rights reserved.
//

#import "getUUID.h"
#import "KeyChain.h"

#define myAppUUIDKEY @"mynameisfengruiwenhahawohaogaoxiaone"

@implementation GetUUID

+(NSString*)getUUID;
{
    
    if ([KeyChain load:myAppUUIDKEY]) {
        
        NSString *result = [KeyChain load:myAppUUIDKEY];
        
        return result;
    }
    else
    {
        CFUUIDRef puuid = CFUUIDCreate( nil );
        CFStringRef uuidString = CFUUIDCreateString( nil, puuid );
        NSString * result = (NSString *)CFBridgingRelease(CFStringCreateCopy( NULL, uuidString));
        CFRelease(puuid);
        CFRelease(uuidString);

        [KeyChain save:myAppUUIDKEY data:result];
        
        return result;
    }
    
    return nil;
}
@end
