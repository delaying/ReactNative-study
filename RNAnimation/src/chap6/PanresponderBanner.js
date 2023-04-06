import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');
export default () => {
  const [focus, setFocus] = useState(0);
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const pandingRef = useRef(true);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const toRight = gestureState.dx < -80;
      const toLeft = gestureState.dx > 80;
      //   console.log(gestureState.dx);
      if (toRight && pandingRef.current & (focus < 3)) {
        pandingRef.current = false;
        setFocus(focus + 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus + 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            pandingRef.current = true;
          }
        });
      }
      if (toLeft && pandingRef.current && focus > 0) {
        pandingRef.current = false;
        setFocus(focus - 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus - 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            pandingRef.current = true;
          }
        });
      }
    },
  });

  const onButtonNavigation = index => {
    setFocus(index);
    Animated.timing(bannerAnim, {
      toValue: -index * width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* content box */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          left: 0,
          flexDirection: 'row',
          transform: [
            {
              translateX: bannerAnim,
            },
          ],
        }}>
        {[...Array(4)].map((value, index) => (
          <View
            key={index}
            style={{
              width,
              height: width,
              backgroundColor: '#ffa100',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 50, color: '#fff'}}>{index}</Text>
          </View>
        ))}
      </Animated.View>
      {/* Buttons */}
      <View style={{height: width, justifyContent: 'flex-end', marginTop: 60}}>
        <View style={{flexDirection: 'row'}}>
          {[...Array(4)].map((value, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onButtonNavigation(index)}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 10,
                  backgroundColor: focus === index ? '#ffa100' : '#ffa10050',
                  margin: 5,
                }}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </View>
  );
};
