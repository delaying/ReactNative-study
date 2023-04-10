import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BOTTOM_HEIGHT} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default () => {
  return (
    <View style={{backgroundColor: '#222', paddingBottom: getBottomSpace()}}>
      <View style={{height: BOTTOM_HEIGHT}}>
        <View style={{flexDirection: 'row'}}>
          <BottomItem name={'home-filled'} title={'홈'} />
          <BottomItem name={'explore'} title={'둘러보기'} />
          <BottomItem name={'library-music'} title={'보관함'} />
        </View>
      </View>
    </View>
  );
};

function BottomItem({name, title}) {
  return (
    <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
      <View style={{marginVertical: 4}}>
        <Icon name={name} color="white" size={24} />
      </View>
      <Text style={{color: 'white', fontSize: 12}}>{title}</Text>
    </TouchableOpacity>
  );
}
