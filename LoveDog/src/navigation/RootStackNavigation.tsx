import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {HistoryListScreen} from '../screens/HistoryListScreen';
import {IntroScreen} from '../screens/IntroScreen';
import {TakePhotoScreen} from '../screens/TakePhotoScreen';
import {BottomTabNavigation} from './BottomTabNavigation';
import {SignupNavigation, TypeSignupNavigation} from './SignupNavigation';

type TypeRootStackNavigationParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Signup" component={SignupNavigation} />
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="HistoryList" component={HistoryListScreen} />
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() =>
  useNavigation<
    NativeStackNavigationProp<TypeRootStackNavigationParams, RouteName>
  >();

export const useRootRoute = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() => useRoute<RouteProp<TypeRootStackNavigationParams, RouteName>>();
