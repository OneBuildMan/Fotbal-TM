import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Register from './src/screens/Register';

function App() {
  return(
    <SafeAreaView>
      <Register />
    </SafeAreaView>
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
