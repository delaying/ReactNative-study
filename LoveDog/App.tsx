/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackNavigation} from './src/navigation/RootStackNavigation';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1005207795556-hsp12uoefqte803t69q2dvi9j319egt8.apps.googleusercontent.com',
});

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
