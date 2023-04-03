import React, {useRef} from 'react';
import {Animated, Button, Easing, SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default () => {
  const translateYAnim = useRef(new Animated.Value(100)).current;

  const onButtonPress = () => {
    Animated.sequence([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.circle),
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(translateYAnim, {
        toValue: 100,
        duration: 500,
        easing: Easing.in(Easing.circle),
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="문제발생" onPress={onButtonPress} />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          transform: [
            {
              translateY: translateYAnim,
            },
          ],
        }}>
        <View
          style={{
            backgroundColor: '#222',
            flexDirection: 'row',
            paddingVertical: 14,
            paddingHorizontal: 20,
            margin: 14,
            borderRadius: 4,
            alignItems: 'center',
          }}>
          <Icon name="bulb" color="white" size={24} />
          <Text style={{color: 'white', fontSize: 15}}> Snackbar Hello</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
