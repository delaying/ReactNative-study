//
//  CalculatorModuleBridge.m
//  RNCalculator
//
//  Created by delay on 2023/03/02.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalculatorModule, NSObject)

RCT_EXTERN_METHOD(excuteCalc: (NSString *) action
                  numberA: (int) numberA
                  numberB: (int) numberB
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejector: (RCTPromiseRejectBlock) reject
                  )

@end
