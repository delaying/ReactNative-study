import React from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
export default ({playlistAnim}) => {
  return (
    <Animated.View
      style={{
        height: playlistAnim.interpolate({
          inputRange: [0, height / 2.5, height],
          outputRange: [0, 0, 100],
        }),
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
      }}>
      <Animated.View
        style={{
          width: playlistAnim.interpolate({
            inputRange: [0, height / 2.5, height],
            outputRange: [0, 0, width],
          }),
          marginLeft: -width * 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <IconItem name="chevron-down" />
          <IconItem />
        </View>
        <View
          style={{
            backgroundColor: '#111',
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 100,
          }}>
          <View
            style={{
              backgroundColor: '#333',
              height: 30,
              paddingHorizontal: 12,
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Text style={{color: '#ffffff90', fontSize: 12}}>노래</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#ffffff90', fontSize: 12}}>동영상</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconItem name="cast" />
          <IconItem name="dots-vertical" />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

function IconItem({name}) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name={name} size={24} color="white" />
    </View>
  );
}
