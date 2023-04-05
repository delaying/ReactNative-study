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
import Collapse from './src/chap3/Collapse';
import Progressbar from './src/chap3/Progressbar';
import Skeleton from './src/chap3/Skeleton';
import SnowAnimation from './src/chap3/SnowAnimation';
import LayoutAnimationIntro from './src/chap4/LayoutAnimationIntro';
import LayoutAnimationPageHeader from './src/chap4/LayoutAnimationPageHeader';
import LayoutAnimationCollapse from './src/chap4/LayoutAnimationCollapse';

function App(): JSX.Element {
  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <Skeleton />
    // </SafeAreaView>
    <LayoutAnimationCollapse />
  );
}

export default App;
