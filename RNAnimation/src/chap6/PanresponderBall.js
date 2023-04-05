import React, {useRef} from 'react';
import {Animated, PanResponder, Text, View} from 'react-native';

export default () => {
  const panAnim = useRef(new Animated.ValueXY(0)).current;
  const panResponder = PanResponder.create({
    // Animated.event를 사용하면 마우스 따라오게 설정가능
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: panAnim.x, dy: panAnim.y}], {
      useNativeDriver: false,
    }),
    onPanResponderEnd: (evt, gestureState) => {
      Animated.decay(panAnim, {
        velocity: {x: gestureState.vx / 4, y: gestureState.vy / 4},
        deceleration: 0.997,
        useNativeDriver: true,
      }).start();
    },
    // end가 끝난 후 바로 작동하는 애니메이션
    onPanResponderRelease: (evt, gestureState) => {
      setTimeout(() => {
        panAnim.setValue({x: 0, y: 50});
        Animated.spring(panAnim, {
          toValue: {x: 0, y: 0},
          friction: 7,
          tension: 30,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 1000);
    },
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          bottom: 20,
          transform: [{translateX: panAnim.x}, {translateY: panAnim.y}],
        }}>
        <Text style={{fontSize: 100}}>🏀</Text>
      </Animated.View>
    </View>
  );
};
