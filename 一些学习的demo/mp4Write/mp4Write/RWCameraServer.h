//
//  CamraServer.h
//  PhoneCameraNetSDK
//
//  Created by tongguan on 15/11/5.
//  Copyright © 2015年 tongguan. All rights reserved.
//

#import <Foundation/Foundation.h>
@import AVFoundation;
@import UIKit;

@protocol CameraSeverDelegate <NSObject>
//代理回调出YUV数据
@optional
- (void)outPutYUVdataSource:(CMSampleBufferRef  _Nonnull)sampleBuffer;
@end

@interface RWCameraServer : NSObject
- (BOOL)cameraSetupWithDelegate:(id<CameraSeverDelegate>  _Nonnull)delegate
              VideoCaptureQueue:(dispatch_queue_t  _Nonnull)videoCaptureQueue
              VideoPreLayerView:(UIView* _Null_unspecified)prelayerView;
- (void)startCapture;
- (void)stopCapture;
- (void)captureImage:(NSString* _Nonnull)path quality:(float)quality;
- (BOOL)changeCameraPosition;
- (void)flashswitch:(int)mode;
//设置参数
- (void)setCaptureParam:(int)soureLevel fps:(int)fps whiteBalance:(int)whiteBalance exposure:(int)exposure;

@end

