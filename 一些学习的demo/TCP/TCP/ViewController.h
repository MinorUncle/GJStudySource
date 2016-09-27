//
//  ViewController.h
//  TCP
//
//  Created by tongguan on 15/8/26.
//  Copyright (c) 2015年 tongguan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
@property (weak, nonatomic) IBOutlet UITextField *sendText;
- (IBAction)sendClick:(id)sender;
@property (weak, nonatomic) IBOutlet UITextView *DetailShowtext;


@end

