import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Bottom from './components/bottom/Bottom';
import CategoryHeader from './components/header/CategoryHeader';
import HeaderBackground from '../YoutubeMusic/components/header/HeaderBackground';
import LogoHeader from '../YoutubeMusic/components/header/LogoHeader';
import MusicListSmall from './components/musicList/MusicListSmall';
import MusicListMedium from './components/musicList/MusicListMedium';
import MusicListLarge from './components/musicList/MusicListLarge';

export default () => {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <View style={{flex: 1, backgroundColor: '#111'}}>
      <HeaderBackground selectedCategory={selectedCategory} />
      <LogoHeader />
      <CategoryHeader
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ScrollView style={{borderWidth: 1}}>
        <View style={{height: 1000}}>
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};
