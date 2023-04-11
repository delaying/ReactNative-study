import React from 'react';
import {Text, View, Image, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {faker} from '@faker-js/faker';

const {width, height} = Dimensions.get('window');
export default () => {
  return (
    <View>
      <Title />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}>
        {[...Array(10)].map((value, index) => {
          return (
            <View style={{marginRight: 20}} key={index}>
              <MusicListLargeItem />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

function MusicListLargeItem() {
  return (
    <View>
      <Image
        source={{uri: 'https://picsum.photos/200'}}
        style={{width: width / 2.5, height: width / 2.5, borderRadius: 4}}
      />

      <Text
        style={{
          color: 'white',
          marginTop: 5,
          width: width / 2.5,
          fontSize: 13,
          height: 60,
        }}
        numberOfLines={2}>
        {faker.music.songName()}
      </Text>
    </View>
  );
}

function Title() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#999',
            borderRadius: 100,
            marginRight: 10,
            padding: 3,
          }}>
          <Icon name="rewind" size={24} color="#999" />
        </View>
        <Text style={{fontSize: 28, color: 'white', fontWeight: 'bold'}}>
          다시듣기
        </Text>
      </View>

      <View
        style={{
          borderRadius: 100,
          borderWidth: 1,
          borderColor: '#ddd',
          paddingHorizontal: 10,
          paddingVertical: 4,
        }}>
        <Text style={{fontSize: 12, color: 'white'}}>더보기</Text>
      </View>
    </View>
  );
}
