import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const HistoryListScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'HistoryList'>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="HistoryListScreen" />
        <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
      </Header>
    </View>
  );
};
