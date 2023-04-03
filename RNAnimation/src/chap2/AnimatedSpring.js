import React, {useEffect, useRef} from 'react';
import {Animated, Button, Easing, View} from 'react-native';

// y축 -100 -> 100 이동하는 spring 애니메이션
export default () => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;

  const onButtonPress = () => {
    translateYAnim.setValue(-100);
    Animated.spring(translateYAnim, {
      toValue: 100,
      //   bounciness: 8,
      //   speed: 12,

      //   friction: 7,
      //   tension: 40,

      //   stiffness: 100,
      //   damping: 10,
      //   mass: 1,

      velocity: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="움직이기" onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 60, transform: [{translateY: translateYAnim}]}}>
        🐥
      </Animated.Text>
    </View>
  );
};
