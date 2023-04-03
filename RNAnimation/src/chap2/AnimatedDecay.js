import React, {useEffect, useRef} from 'react';
import {Animated, Button, Easing, View} from 'react-native';

//x -100 decay
export default () => {
  const translateAnim = useRef(new Animated.Value(-100)).current;

  const onButtonPress = () => {
    translateAnim.setValue(-100);
    Animated.decay(translateAnim, {
      velocity: 1, //초기속도
      deceleration: 0.997, //감속률
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title="멈춰라" onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 60, transform: [{translateX: translateAnim}]}}>
        🐥
      </Animated.Text>
    </>
  );
};
