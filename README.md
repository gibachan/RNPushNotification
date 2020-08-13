# RNPushNotification

Sample React Native app which accepts remote push notification from Firebase Cloud Messagging.

The detail is described in [the blog post](https://gibachansblog.hatenablog.jp/) written in Japanese.

## Usage

1. Create Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Add Android app with package name `com.example.rn_push_notification.android`. Then donwload google-services.json file and place it in android/app/ directory.

3. Add iOS app with bundle identifier `com.example.rn-push-notification.ios`. Then download GoogleService-Info.plist file and place it in ios/ directory.

4. Go to Settings > Cloud Messaging in the project, upload APNs authentication key for iOS remote notification.

5. Build & run Android/iOS app with the command below

```sh
$ yarn

# for Android app
$ yarn run android

# for iOS app
$ cd ios
$ pod install --repo-update
$ open RNPushNotification.xcworkspace
# In Xcode, fix signing the app and run in on real device.
```

6. Send remote notification from Cloud Messgin dashboard in firebase project
