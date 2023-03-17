import React from 'react';
import {Text as RNText} from 'react-native';

export const Typography: React.FC<{
  color?: string;
  fontSize?: number;
  numberOfLines?: number;
  children: React.ReactElement | string | string[] | React.ReactElement[];
}> = props => (
  <RNText
    style={{
      color: props.color ?? 'black',
      fontSize: props.fontSize ?? 10,
    }}
    numberOfLines={props.numberOfLines}>
    {props.children}
  </RNText>
);
