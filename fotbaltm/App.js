import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Navigation from './src/navigation/index';

function App() {
  return(
      <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 300,
    fontSize: 36,
    color: 'red'
  }
});

export default App;
