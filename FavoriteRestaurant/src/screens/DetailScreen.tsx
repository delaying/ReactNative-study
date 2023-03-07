import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const DetailScreen: React.FC = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};
