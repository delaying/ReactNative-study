import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const DetailScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail Screen" />
        <Header.Icon iconName="close" onPress={() => {}} />
      </Header>
    </View>
  );
};
