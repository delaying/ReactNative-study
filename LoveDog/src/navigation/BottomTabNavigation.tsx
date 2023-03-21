import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {MyScreen} from '../screens/MyScreen';

type TypeBottomTabNavigation = {
  Main: undefined;
  My: undefined;
};

const BottomTab = createBottomTabNavigator<TypeBottomTabNavigation>();

export const BottomTabNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="Main" component={MainScreen} />
      <BottomTab.Screen name="My" component={MyScreen} />
    </BottomTab.Navigator>
  );
};

export const useBottomTabNavigation = <
  RouteName extends keyof TypeBottomTabNavigation,
>() =>
  useNavigation<BottomTabNavigationProp<TypeBottomTabNavigation, RouteName>>();

export const useBottomTabRoute = <
  RouteName extends keyof TypeBottomTabNavigation,
>() => useRoute<RouteProp<TypeBottomTabNavigation, RouteName>>();
