import React, {useRef} from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {faker} from '@faker-js/faker';

const {width, height} = Dimensions.get('window');
export default () => {
  const scrollStartRef = useRef();
  const pageRef = useRef(1);
  const scrollRef = useRef();
  return (
    <View>
      <Title />
      <ScrollView
        // 다음페이지로 넘어가기
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        scrollEventThrottle={1}
        onScrollBeginDrag={e => {
          const x = e.nativeEvent.contentOffset.x;
          scrollStartRef.current = x;
        }}
        onScrollEndDrag={e => {
          const x = e.nativeEvent.contentOffset.x;
          const dx = x - scrollStartRef.current;
          // console.log(dx);

          // 오른쪽 page로 붙는 애니메이션
          if (width / 4 < dx && pageRef.current !== 3) {
            scrollRef.current?.scrollTo({
              x: width * 0.92 * pageRef.current,
              animated: true,
            });
            pageRef.current = pageRef.current + 1;
          }
          if (width / 4 > dx && dx > 0) {
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 1),
              animated: true,
            });
          }
          // 왼쪽 page로 붙는 애니메이션
          if (-width / 4 > dx && pageRef.current !== 1) {
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 2),
              animated: true,
            });
            pageRef.current = pageRef.current - 1;
          }
          if (-width / 4 < dx && dx < 0) {
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 1),
              animated: true,
            });
          }
        }}>
        {[...Array(3)].map((value, index) => {
          return (
            <View style={{width: width * 0.92}}>
              {[...Array(4)].map((value, index) => {
                return <MusicListSmallItem key={index} />;
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

function MusicListSmallItem() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
      }}>
      <View style={{flexDirection: 'row', flex: 1, flexShrink: 0}}>
        <Image
          source={{uri: 'https://picsum.photos/50'}}
          style={{width: 50, height: 50, borderRadius: 2}}
        />
        <View style={{marginLeft: 14, justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 12, marginBottom: 4}}>
            {faker.music.genre()}
          </Text>
          <Text style={{color: 'white'}} numberOfLines={1}>
            {faker.music.songName()}
          </Text>
        </View>
      </View>
      <View style={{padding: 10, flexShrink: 1}}>
        <Icon name="dots-three-vertical" color="white" size={12} />
      </View>
    </View>
  );
}

function Title() {
  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
      <Text style={{fontSize: 13, color: 'white', fontWeight: '200'}}>
        이 노래로 뮤직 스테이션 시작하기
      </Text>
      <Text style={{fontWeight: 'bold', fontSize: 28, color: 'white'}}>
        빠른 선곡
      </Text>
    </View>
  );
}
