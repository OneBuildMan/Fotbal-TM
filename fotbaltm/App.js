import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App() {
  return(
    <View style={styles.container}>
      <Text style={styles.text}> FOTBAL TM </Text>
      <StatusBar style="auto" />
    </View>
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
