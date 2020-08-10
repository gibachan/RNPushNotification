/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'; // これを追加する

// バックグラウンドで通知を受信した時のコールバック
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  `[${remoteMessage.notification?.title}]を受信しました`;
});

AppRegistry.registerComponent(appName, () => App);
