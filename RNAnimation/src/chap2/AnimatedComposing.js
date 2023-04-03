import React, {useEffect, useRef} from 'react';
import {Animated, Button, Easing, View} from 'react-native';

//sequence, delay, paraller, stagger

//1) y -200~0 timing
//2) x 0~100 timing
export default () => {
  const translateYAnim = useRef(new Animated.Value(-200)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const onButtonPress = () => {
    Animated.stagger(1000, [
      Animated.timing(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="움직이기" onPress={onButtonPress} />
      <Animated.Text
        style={{
          fontSize: 60,
          transform: [
            {translateY: translateYAnim},
            {translateX: translateXAnim},
          ],
        }}>
        🐥
      </Animated.Text>
    </View>
  );
};
