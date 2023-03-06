import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const TempComponent = () => {
  const value = useSharedValue(0);

  const onPressButton = useCallback(() => {
    value.value = withTiming(Math.random() * 100);
  }, [value]);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: value.value}],
    };
  });

  return (
    <View style={{flex: 1, borderRadius: 1}}>
      <Button title="박스 움직이기" onPress={onPressButton} />
      <Animated.View
        style={[
          {
            width: 50,
            height: 50,
            borderRadius: 6,
            backgroundColor: 'pink',
          },
          animStyle,
        ]}
      />
    </View>
  );
};
