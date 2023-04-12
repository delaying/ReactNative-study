import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Bottom from './components/bottom/Bottom';
import CategoryHeader from './components/header/CategoryHeader';
import HeaderBackground from '../YoutubeMusic/components/header/HeaderBackground';
import LogoHeader from '../YoutubeMusic/components/header/LogoHeader';
import MusicListSmall from './components/musicList/MusicListSmall';
import MusicListMedium from './components/musicList/MusicListMedium';
import MusicListLarge from './components/musicList/MusicListLarge';
import useYoutubeMusic from './useYoutubeMusic';

export default () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const {
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    headerAnim,
    headerBgAnim,
  } = useYoutubeMusic();

  return (
    <View style={{flex: 1, backgroundColor: '#111'}}>
      <HeaderBackground
        selectedCategory={selectedCategory}
        headerBgAnim={headerBgAnim}
      />
      <LogoHeader headerAnim={headerAnim} />
      <CategoryHeader
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        headerAnim={headerAnim}
      />
      <ScrollView
        scrollEventThrottle={1}
        onScrollBeginDrag={onScrollBeginDrag}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEndDrag}>
        <View style={{marginBottom: 100}}>
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};
