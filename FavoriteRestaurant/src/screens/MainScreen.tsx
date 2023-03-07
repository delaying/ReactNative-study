import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';

export const MainScreen: React.FC = () => {
  return (
    <View>
      <Header>
        <Header.Title title="MAIN" />
      </Header>
      <Icon name="close" size={24} color="blue" />
    </View>
  );
};
