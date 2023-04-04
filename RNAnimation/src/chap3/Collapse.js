import React, {useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {collapseData} from '../utils/data';

export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {collapseData.map((value, index) => {
        const interpolateAnim = useRef(new Animated.Value(0)).current;
        let isOpened = false;

        const onPress = () => {
          Animated.timing(interpolateAnim, {
            toValue: isOpened ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            isOpened = !isOpened;
          });
        };
        return (
          <View key={index}>
            {/* 질문영역 */}
            <TouchableWithoutFeedback onPress={onPress}>
              <View
                style={{
                  backgroundColor: '#6c79e0',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 16,
                    flexShrink: 1,
                  }}>
                  {value.q}
                </Text>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: interpolateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '180deg'],
                        }),
                      },
                    ],
                  }}>
                  <Icon name="expand-more" size={28} color="yellow" />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>

            {/* 답변영역 */}
            <Animated.View
              style={{
                height: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
                paddingHorizontal: 40,
                justifyContent: 'center',
                borderBottomColor: '#6c79e0',
                borderBottomWidth: 0.5,
              }}>
              <Text style={{fontSize: 14}}>{value.a}</Text>
            </Animated.View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};
