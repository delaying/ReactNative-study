import React, {useEffect, useRef} from 'react';
import {Animated, Button, Easing} from 'react-native';

// Easing ease / back / bounce / elastic / circle
export default () => {
  const translateAnim = useRef(new Animated.Value(-100)).current;

  const onButtonPress = () => {
    translateAnim.setValue(-100);
    Animated.timing(translateAnim, {
      toValue: 100,
      duration: 1000,
      delay: 0,
      easing: Easing.in(Easing.elastic(2)),
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title="움직이기" onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateX: translateAnim}]}}>
        🐥
      </Animated.Text>
    </>
  );
};
