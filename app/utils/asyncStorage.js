import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCESS_TOKEN,
  ACCESS_TELE_TOKEN,
  FCM_TOKEN,
  TIME,
  BOOKING_IDS,
  TIME_HOMEPAGE,
  CHAT_NOTI,
  DRUG_NOTI,
  CANCEL_DRUG_NOTI,
  TRACKING,
} from '@_config/constants';

export const getBookingIds = async () => {
  let bookingIds = [];
  try {
    const item =
      (await AsyncStorage.getItem(BOOKING_IDS)) || JSON.stringify([]);
    bookingIds = JSON.parse(item);
  } catch (error) {
    console.log(error.message);
    return Promise.reject([]);
  }

  return Promise.resolve(bookingIds);
};

export const addBookingId = async id => {
  let bookingIds = [];
  try {
    const item =
      (await AsyncStorage.getItem(BOOKING_IDS)) || JSON.stringify([]);
    bookingIds = JSON.parse(item);
    bookingIds.push(id);

    const _ = await AsyncStorage.setItem(
      BOOKING_IDS,
      JSON.stringify(bookingIds),
    );
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const setFcmToken = async resp => {
  try {
    await AsyncStorage.setItem(FCM_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getFcmToken = async () => {
  let token = '';
  try {
    const item = (await AsyncStorage.getItem(FCM_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};

export const setChatNoti = async resp => {
  try {
    await AsyncStorage.setItem(CHAT_NOTI, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const getChatNoti = async () => {
  let noti = 0;
  try {
    const item = (await AsyncStorage.getItem(CHAT_NOTI)) || 0;
    noti = JSON.parse(item);
    return parseInt(noti);
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const setDrugNoti = async resp => {
  try {
    await AsyncStorage.setItem(DRUG_NOTI, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const getDrugNoti = async () => {
  try {
    const item = await AsyncStorage.getItem(DRUG_NOTI);

    let noti;

    if (item === null) {
      noti = false;
    } else {
      noti = JSON.parse(item);
    }

    return noti;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const setCancelDrugNoti = async resp => {
  try {
    await AsyncStorage.setItem(CANCEL_DRUG_NOTI, JSON.stringify(resp));
  } catch (error) {
    console.log('Error setting cancel drug noti...', error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const getCancelDrugNoti = async () => {
  try {
    const item = await AsyncStorage.getItem(CANCEL_DRUG_NOTI);

    let noti;

    if (item === null) {
      noti = [];
    } else {
      noti = JSON.parse(item);
    }

    return noti;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const setTime = async resp => {
  try {
    await AsyncStorage.setItem(TIME, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getTime = async () => {
  let time = '';
  try {
    const item = (await AsyncStorage.getItem(TIME)) || JSON.stringify('');
    time = JSON.parse(item);
    return time;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};

export const clearBookingId = async () => {
  try {
    const _ = await AsyncStorage.setItem(BOOKING_IDS, JSON.stringify([]));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getAccessToken = async () => {
  let token = '';
  try {
    const item =
      (await AsyncStorage.getItem(ACCESS_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return token;
};

export const setAccessToken = async resp => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const checkTimeHomePage = async () => {
  try {
    const time = (await AsyncStorage.getItem(TIME_HOMEPAGE)) || 0;
    return JSON.parse(time);
  } catch (error) {
    return Promise.reject();
  }
};

export const addTimeHomePage = async () => {
  try {
    const time = (await AsyncStorage.getItem(TIME_HOMEPAGE)) || 0;
    const item = JSON.parse(time);
    await AsyncStorage.setItem(TIME_HOMEPAGE, JSON.stringify(item + 1));
  } catch (e) {
    return Promise.reject();
  }
};

export const setTimeHomePage = async num => {
  try {
    await AsyncStorage.setItem(TIME_HOMEPAGE, JSON.stringify(num));
  } catch (e) {
    return Promise.reject();
  }
};

export const getAccessTeleToken = async () => {
  let token = '';
  try {
    const item =
      (await AsyncStorage.getItem(ACCESS_TELE_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    console.log(token);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};

export const setAccessTeleToken = async resp => {
  try {
    await AsyncStorage.setItem(ACCESS_TELE_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.multiRemove(['ACCESS_TOKEN', 'ACCESS_TELE_TOKEN']);
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const setListDrugNoti = async payload => {
  try {
    await AsyncStorage.setItem('LIST_DRUG_NOTI', JSON.stringify(payload));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const getListDrugNoti = async () => {
  try {
    const item =
      (await AsyncStorage.getItem('LIST_DRUG_NOTI')) || JSON.stringify('');
    const result = JSON.parse(item);
    return result;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const getDateUpdatedDrugNoti = async () => {
  try {
    const item =
      (await AsyncStorage.getItem('UPDATED_DATE_NOTI_IOS')) ||
      JSON.stringify('');
    const result = JSON.parse(item);
    return result;
  } catch (error) {
    return Promise.reject();
  }
};

export const setDateUpdatedDrugNoti = async date => {
  try {
    await AsyncStorage.setItem(
      'UPDATED_DATE_NOTI_IOS',
      JSON.stringify({ date }),
    );
  } catch (error) {
    return Promise.reject();
  }
};

export const resetNotificationIOS = async () => {
  try {
    const removeDate = await AsyncStorage.removeItem('UPDATED_DATE_NOTI_IOS');
    const removeList = await AsyncStorage.removeItem('LIST_DRUG_NOTI');
    const result = await Promise.all([removeDate, removeList]);
    return result;
  } catch (err) {
    return Promise.reject();
  }
};

export const getTypeOfUser = async () => {
  try {
    const typeOfUser = await AsyncStorage.getItem('USER_TYPE');
    return typeOfUser;
  } catch (err) {
    return Promise.reject();
  }
};

export const resetTracking = async () => {
  try {
    const remove = await AsyncStorage.removeItem(TRACKING);
    return remove;
  } catch (err) {
    return Promise.reject();
  }
};

export const getTracking = async () => {
  try {
    const tracking = await AsyncStorage.getItem(TRACKING);
    return JSON.parse(tracking);
  } catch (err) {
    return Promise.reject();
  }
};

export const setTracking = async countType => {
  try {
    const prevTrack = await AsyncStorage.getItem(TRACKING);

    let track;

    // continue from prev existing data
    if (prevTrack !== null) {
      const {
        gameCount,
        diaryCount,
        pickupByEmsCount,
        healthRecordCount,
        bookingStatusCount,
        drugTakingCount,
        drugTrackingCount,
      } = JSON.parse(prevTrack);

      if (countType === 'gameCount') {
        track = JSON.stringify({
          gameCount: gameCount + 1,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        });
      } else if (countType === 'diaryCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount: diaryCount + 1,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        });
      } else if (countType === 'pickupByEmsCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount,
          pickupByEmsCount: pickupByEmsCount + 1,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        });
      } else if (countType === 'healthRecordCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount: healthRecordCount + 1,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        });
      } else if (countType === 'bookingStatusCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount: bookingStatusCount + 1,
          drugTakingCount,
          drugTrackingCount,
        });
      } else if (countType === 'drugTakingCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount: drugTakingCount + 1,
          drugTrackingCount,
        });
      } else if (countType === 'drugTrackingCount') {
        track = JSON.stringify({
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount: drugTrackingCount + 1,
        });
      }
    } else {
      // first time tracking after resetting
      if (countType === 'gameCount') {
        track = JSON.stringify({
          gameCount: 1,
          diaryCount: 0,
          pickupByEmsCount: 0,
          healthRecordCount: 0,
          bookingStatusCount: 0,
          drugTakingCount: 0,
          drugTrackingCount: 0,
        });
      } else if (countType === 'diaryCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 1,
          pickupByEmsCount: 0,
          healthRecordCount: 0,
          bookingStatusCount: 0,
          drugTakingCount: 0,
          drugTrackingCount: 0,
        });
      } else if (countType === 'pickupByEmsCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 0,
          pickupByEmsCount: 1,
          healthRecordCount: 0,
          bookingStatusCount: 0,
          drugTakingCount: 0,
          drugTrackingCount: 0,
        });
      } else if (countType === 'healthRecordCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 0,
          pickupByEmsCount: 0,
          healthRecordCount: 1,
          bookingStatusCount: 0,
          drugTakingCount: 0,
          drugTrackingCount: 0,
        });
      } else if (countType === 'bookingStatusCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 0,
          pickupByEmsCount: 0,
          healthRecordCount: 0,
          bookingStatusCount: 1,
          drugTakingCount: 0,
          drugTrackingCount: 0,
        });
      } else if (countType === 'drugTakingCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 0,
          pickupByEmsCount: 0,
          healthRecordCount: 0,
          bookingStatusCount: 0,
          drugTakingCount: 1,
          drugTrackingCount: 0,
        });
      } else if (countType === 'drugTrackingCount') {
        track = JSON.stringify({
          gameCount: 0,
          diaryCount: 0,
          pickupByEmsCount: 0,
          healthRecordCount: 0,
          bookingStatusCount: 0,
          drugTakingCount: 0,
          drugTrackingCount: 1,
        });
      }
    }

    await AsyncStorage.setItem(TRACKING, track);
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};
