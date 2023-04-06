import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const BOX = 50;
const CIRCLE = 20;
const FONT = [
  {
    title: {fontSize: 20, lineHeight: 32},
    body: {fontSize: 12},
  },
  {
    title: {fontSize: 24, lineHeight: 38},
    body: {fontSize: 14},
  },
  {
    title: {fontSize: 30, lineHeight: 40},
    body: {fontSize: 15},
  },
  {
    title: {fontSize: 40, lineHeight: 50},
    body: {fontSize: 19},
  },
];
export default () => {
  const [step, setStep] = useState(0);
  const circleAnim = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: (evt, gestureState) => {
      circleAnim.setValue(step * BOX);
    },
    onPanResponderMove: (evt, gestureState) => {
      circleAnim.setValue(gestureState.dx + step * BOX);
    },
    onPanResponderEnd: (evt, gestureState) => {
      const fontstep = step + Math.round(gestureState.dx / 50);
      const toValue = fontstep * BOX;
      setStep(fontstep);

      Animated.spring(circleAnim, {
        toValue,
        friction: 7,
        tension: 50,
        duration: 100,
        useNativeDriver: true,
      }).start();
    },
  });

  const onPress = index => {
    setStep(index);
    Animated.spring(circleAnim, {
      toValue: index * BOX,
      friction: 7,
      tension: 50,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* text step view */}
      <View style={{width: 200, height: 150, justifyContent: 'flex-end'}}>
        <View>
          <Text style={FONT[step].title}>Font Setp 1</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>
        {/* slider */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* 가로선 */}
          <View
            style={{
              position: 'absolute',
              width: BOX * 3,
              top: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}
          />
          {/* 세로 회색 동그라미 */}
          <View style={{flexDirection: 'row'}}>
            {[...Array(4)].map((value, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onPress(index)}>
                <View
                  style={{
                    width: BOX,
                    height: BOX,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ddd',
                      width: 10,
                      height: 10,
                      borderRadius: 100,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>

          <Animated.View
            {...panResponder.panHandlers}
            style={{
              width: CIRCLE,
              height: CIRCLE,
              backgroundColor: '#333',
              position: 'absolute',
              left: BOX / 2 - CIRCLE / 2,
              borderRadius: 100,
              transform: [{translateX: circleAnim}],
            }}
          />
        </View>
      </View>
    </View>
  );
};
