import React, {useEffect, useRef} from 'react';
import {Animated, Button, Easing, View} from 'react-native';

export default () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const onPressButton = () => {
    Animated.loop(
      Animated.timing(opacityAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      {iterations: 3},
    ).start();
  };
  return (
    <>
      <Button title="button" onPress={onPressButton} />
      <Animated.Text
        style={{
          fontSize: 60,
          opacity: opacityAnim,
        }}>
        🐥
      </Animated.Text>
    </>
  );
};
