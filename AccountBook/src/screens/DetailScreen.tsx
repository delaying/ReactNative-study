import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigations/RootNavigation';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail Screen" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
    </View>
  );
};
