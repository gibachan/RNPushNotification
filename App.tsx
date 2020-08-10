/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging'; // これを追加する

const App = () => {
  useEffect(() => {
    // `wether`トピックを購読
    messaging()
      .subscribeToTopic('weather')
      .then(() => console.log('Subscribed to topic!'));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
