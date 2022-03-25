import { Platform, AsyncStorage } from 'react-native';
import FCM from "react-native-fcm";

import dataProvider from './dataProvider';
import store from '../store';

async function install (token, userId) {
  const localStoreUserId = store.getState().Auth.userId || userId;
  const notice = await AsyncStorage.getItem('notice');
  // console.log('notice: ', notice);
  if (!notice && localStoreUserId) {
    const body = {
      appId: 'evervideo',
      userId,
      deviceToken: token,
      deviceType: Platform.OS
    };
    const provider = dataProvider(`/Installations`);
    const result = await provider.create(body);
    await AsyncStorage.setItem('notice', JSON.stringify(result));
    return result;
  }
  return notice;
}

export const registerApp = (userId) => {
  FCM.getFCMToken().then(token => {
    // console.log("TOKEN (getFCMToken)", token);
    return install(token, userId);
  });

  if (Platform.OS === 'ios') {
    FCM.getAPNSToken().then(token => {
      // console.log("APNS TOKEN (getFCMToken)", token);
      return install(token, userId);
    });
  }
}
