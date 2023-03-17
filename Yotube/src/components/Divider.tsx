import React from 'react';
import {View} from 'react-native';

export const Divider: React.FC = () => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderWidth: 0.5,
        marginHorizontal: 24,
        borderColor: 'gray',
      }}
    />
  );
};
