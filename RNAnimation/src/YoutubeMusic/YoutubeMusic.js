import React from 'react';
import {ScrollView, Text, View} from 'react-native';

export default () => {
  return (
    <View style={{flex: 1, borderWidth: 10}}>
      <Text>logo header</Text>
      <Text>category header</Text>
      <Text>background header </Text>
      <ScrollView style={{borderWidth: 1}}>
        <View style={{height: 10000}}>
          <Text>Music list</Text>
        </View>
      </ScrollView>
      <Text>Bottom</Text>
    </View>
  );
};
