/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging'; // これを追加する

const App = () => {
  const [message, setMessage] = useState('まだ通知を受信していません');

  useEffect(() => {
    // `wether`トピックを購読
    messaging()
      .subscribeToTopic('weather')
      .then(() => console.log('Subscribed to topic!'));

    // アプリがバックグラウンドで実行中に通知をタップされたときのコールバック
    messaging().onNotificationOpenedApp((remoteMessage) => {
      setMessage(
        `[${remoteMessage.notification?.title}]によってバックグラウンドから復帰しました`,
      );
    });

    // 通知をタップしてアプリが起動されたときのコールバック
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          setMessage(
            `[${remoteMessage.notification?.title}]によって起動されました`,
          );
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
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
