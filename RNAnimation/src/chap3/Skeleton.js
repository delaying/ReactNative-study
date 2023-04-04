import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(interpolateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ).start();
  }, [interpolateAnim]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}>
      {[...Array(8)].map((value, index) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 8,
              position: 'relative',
              overflow: 'hidden',
            }}
            key={index}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#dfdfdf',
                borderRadius: 4,
              }}
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <View
                style={{
                  width: '80%',
                  height: 14,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: '100%',
                  height: 14,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 80,
                  height: 8,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
            </View>
            <Animated.View
              style={{
                position: 'absolute',
                top: -30,
                left: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-20%', '130%'],
                }),
                transform: [{rotate: '20deg'}],
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ffffff00', '#ffffff90', '#ffffff00']}>
                <View style={{width: 40, height: 100}} />
              </LinearGradient>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};
