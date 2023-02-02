import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Calculator from './src/Calculator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Calculator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
