import React, {useRef} from 'react';
import {Animated, Button, Easing, SafeAreaView, Text, View} from 'react-native';

export default () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  let clickCount = 0;

  // 클릭마다 20%씩 수동으로 바를 채우는 함수
  const onRunPress = () => {
    if (clickCount < 5) {
      clickCount = clickCount + 1;
      Animated.spring(interpolateAnim, {
        toValue: 20 * clickCount,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };
  //   자동으로 바를 채우는 함수
  const onAutoRunPress = () => {
    Animated.sequence([
      Animated.spring(interpolateAnim, {
        toValue: 20,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.spring(interpolateAnim, {
        toValue: 60,
        friction: 7,
        tension: 40,
        delay: 150,
        useNativeDriver: false,
      }),
      Animated.spring(interpolateAnim, {
        toValue: 100,
        friction: 7,
        tension: 40,
        delay: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };
  //   맨 처음으로 되돌아가는 함수
  const onResetPress = () => {
    clickCount = 0;
    Animated.timing(interpolateAnim, {
      toValue: 0,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };
  return (
    <SafeAreaView style={{flex: 1, marginTop: 200}}>
      <Button title="run" onPress={onRunPress} />
      <Button title="auto run" onPress={onAutoRunPress} />
      <Button title="reset" onPress={onResetPress} />
      <View
        style={{position: 'relative', margin: 30, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: '#222',
            height: 10,
            borderRadius: 10,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: 'blue',
            height: 16,
            position: 'absolute',
            width: interpolateAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            borderRadius: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};
