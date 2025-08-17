import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <AppNavigator />
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
