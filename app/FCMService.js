import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          //   console.log('fcmToken');
          //   console.log(fcmToken);

          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    //   console.log('[FCMService] deleteToken ');
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
      //   remoteMessage,
      // );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      // console.log(
      //   '[FCMService] A new FCM message from foreground!',
      //   remoteMessage,
      // );
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification, remoteMessage.data);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      // console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  buildChannel = obj => {
    return new firebase.notifications.Android.Channel(
      obj.channelId,
      obj.channelName,
      firebase.notifications.Android.Importance.High,
    ).setDescription(obj.channelDes);
  };

  buildNotification = obj => {
    // For Android
    firebase.notifications().android.createChannel(obj.channel);

    // For Android and IOS
    return (
      new firebase.notifications.Notification()
        .setSound(obj.sound)
        .setNotificationId(obj.dataId)
        .setTitle(obj.title)
        .setBody(obj.content)
        .setData(obj.data)

        // For Android
        .android.setChannelId(obj.channel.channelId)
        .android.setLargeIcon(obj.largeIcon) // create this icon in Android Studio (app/res/mipmap)
        .android.setSmallIcon(obj.smallIcon) // create this icon in Android Studio (app/res/drawable)
        .android.setColor(obj.colorBgIcon)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setVibrate(obj.vibrate)
    );
    //.android.setAutoCancel(true) // Auto cancel after receive notification
  };

  unRegister = () => {
    this.messageListener();
  };

  displayNotification = notification => {
    firebase
      .notifications()
      .displayNotification(notification)
      .catch(error => console.log('Display Notification error: ', error));
  };

  removeDeliveredNotification = notification => {
    firebase
      .notifications()
      .removeDeliveredNotification(notification.notificationId);
  };
}

export const fcmService = new FCMService();
