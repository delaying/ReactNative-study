/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Snackbar from './src/chap3/Snackbar';
import DrawerMenu from './src/chap3/DrawerMenu';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerMenu />
    </SafeAreaView>
  );
}

export default App;
