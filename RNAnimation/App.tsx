/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AnimatedComponents from './src/chap2/AnimatedComponents';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AnimatedComponents />
    </SafeAreaView>
  );
}

export default App;
