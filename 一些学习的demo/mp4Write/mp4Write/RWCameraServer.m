//
//  CamraServer.m
//  PhoneCameraNetSDK
//
//  Created by tongguan on 15/11/5.
//  Copyright © 2015年 tongguan. All rights reserved.
//

#import "RWCameraServer.h"

@interface RWCameraServer () <AVCaptureVideoDataOutputSampleBufferDelegate,AVCaptureFileOutputRecordingDelegate>
@property(nonatomic, strong) AVCaptureDevice * videoDevice;                      //设备
@property(nonatomic, strong) AVCaptureDeviceInput * videoInput;                 //输入
@property(nonatomic, strong) AVCaptureMovieFileOutput * videoOutput;    //视频输出
@property(nonatomic, strong) AVCaptureStillImageOutput * imageOutput;   //图片输出

@property(nonatomic, strong) AVCaptureConnection * videoConnection;      //连接输出输出
@property(nonatomic, strong) AVCaptureSession * videoSession;                 //会话
@property(nonatomic,strong) AVCaptureVideoPreviewLayer * videoPrelayer;      //显示
@property (assign,nonatomic) id <CameraSeverDelegate> delegate;           //代理


@end

@implementation RWCameraServer
{
    UIView * _preView;
    dispatch_queue_t _videoCaptureQueue;
    int cameraSetupLastFPS;
}
//成员配置。
- (BOOL)cameraSetupWithDelegate:(id<CameraSeverDelegate>  _Nonnull)delegate
              VideoCaptureQueue:(dispatch_queue_t  _Nonnull)videoCaptureQueue
              VideoPreLayerView:(UIView* _Null_unspecified)prelayerView
{
    _preView = prelayerView;
    _delegate = delegate;
    
    //设备为Video
    self.videoDevice=[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    //输入源设置为Video设备
    NSError * error;
    self.videoInput=[AVCaptureDeviceInput deviceInputWithDevice:self.videoDevice error:&error];
    if (error) {
        NSLog(@"%@",error);
        return NO;
    }
    
    //创建会话
    self.videoSession=[[AVCaptureSession alloc]init];
    self.videoSession.sessionPreset = AVCaptureSessionPreset1280x720;
    
    //创建视频输出
    self.videoOutput=[[AVCaptureMovieFileOutput alloc]init];
    //抛出老帧，降低内存消耗
    //self.videoOutput.alwaysDiscardsLateVideoFrames=YES;
    ////输出设置
    //self.videoOutput.videoSettings=@{(id)kCVPixelBufferPixelFormatTypeKey:@(kCVPixelFormatType_420YpCbCr8BiPlanarFullRange)};
    
    //图片输出
    self.imageOutput = [[AVCaptureStillImageOutput alloc]init];
    NSDictionary * imageOutputSettings = @{AVVideoCodecKey:AVVideoCodecJPEG};
    self.imageOutput.outputSettings = imageOutputSettings;
    
    //配置输出线程
    if(!videoCaptureQueue)
    {
        NSLog(@"videoCaptureQueue is NULL.");
        return NO;
    }
    _videoCaptureQueue = videoCaptureQueue;
    //[self.videoOutput setSampleBufferDelegate:self queue:videoCaptureQueue];
    
    //为会话添加输入
    if ([self.videoSession canAddInput:self.videoInput]) {
        [self.videoSession addInput:self.videoInput];
    }
    else
    {
        NSLog(@"videoSession add input faild.");
        return NO;
    }
    
    //为会话添加输出
    if ([self.videoSession canAddOutput:self.videoOutput]) {
        [self.videoSession addOutput:self.videoOutput];
    }
    else
    {
        NSLog(@"videoSession add Videooutput is faild.");
        return NO;
    }
    if ([self.videoSession canAddOutput:self.imageOutput]) {
        [self.videoSession addOutput:self.imageOutput];
    }
    else
    {
        NSLog(@"videoSession add Videooutput is faild.");
        return NO;
    }
    
    //连接输入和输出
    self.videoConnection = [self.videoOutput connectionWithMediaType:AVMediaTypeVideo];
    
    //录制显示为空的话就不显示
    if (prelayerView) {
        self.videoPrelayer = [AVCaptureVideoPreviewLayer    layerWithSession:self.videoSession];
        [self.videoPrelayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
        self.videoPrelayer.frame = prelayerView.layer.bounds;
        [prelayerView.layer addSublayer:self.videoPrelayer];
    }
    
    //设置设备画面工作模式
    if([self.videoDevice.activeFormat isVideoStabilizationModeSupported:AVCaptureVideoStabilizationModeStandard]){
        [self.videoConnection setPreferredVideoStabilizationMode:AVCaptureVideoStabilizationModeStandard];
    }
    else if([self.videoDevice.activeFormat isVideoStabilizationModeSupported:AVCaptureVideoStabilizationModeAuto]){
        [self.videoConnection setPreferredVideoStabilizationMode:AVCaptureVideoStabilizationModeAuto];
    }
    else if([self.videoDevice.activeFormat isVideoStabilizationModeSupported:AVCaptureVideoStabilizationModeCinematic]) {
        [self.videoConnection setPreferredVideoStabilizationMode:AVCaptureVideoStabilizationModeCinematic];
    }
    
    //    帧率设置
    [self.videoSession beginConfiguration];
    for(AVCaptureDeviceFormat *vFormat in [self.videoDevice formats] )
    {
        CMFormatDescriptionRef description= vFormat.formatDescription;
        //        float maxrate=((AVFrameRateRange*)[vFormat.videoSupportedFrameRateRanges objectAtIndex:0]).maxFrameRate;
        
        
        
        //方向
        _videoConnection.videoOrientation = AVCaptureVideoOrientationPortrait;
        _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeLeft;
        _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
        
        
        if(CMFormatDescriptionGetMediaSubType(description) == kCVPixelFormatType_420YpCbCr8BiPlanarFullRange)
        {
            if ( YES == [self.videoDevice lockForConfiguration:NULL] )
            {
                self.videoDevice.focusMode = AVCaptureFocusModeContinuousAutoFocus;
                self.videoDevice.activeFormat = vFormat;
                /*
                 5 ------- FPS 7-8
                 8 ------- FPS 12-13
                 */
                cameraSetupLastFPS = 8;
                [self.videoDevice setActiveVideoMinFrameDuration:CMTimeMake(1,8)];
                [self.videoDevice setActiveVideoMaxFrameDuration:CMTimeMake(1,8)];
                [self.videoDevice setWhiteBalanceMode:AVCaptureWhiteBalanceModeContinuousAutoWhiteBalance];
                [self.videoDevice unlockForConfiguration];
            }
        }
    }
    [self.videoSession commitConfiguration];
    
    
    return YES;
}

- (void)captureOutput:(AVCaptureFileOutput *)captureOutput didStartRecordingToOutputFileAtURL:(NSURL *)fileURL fromConnections:(NSArray *)connections
{
    NSLog(@"kaishi");
}

- (void)captureOutput:(AVCaptureFileOutput *)captureOutput didFinishRecordingToOutputFileAtURL:(NSURL *)outputFileURL fromConnections:(NSArray *)connections error:(NSError *)error
{
    NSLog(@"jieshu");

}



- (void)setCaptureParam:(int)soureLevel fps:(int)fps whiteBalance:(int)whiteBalance exposure:(int)exposure
{
    //    帧率设置
    [self.videoSession beginConfiguration];
    for(AVCaptureDeviceFormat *vFormat in [self.videoDevice formats] )
    {
        CMFormatDescriptionRef description= vFormat.formatDescription;
       //方向
        _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeLeft;
        _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
        if(CMFormatDescriptionGetMediaSubType(description) == kCVPixelFormatType_420YpCbCr8BiPlanarFullRange)
        {
            if ( YES == [self.videoDevice lockForConfiguration:NULL] )
            {
                self.videoDevice.focusMode = AVCaptureFocusModeContinuousAutoFocus;
                self.videoDevice.activeFormat = vFormat;
                
                /*
                 5 ------- FPS 7-8
                 6 ------- FPS 8-9
                 7 ------- FPS 10-11
                 8 ------- FPS 12-13
                 */
                int localFPS = 8;
                if (fps>=10&&fps<=12) {
                    localFPS = 8;
                }
                else if (fps < 10)
                {
                    localFPS = 5;
                }
                else if (fps>=13&&fps<=15)
                {
                    localFPS = 9;
                }
                else if (fps>=16&&fps<=18)
                {
                    localFPS = 10;
                }
                else if (fps>=19&&fps<=22)
                {
                    localFPS = 11;
                }
                else
                {
                    localFPS = fps;
                }
                if (localFPS>=30) {
                    localFPS = 30;
                }
                cameraSetupLastFPS = localFPS;
                [self.videoDevice setActiveVideoMinFrameDuration:CMTimeMake(1,localFPS)];
                [self.videoDevice setActiveVideoMaxFrameDuration:CMTimeMake(1,localFPS)];
                
                if (whiteBalance == 0) {
                    [self.videoDevice setExposureMode:AVCaptureExposureModeLocked];
                }
                else if (whiteBalance == 1)
                {
                    [self.videoDevice setExposureMode:AVCaptureExposureModeAutoExpose];
                }
                else if (whiteBalance == 2)
                {
                    [self.videoDevice setExposureMode:AVCaptureExposureModeContinuousAutoExposure];
                }
                
                if (whiteBalance == 0) {
                    [self.videoDevice setWhiteBalanceMode:AVCaptureWhiteBalanceModeLocked];
                }
                else if (whiteBalance == 1)
                {
                    [self.videoDevice setWhiteBalanceMode:AVCaptureWhiteBalanceModeAutoWhiteBalance];
                }
                else if (whiteBalance == 2)
                {
                    [self.videoDevice setWhiteBalanceMode:AVCaptureWhiteBalanceModeContinuousAutoWhiteBalance];
                }
                [self.videoDevice unlockForConfiguration];
            }
        }
    }
    [self.videoSession commitConfiguration];
}

- (BOOL)changeCameraPosition
{
    BOOL result = NO;
    AVCaptureDeviceInput *newVideoInput;
    [self.videoSession stopRunning];
    AVCaptureDevicePosition currentCameraPosition = [self.videoInput.device position];
    NSArray * devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    if (currentCameraPosition == AVCaptureDevicePositionBack)
    {
        for (AVCaptureDevice * device in devices) {
            if(device.position == AVCaptureDevicePositionFront)
            {
                self.videoDevice = device;
                newVideoInput = [[AVCaptureDeviceInput alloc]initWithDevice:device error:nil];
            }
        }
    }
    else
    {
        for (AVCaptureDevice * device in devices) {
            if(device.position == AVCaptureDevicePositionBack)
            {
                self.videoDevice = device;
                newVideoInput = [[AVCaptureDeviceInput alloc]initWithDevice:device error:nil];
            }
        }
    }
    
    if (!newVideoInput) {
        [self.videoSession startRunning];
        return result;
    }
    if (newVideoInput.device.position == AVCaptureDevicePositionBack) {
        _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
    }
    else{
        _videoConnection.videoOrientation = AVCaptureVideoOrientationPortrait;
    }
    [self.videoSession beginConfiguration];
    [self.videoSession removeInput:self.videoInput];
    if ([self.videoSession canAddInput:newVideoInput])
    {
        [self.videoSession addInput:newVideoInput];
        result = YES;
    }
    self.videoInput = newVideoInput;
    self.videoConnection = [self.videoOutput connectionWithMediaType:AVMediaTypeVideo];
    if ( YES == [self.videoDevice lockForConfiguration:NULL] )
    {
        [self.videoDevice setActiveVideoMinFrameDuration:CMTimeMake(1,cameraSetupLastFPS)];
        [self.videoDevice setActiveVideoMaxFrameDuration:CMTimeMake(1,cameraSetupLastFPS)];
        [self.videoDevice unlockForConfiguration];
    }
    
    [self.videoSession commitConfiguration];
    [self.videoSession startRunning];
    return result;
}

- (void)flashswitch:(int)mode
{
    AVCaptureFlashMode localflashmode;
    AVCaptureTorchMode localtouchmode;
    if (mode == 0)
    {
        localflashmode = AVCaptureFlashModeAuto;
        localtouchmode = AVCaptureTorchModeAuto;
    }
    else if (mode == 1)
    {
        localflashmode = AVCaptureFlashModeOn;
        localtouchmode = AVCaptureTorchModeOn;

    }
    else if (mode == 2)
    {
        localflashmode = AVCaptureFlashModeOff;
        localtouchmode = AVCaptureTorchModeOff;

    }
    

        [self.videoSession beginConfiguration];
        [self.videoDevice lockForConfiguration:nil];
        [self.videoDevice setTorchMode:localtouchmode];
        [self.videoDevice setFlashMode:localflashmode];
        [self.videoDevice unlockForConfiguration];
        [self.videoSession commitConfiguration];

}

- (void)orientationDidChange:(NSNotification*)notification {
    [self setRelativeVideoOrientation];
//    UIView * view = (UIView*)notification.object;
//    self.videoPrelayer = [AVCaptureVideoPreviewLayer    layerWithSession:self.videoSession];
//    [self.videoPrelayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
//    self.videoPrelayer.frame = view.layer.bounds;
//    [view.layer addSublayer:self.videoPrelayer];
}

- (void)setRelativeVideoOrientation {
    switch ([[UIDevice currentDevice] orientation]) {
        case UIInterfaceOrientationPortrait:
#if defined(__IPHONE_8_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_8_0
        case UIInterfaceOrientationUnknown:
#endif
            _videoConnection.videoOrientation = AVCaptureVideoOrientationPortrait;
            break;
        case UIInterfaceOrientationPortraitUpsideDown:
        {
            _videoConnection.videoOrientation = AVCaptureVideoOrientationPortraitUpsideDown;
        }
            break;
        case UIInterfaceOrientationLandscapeLeft:
        {
            _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeLeft;
        }
            break;
        case UIInterfaceOrientationLandscapeRight:
        {
            _videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
        }
            break;
        default:
            break;
    }
    CALayer * supLayer = self.videoPrelayer.superlayer;
    [self.videoPrelayer removeFromSuperlayer];
    [supLayer addSublayer:self.videoPrelayer];
}


//开始捕获
- (void)startCapture
{
    NSDateFormatter* formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd-HH-mm-ss"];
    NSString* dateTimePrefix = [formatter stringFromDate:[NSDate date]];
    
    int fileNamePostfix = 0;
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *filePath = nil;
    do
        filePath =[NSString stringWithFormat:@"/%@/%@-%i.mp4", documentsDirectory, dateTimePrefix, fileNamePostfix++];
    while ([[NSFileManager defaultManager] fileExistsAtPath:filePath]);
    
    NSURL *fileURL = [NSURL URLWithString:[@"file://" stringByAppendingString:filePath]];
    [self.videoOutput startRecordingToOutputFileURL:fileURL recordingDelegate:self];
    [self.videoSession startRunning];
}

//停止捕获
- (void)stopCapture
{
    [self.videoSession stopRunning];
}

//截图
- (void)captureImage:(NSString*)path quality:(float)quality
{
    for (AVCaptureConnection *localConnection in _imageOutput.connections)
    {
        for (AVCaptureInputPort *port in [localConnection inputPorts])
        {
            if ([[port mediaType] isEqual:AVMediaTypeVideo] )
            {
                [_imageOutput captureStillImageAsynchronouslyFromConnection:localConnection completionHandler:^(CMSampleBufferRef imageDataSampleBuffer, NSError *error) {
                    if (imageDataSampleBuffer == nil) {
                        [[NSNotificationCenter defaultCenter] postNotificationName:@"CapturePitcureFailed!" object:nil];
                        return ;
                    }
                    NSData *imageData = [AVCaptureStillImageOutput jpegStillImageNSDataRepresentation:imageDataSampleBuffer];
                    UIImage * image = [UIImage imageWithData:imageData];
                    UIImageWriteToSavedPhotosAlbum(image, self, nil, NULL);
                        [[NSNotificationCenter defaultCenter] postNotificationName:@"CapturePitcureSuccess!" object:nil];
                }];
            }
        }
    }
}

#pragma -mark AVCaptureVideoDataOutputSampleBufferDelegate
//代理中回调出YUV数据
- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection
{
    //确保回调的是video数据
    if(connection == self.videoConnection)
    {
        //回调出YUV
        if ([_delegate respondsToSelector:@selector(outPutYUVdataSource:)]) {
            [_delegate outPutYUVdataSource:sampleBuffer];
        }
    }
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
