import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({headerAnim}) => {
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          marginTop: headerAnim.interpolate({
            inputRange: [-40, 0, 100],
            outputRange: [0, 0, -45],
          }),
          opacity: headerAnim.interpolate({
            inputRange: [-40, 0, 20],
            outputRange: [1, 1, 0],
          }),
        }}>
        <View
          style={{
            marginLeft: 14,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{width: 90, height: 30}}
          />
          <View style={{flexDirection: 'row'}}>
            <IconItem name="cast" />
            <IconItem name="search" />
            <TouchableOpacity>
              <View
                style={{
                  height: 45,
                  width: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: '#667fb3',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="perm-identity" size={24} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

function IconItem({name}) {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 45,
          width: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={name} size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
}
