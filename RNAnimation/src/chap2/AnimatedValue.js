import React, {useEffect, useRef} from 'react';
import {Animated, Button, Text} from 'react-native';

//왼(-100) -> 오(100) 으로 x 값이 변화하는 애니메이션
export default () => {
  const translateAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    return () => translateAnim.removeAllListeners();
  });

  const onButtonPress = () => {
    translateAnim.setValue(-100);
    translateAnim.addListener(({value}) => console.log(value));

    setTimeout(() => {
      translateAnim.stopAnimation();
    }, 500);

    Animated.timing(translateAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Button title="움직이기" onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateX: translateAnim}]}}>
        ㅎㅇ
      </Animated.Text>
    </>
  );
};
