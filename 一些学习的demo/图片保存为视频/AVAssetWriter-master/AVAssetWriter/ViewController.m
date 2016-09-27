//
//  ViewController.m
//  AVAssetWriter
//
//  Created by Zakk Hoyt on 3/10/14.
//  Copyright (c) 2014 Zakk Hoyt. All rights reserved.
//

#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>
#import <AssetsLibrary/AssetsLibrary.h>
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}


-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    
    static BOOL run = NO;
    if(run == NO){
        run = YES;
        

        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString *myPathDocs =  [documentsDirectory stringByAppendingPathComponent:
                                 [NSString stringWithFormat:@"NES-%d.mov",arc4random() % 1000]];


        
        NSArray *images = @[
                            [UIImage imageNamed:@"IMG_1801.jpg"],
                            [UIImage imageNamed:@"IMG_1802.jpg"],
                            [UIImage imageNamed:@"IMG_1803.jpg"],
                            [UIImage imageNamed:@"IMG_1804.jpg"],
                            [UIImage imageNamed:@"IMG_1805.jpg"],
                            [UIImage imageNamed:@"IMG_1806.jpg"],
                            [UIImage imageNamed:@"IMG_1807.jpg"],
                            [UIImage imageNamed:@"IMG_1808.jpg"],
                            [UIImage imageNamed:@"IMG_1809.jpg"],
                            [UIImage imageNamed:@"IMG_1810.jpg"],
                            [UIImage imageNamed:@"IMG_1811.jpg"],
                            [UIImage imageNamed:@"IMG_1812.jpg"],
                            [UIImage imageNamed:@"IMG_1813.jpg"],
                            [UIImage imageNamed:@"IMG_1814.jpg"],
                            [UIImage imageNamed:@"IMG_1815.jpg"],
                            [UIImage imageNamed:@"IMG_1816.jpg"],
                            [UIImage imageNamed:@"IMG_1817.jpg"],
                            [UIImage imageNamed:@"IMG_1818.jpg"],
                            [UIImage imageNamed:@"IMG_1819.jpg"],
                            [UIImage imageNamed:@"IMG_1820.jpg"],
                            ];
                            [self writeImagesAsMovie:images toPath:myPathDocs];
    }
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void) writeImagesAsMovie:(NSArray *)array toPath:(NSString*)path {
    
//    NSString *documents = [NSSearchPathForDirectoriesInDomains (NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex: 0];
//    documents = [documents stringByAppendingPathComponent:currentWorkspace];
//    
//    //NSLog(path);
//    NSString *filename = [documents stringByAppendingPathComponent:[array objectAtIndex:0]];
//    UIImage *first = [UIImage imageWithContentsOfFile:[array objectAtIndex:0]];
    UIImage *first = array[0];
    
    
    CGSize frameSize = first.size;
    
    NSError *error = nil;
    AVAssetWriter *videoWriter = [[AVAssetWriter alloc] initWithURL:
                                  [NSURL fileURLWithPath:path] fileType:AVFileTypeQuickTimeMovie
                                                              error:&error];
    
    if(error) {
        NSLog(@"error creating AssetWriter: %@",[error description]);
    }
    NSDictionary *videoSettings = [NSDictionary dictionaryWithObjectsAndKeys:
                                   AVVideoCodecH264, AVVideoCodecKey,
                                   [NSNumber numberWithInt:frameSize.width], AVVideoWidthKey,
                                   [NSNumber numberWithInt:frameSize.height], AVVideoHeightKey,
                                   nil];
    
    
    
    AVAssetWriterInput* writerInput = [AVAssetWriterInput
                                        assetWriterInputWithMediaType:AVMediaTypeVideo
                                        outputSettings:videoSettings];
    
    NSMutableDictionary *attributes = [[NSMutableDictionary alloc] init];
    [attributes setObject:[NSNumber numberWithUnsignedInt:kCVPixelFormatType_32RGBA] forKey:(NSString*)kCVPixelBufferPixelFormatTypeKey];
    [attributes setObject:[NSNumber numberWithUnsignedInt:frameSize.width] forKey:(NSString*)kCVPixelBufferWidthKey];
    [attributes setObject:[NSNumber numberWithUnsignedInt:frameSize.height] forKey:(NSString*)kCVPixelBufferHeightKey];
    
    AVAssetWriterInputPixelBufferAdaptor *adaptor = [AVAssetWriterInputPixelBufferAdaptor
                                                     assetWriterInputPixelBufferAdaptorWithAssetWriterInput:writerInput
                                                     sourcePixelBufferAttributes:attributes];
    
    [videoWriter addInput:writerInput];
    
    // fixes all errors
    writerInput.expectsMediaDataInRealTime = YES;
    
    //Start a session:
    BOOL start = [videoWriter startWriting];
    NSLog(@"Session started? %d", start);
    [videoWriter startSessionAtSourceTime:kCMTimeZero];

    CVPixelBufferRef buffer = NULL;
    buffer = [self pixelBufferFromCGImage:[first CGImage]];
    BOOL result = [adaptor appendPixelBuffer:buffer withPresentationTime:kCMTimeZero];
    
    if (result == NO)
        NSLog(@"failed to append buffer");
    
    if(buffer)
        CVBufferRelease(buffer);
    
    [NSThread sleepForTimeInterval:0.005];
    
    
//    int reverseSort = NO;
//    NSArray *newArray = [array sortedArrayUsingFunction:sort context:&reverseSort];
    
//    delta = 1.0/[newArray count];
    
//    int fps = (int)fpsSlider.value;
    int fps = 10;
    //FPS should do sth in here!
    
    int i = 0;
    for (UIImage *imgFrame in array)
    {
        if (adaptor.assetWriterInput.readyForMoreMediaData)
        {
            
            i++;
            NSLog(@"inside for loop %d ",i);
            CMTime frameTime = CMTimeMake(1, fps);
            CMTime lastTime=CMTimeMake(i, fps);
            CMTime presentTime=CMTimeAdd(lastTime, frameTime);
            
//            NSString *filePath = [documents stringByAppendingPathComponent:filename];
//            NSString *filePath = filename;
            
//            UIImage *imgFrame = [UIImage imageWithContentsOfFile:filePath] ;
//            UIImage *imgFrame = [array]
            buffer = [self pixelBufferFromCGImage:[imgFrame CGImage]];
            BOOL result = [adaptor appendPixelBuffer:buffer withPresentationTime:presentTime];
            
            if (result == NO) //failes on 3GS, but works on iphone 4
            {
                NSLog(@"failed to append buffer");
                NSLog(@"The error is %@", [videoWriter error]);
            }
            if(buffer)
                CVBufferRelease(buffer);
            [NSThread sleepForTimeInterval:0.05];
        }
        else
        {
            NSLog(@"error");
            i--;
        }
        [NSThread sleepForTimeInterval:0.02];
    }
    
    //Finish the session:
    [writerInput markAsFinished];
    [videoWriter finishWritingWithCompletionHandler:^{


    }];
    
    CVPixelBufferPoolRelease(adaptor.pixelBufferPool);
    
    
    
    
    NSURL *outputURL = [NSURL URLWithString:path];
    ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
    if ([library videoAtPathIsCompatibleWithSavedPhotosAlbum:outputURL]) {
        [library writeVideoAtPathToSavedPhotosAlbum:outputURL completionBlock:^(NSURL *assetURL, NSError *error){
            dispatch_async(dispatch_get_main_queue(), ^{
                if (error) {
                    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error" message:@"Video Saving Failed"
                                                                   delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
                    [alert show];
                } else {
                    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Video Saved" message:@"Saved To Photo Album"
                                                                   delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];
                    [alert show];
                }
            });
        }];
    }
    
}


- (CVPixelBufferRef) pixelBufferFromCGImage: (CGImageRef) image
{
    NSDictionary *options = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithBool:YES], kCVPixelBufferCGImageCompatibilityKey,
                             [NSNumber numberWithBool:YES], kCVPixelBufferCGBitmapContextCompatibilityKey,
                             nil];
    CVPixelBufferRef pxbuffer = NULL;
    
    CVPixelBufferCreate(kCFAllocatorDefault, CGImageGetWidth(image),
                        CGImageGetHeight(image), kCVPixelFormatType_32ARGB, (__bridge CFDictionaryRef) options,
                        &pxbuffer);
    
    CVPixelBufferLockBaseAddress(pxbuffer, 0);
    void *pxdata = CVPixelBufferGetBaseAddress(pxbuffer);
    
    CGColorSpaceRef rgbColorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(pxdata, CGImageGetWidth(image),
                                                 CGImageGetHeight(image), 8, 4*CGImageGetWidth(image), rgbColorSpace,
                                                 (CGBitmapInfo)kCGImageAlphaNoneSkipFirst);
    
    CGContextConcatCTM(context, CGAffineTransformMakeRotation(0));
    
    //CGAffineTransform flipVertical = CGAffineTransformMake(
                                                           //1, 0, 0, -1, 0, CGImageGetHeight(image)
                                                           //);
    CGAffineTransform flipVertical = CGAffineTransformMakeRotation(0);
    CGContextConcatCTM(context, flipVertical);
    
    //CGAffineTransform flipHorizontal = CGAffineTransformMake(
                                                             //-1.0, 0.0, 0.0, 1.0, CGImageGetWidth(image), 0.0
                                                             //);
    CGAffineTransform flipHorizontal = CGAffineTransformMakeRotation(0);
    
    CGContextConcatCTM(context, flipHorizontal);
    
    
    CGContextDrawImage(context, CGRectMake(0, 0, CGImageGetWidth(image),
                                           CGImageGetHeight(image)), image);
    CGColorSpaceRelease(rgbColorSpace);
    CGContextRelease(context);
    
    CVPixelBufferUnlockBaseAddress(pxbuffer, 0);
    
    return pxbuffer;
}

@end
