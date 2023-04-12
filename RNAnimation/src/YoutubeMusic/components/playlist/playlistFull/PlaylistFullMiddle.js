import {faker} from '@faker-js/faker';
import React from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
export default ({playlistAnim}) => {
  return (
    <Animated.View
      style={{
        height: playlistAnim.interpolate({
          inputRange: [0, height / 2, height],
          outputRange: [0, 0, 250],
        }),
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
        width: playlistAnim.interpolate({
          inputRange: [0, height / 2.5, height],
          outputRange: ['0%', '0%', '100%'],
        }),
      }}>
      <MiddleTitle />
      <MiddleTimeline />
      <MiddleButtons />
    </Animated.View>
  );
};

function MiddleButtons() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: width * 0.1,
        marginTop: 30,
      }}>
      <Icon name="shuffle" size={24} color="white" />
      <Icon name="skip-previous" size={24} color="white" />
      <View
        style={{backgroundColor: '#ffffff20', padding: 10, borderRadius: 100}}>
        <Icon name="play" size={40} color="white" />
      </View>
      <Icon name="skip-next" size={24} color="white" />
      <Icon name="repeat" size={24} color="white" />
    </View>
  );
}

function MiddleTimeline() {
  return (
    <View style={{marginRight: width * 0.1}}>
      <View style={{borderBottomWidth: 2, borderBottomColor: '#ffffff80'}} />
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: 'white',
          marginTop: -6,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 10, color: 'white'}}>0:03</Text>
        <Text style={{fontSize: 10, color: 'white'}}>3:57</Text>
      </View>
    </View>
  );
}

function MiddleTitle() {
  return (
    <View
      style={{
        marginRight: width * 0.1,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Icon name="thumb-down-outline" color="white" size={18} />
      <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 20}}>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {faker.music.songName()}
        </Text>
        <Text style={{color: 'white', fontSize: 16}}>
          {faker.music.genre()}
        </Text>
      </View>
      <Icon name="thumb-up-outline" color="white" size={18} />
    </View>
  );
}
