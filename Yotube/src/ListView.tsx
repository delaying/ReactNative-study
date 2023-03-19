import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {ListItemView} from './ListItemView';
import {TypeListItem} from './TypeListItem';

export const ListView: React.FC = () => {
  const [list] = useState<TypeListItem[]>([
    {
      title: 'title_01',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAd: '2023-1-12',
      viewCount: 111,
      channelTitle: 'channel_01',
    },
    {
      title: 'title_02',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAd: '2023-1-22',
      viewCount: 311,
      channelTitle: 'channel_02',
    },
    {
      title: 'title_03',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAd: '2023-1-01',
      viewCount: 1011,
      channelTitle: 'channel_03',
    },
  ]);

  return (
    <FlatList
      data={list}
      renderItem={({item}) => <ListItemView item={item} />}
    />
  );
};
