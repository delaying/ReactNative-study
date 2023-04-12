import React from 'react';
import {Animated, ScrollView, Text, TouchableOpacity, View} from 'react-native';

export default ({setSelectedCategory, selectedCategory, headerAnim}) => {
  const category = ['휴식', '에너지 충전', '집중', '운동', '출퇴근/등하교'];

  const onPressCategory = index => {
    const data = selectedCategory === index ? undefined : index;
    setSelectedCategory(data);
  };
  return (
    <View>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingBottom: 5,
          borderBottomWidth: headerAnim.interpolate({
            inputRange: [0, 40],
            outputRange: [0, 0.5],
          }),
          borderBottomColor: '#444',
        }}
        contentContainerStyle={{paddingHorizontal: 10}}>
        {category.map((value, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPressCategory(index)}
              key={index}>
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  backgroundColor:
                    selectedCategory === index ? '#ffffff' : '#ffffff10',
                  borderColor: '#ffffff30',
                  marginHorizontal: 4,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: selectedCategory === index ? '#111' : 'white',
                  }}>
                  {value}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};
