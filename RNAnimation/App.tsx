/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AnimatedComposing from './src/chap2/AnimatedComposing';
import AnimatedDecay from './src/chap2/AnimatedDecay';
import AnimatedOther from './src/chap2/AnimatedOther';
import AnimatedProperty from './src/chap2/AnimatedProperty';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <AnimatedComponents /> */}
      <AnimatedProperty />
    </SafeAreaView>
  );
}

export default App;
