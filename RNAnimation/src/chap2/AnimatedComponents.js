import React, {useRef} from 'react';
import {Animated, Button} from 'react-native';

export default () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const onButtonPress = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title="사라져라!" onPress={onButtonPress} />
      <Animated.Text style={{fontSize: 100, opacity: opacityAnim}}>
        Hidd
      </Animated.Text>
    </>
  );
};
