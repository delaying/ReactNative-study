import React from 'react';
import {Text, View, Animated, Dimensions, TouchableOpacity} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');
export default ({playlistAnim}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width,
        height: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 50 + getBottomSpace()],
        }),
        bottom: 0,
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
        backgroundColor: '#444',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>다음트랙</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>가사</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>관련 항목</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
