import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import {
  TAG_MORNING_BM,
  TAG_MORNING_AM,
  TAG_LUANCH_BM,
  TAG_LUANCH_AM,
  TAG_EVENING_BM,
  TAG_EVENING_AM,
  TAG_BEFORE_BED,
} from '@utils/localNotificationHelper';
import moment from 'moment';

const timeInterval = [0, 10, 20];
class LocalNotificationService {
  configure = onOpenNotification => {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    // this.screen='';

    PushNotification.configure({
      onRegister: function(token) {},
      onNotification: function(notification) {
        // console.log('notification ::::', notification);

        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === 'ios'
            ? {
                message: notification.message,
                title: notification.title,
                alertAction: notification.userInteraction ? true : false,
                screen:
                  notification?.userInfo?.screen || notification.data.screen,
              }
            : {
                message: notification.message,
                title: notification.title,
                alertAction: notification.alertAction ? true : false,
                screen:
                  notification?.userInfo?.screen || notification.data.screen,
              },
        );

        if (Platform.OS === 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotification.getChannels(function(channels) {});
  };

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: `Default channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
    PushNotification.createChannel(
      {
        channelId: 'sound-channel-id', // (required)
        channelName: `Sound channel`, // (required)
        channelDescription: 'A sound channel', // (optional) default: undefined.
        soundName: 'sample.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id', // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => {},
    );
  }

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (
    id,
    title,
    message,
    data = {},
    options = {},
    dataDate,
  ) => {
    //   console.log('dataDate ::::', dataDate);

    if (dataDate.drugIds) {
      PushNotification.localNotification({
        /* Android Only Properties */
        ...this.buildAndroidNotification(id, title, message, data, options),
        /* iOS and Android properties */
        ...this.buildIOSNotification(id, title, message, data, options),
        /* iOS and Android properties */
        title: title || '',
        message: message || '',
        playSound: options.playSound || false,
        soundName: options.soundName || 'default',
        userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
      });

      //   console.log('list.........');
      //   console.log(dataDate.drugIds);

      dataDate.drugIds.map(item => {
        //     console.log('each id...');
        //    console.log(item);
        PushNotification.cancelLocalNotifications({ id: item });
      });
    } else if (dataDate.reason) {
      PushNotification.localNotification({
        /* Android Only Properties */
        ...this.buildAndroidNotification(id, title, message, data, options),
        /* iOS and Android properties */
        ...this.buildIOSNotification(id, title, message, data, options),
        /* iOS and Android properties */
        title: title || '',
        message: message || '',
        playSound: options.playSound || false,
        soundName: options.soundName || 'default',
        userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
      });
    } else {
      if (title || message) {
        PushNotification.localNotification({
          /* Android Only Properties */
          ...this.buildAndroidNotification(id, title, message, data, options),
          /* iOS and Android properties */
          ...this.buildIOSNotification(id, title, message, data, options),
          /* iOS and Android properties */
          title: title || '',
          message: message || '',
          playSound: options.playSound || false,
          soundName: options.soundName || 'default',
          userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
        });
      }
    }

    if (dataDate.bookingTime) {
      //   console.log('scheduled noti...');
      PushNotification.localNotificationSchedule({
        /* iOS and Android properties */
        title: title || '',
        message: 'คุณมีนัดทำโทรเวชกรรมพรุ่งนี้',
        playSound: options.playSound || false,
        soundName: options.soundName || 'default',
        userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
        date: new Date(dataDate.bookingTime - 24 * 60 * 60 * 1000), //24 ชม , // in   time secs
        //date: new Date(Date.now() + time * 3600 *1000 ), // in time hour
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      });
      PushNotification.localNotificationSchedule({
        /* Android Only Properties */

        /* iOS and Android properties */
        title: title || '',
        message:
          'คุณมีนัดทำโทรเวชกรรมอีกหนึ่งชั่วโมง โปรดเข้ามารอในห้องโทรเวชกรรม 10 นาทีก่อนเวลานัด',
        playSound: options.playSound || false,
        soundName: options.soundName || 'default',
        userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
        date: new Date(dataDate.bookingTime - 1 * 60 * 60 * 1000), //1 ชม , // in   time secs
        //date: new Date(Date.now() + time * 3600 *1000 ), // in time hour
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      });
    }

    if (dataDate.morning) {
      if (dataDate.morning.beforeMeal.length > 0) {
        //   console.log('Morning Time: 30 minutes before meal');
        dataDate.morning.beforeMeal.map(item => {
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'), // NOTE Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาก่อนอาหารเช้า',
              message: `อีก ${30 -
                minute} นาทีจะถึงเวลาทานอาหารเช้าแล้ว โปรดทานยา`,
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance1',
                group: `DRUG${item}`,
                tag: TAG_MORNING_BM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }
      if (dataDate.morning.afterMeal.length > 0) {
        // console.log('Morning Time: 30 minutes after meal');
        dataDate.morning.afterMeal.map(item => {
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'),
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาหลังอาหารเช้า',
              message: 'ถึงเวลาทานยาแล้ว',
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance1',
                group: `DRUG${item}`,
                tag: TAG_MORNING_AM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }
    }

    if (dataDate.lunch) {
      if (dataDate.lunch.beforeMeal.length > 0) {
        //   console.log('Lunch Time: 30 minutes before meal');
        dataDate.lunch.beforeMeal.map(item => {
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'),
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาก่อนอาหารกลางวัน',
              message: `อีก ${30 -
                minute} นาทีจะถึงเวลาทานอาหารกลางวันแล้ว โปรดทานยา`,
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance2',
                group: `DRUG${item}`,
                tag: TAG_LUANCH_BM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }

      if (dataDate.lunch.afterMeal.length > 0) {
        //   console.log('Lunch Time: 30 minutes after meal');

        dataDate.lunch.afterMeal.map(item => {
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'),
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาหลังอาหารกลางวัน',
              message: 'ถึงเวลาทานยาแล้ว',
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance2',
                group: `DRUG${item}`,
                tag: TAG_LUANCH_AM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }
    }

    if (dataDate.evening) {
      if (dataDate.evening.beforeMeal.length > 0) {
        //   console.log('Evening Time: 30 minutes before meal');

        dataDate.evening.beforeMeal.map(item => {
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'),
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาก่อนอาหารเย็น',
              message: `อีก ${30 -
                minute} นาทีจะถึงเวลาทานอาหารเย็นแล้ว โปรดทานยา`,
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance3',
                group: `DRUG${item}`,
                tag: TAG_EVENING_BM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }

      if (dataDate.evening.afterMeal.length > 0) {
        //   console.log('Evening Time: 30 minutes after meal');

        dataDate.evening.afterMeal.map(item => {
          // console.log(`repeat this evening ...`);
          // console.log(new Date(item));
          if (moment(item).isBefore(moment())) return;
          timeInterval.forEach((minute, index) => {
            PushNotification.localNotificationSchedule({
              /* iOS and Android properties */
              id: moment(item)
                .add(minute, 'minutes')
                .format('MMDDHHmm'),
              channelId: 'default-channel-id',
              title: 'แจ้งเตือนเวลาทานยาหลังอาหารเย็น',
              message: 'ถึงเวลาทานยาแล้ว',
              group: `DRUG${item}`,
              groupSummary: index !== 0 ? true : false,
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false,
              userInfo: {
                screen: 'MonitorDrugCompliance3',
                group: `DRUG${item}`,
                tag: TAG_EVENING_AM,
              },
              date: moment(item)
                .add(minute, 'minutes')
                .toDate(),
              allowWhileIdle: true,
              importance: Importance.HIGH,
            });
          });
        });
      }
    }

    if (dataDate.bed && dataDate.bed.beforeMeal.length > 0) {
      //   console.log('Bed Time: 30 minutes before bed');

      dataDate.bed.beforeMeal.map(item => {
        if (moment(item).isBefore(moment())) return;
        timeInterval.forEach((minute, index) => {
          PushNotification.localNotificationSchedule({
            /* iOS and Android properties */
            id: moment(item)
              .add(minute, 'minutes')
              .format('MMDDHHmm'),
            channelId: 'default-channel-id',
            title: 'แจ้งเตือนเวลาทานยาก่อนนอน',
            message: `อีก ${30 - minute} นาทีจะถึงเวลาทานยาแล้ว`,
            group: `DRUG${item}`,
            groupSummary: index !== 0 ? true : false,
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false,
            userInfo: {
              screen: 'MonitorDrugCompliance4',
              group: `DRUG${item}`,
              tag: TAG_BEFORE_BED,
            },
            date: moment(item)
              .add(minute, 'minutes')
              .toDate(),
            allowWhileIdle: true,
            importance: Importance.HIGH,
          });
        });
      });
    }
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      channelId: 'default-channel-id',
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high', // (optional) set notification importance, default: high,
      data: data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
      PushNotification.cancelAllLocalNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = notificationId => {
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };
}

export const localNotificationService = new LocalNotificationService();
