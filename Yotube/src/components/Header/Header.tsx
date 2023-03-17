import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, useWindowDimensions} from 'react-native';
import {Spacer} from '../Spacer';
import {HeaderTitle} from './HeaderTitle';
import {HeaderIcon} from './HeaderButton';
import {HeaderGroup} from './HeaderGroup';

type CompoundComposition = {
  Title: React.FC<{
    title: string;
  }>;
  Icon: React.FC<{
    onPress: () => void;
    iconName: string;
  }>;
  Group: React.FC<{
    children: ReactElement[] | ReactElement;
  }>;
};

export const Header: React.FC<{
  children: ReactElement[] | ReactElement;
}> &
  CompoundComposition = props => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  return (
    <View style={{paddingTop: insets.top}}>
      <View
        style={{
          width,
          flexDirection: 'row',
          height: 56,
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Spacer horizontal space={12} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {props.children}
        </View>
        <Spacer horizontal space={12} />
      </View>
    </View>
  );
};

Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;
Header.Group = HeaderGroup;
