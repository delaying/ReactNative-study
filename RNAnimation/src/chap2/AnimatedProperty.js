import React, {useRef} from 'react';
import {Animated, Button, View} from 'react-native';

//height 100 > 200 timing
export default () => {
  const heightAnim = useRef(new Animated.Value(100)).current;

  const onButtonPress = () => {
    Animated.timing(heightAnim, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Button title="커져라" onPress={onButtonPress} />
      <Animated.View
        style={{
          width: 100,
          height: heightAnim,
          backgroundColor: heightAnim.interpolate({
            inputRange: [100, 200],
            outputRange: ['#25f', '#a2d'],
          }),
          transform: [
            {
              rotate: heightAnim.interpolate({
                inputRange: [100, 200],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </>
  );
};
