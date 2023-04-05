import React, {useState} from 'react';
import {
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default () => {
  const [expanded, setExpanded] = useState(true);

  const onScroll = e => {
    const y = e.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (y > 10) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {/* 스크롤이 되는 높이를 측정 */}
      <ScrollView
        contentContainerStyle={{height: 1000}}
        onScroll={e => onScroll(e)}
        scrollEventThrottle={1}>
        {expanded ? (
          <View style={{backgroundColor: '#333'}}>
            <SafeAreaView style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#222',
                  marginLeft: 20,
                  marginRight: 16,
                  marginBottom: -10,
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="person" size={30} color="#333" />
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    marginTop: 8,
                  }}>
                  delaying
                </Text>
                <Text style={{color: 'white', fontSize: 13}}>rn 파이팅!!</Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#333',
              height: 300,
              position: 'relative',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: -100,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#222',
                  width: 160,
                  height: 160,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="person" size={100} color="#333" />
              </View>
              <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>
                delaying
              </Text>
              <Text style={{fontSize: 14, marginTop: 10}}>열심히하자</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};
