/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AnimatedDecay from './src/chap2/AnimatedDecay';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <AnimatedComponents /> */}
      <AnimatedDecay />
    </SafeAreaView>
  );
}

export default App;
