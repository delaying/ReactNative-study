import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Bottom from '../YoutubeMusic/components/Bottom';
import CategoryHeader from '../YoutubeMusic/components/CategoryHeader';
import HeaderBackground from '../YoutubeMusic/components/HeaderBackground';
import LogoHeader from '../YoutubeMusic/components/LogoHeader';

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
        <View style={{height: 10000}}>
          <Text>Music list</Text>
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};
