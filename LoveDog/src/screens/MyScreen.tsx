import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const MyScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MyScreen" />
      </Header>
    </View>
  );
};
