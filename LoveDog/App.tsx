/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  RootStackNavigation,
  TypeRootStackNavigationParams,
} from './src/navigation/RootStackNavigation';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';
import store from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId:
    '1005207795556-hsp12uoefqte803t69q2dvi9j319egt8.apps.googleusercontent.com',
});

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer<TypeRootStackNavigationParams>
            linking={{
              prefixes: ['mydog://'],
              config: {
                screens: {
                  HistoryList: '/history',
                  Main: {
                    path: '/',
                    screens: {
                      Main: '/main',
                      My: '/my',
                    },
                  },
                },
              },
            }}>
            <RootStackNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
