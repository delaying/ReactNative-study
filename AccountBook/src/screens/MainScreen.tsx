import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemVies';
import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {useRootNavigation} from '../navigations/RootNavigation';

const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const [list] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'test_01',
      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 200000,
      comment: 'TEST_2',
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },

    {
      id: 2,
      type: '수입',
      price: 260000,
      comment: 'TEST_3',
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
  ]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main Screen" />
      </Header>

      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={clicked => {
                navigation.push('Detail', {item: clicked});
              }}
            />
          );
        }}
      />
    </View>
  );
};
