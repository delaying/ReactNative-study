import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const AddScreen: React.FC = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <Header.Title title="Add" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};
