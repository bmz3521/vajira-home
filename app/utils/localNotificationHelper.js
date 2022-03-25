import PushNotification from 'react-native-push-notification';
import moment from 'moment';

export const TAG_MORNING_BM = 'morningBeforeMeal';
export const TAG_MORNING_AM = 'morningAfterMeal';
export const TAG_LUANCH_BM = 'lunchBeforeMeal';
export const TAG_LUANCH_AM = 'lunchAfterMeal';
export const TAG_EVENING_BM = 'eveningBeforeMeal';
export const TAG_EVENING_AM = 'eveningAfterMeal';
export const TAG_BEFORE_BED = 'beforeBed';

function getLatestLocalNotification() {
  return new Promise(resolve => {
    PushNotification.getScheduledLocalNotifications(call =>
      resolve(call.sort((a, b) => b.date - a.date).pop()),
    );
  });
}

function getListLocalNotification(tagTime) {
  return new Promise(resolve => {
    PushNotification.getScheduledLocalNotifications(call => {
      const latest =
        call.length > 0 ? call.sort((a, b) => a.date - b.date)[0] : undefined;
      if (latest) {
        const data = call.filter(
          item =>
            item?.data?.group === latest?.data?.group &&
            item?.data?.tag == tagTime,
        );
        resolve(data);
      } else {
        resolve([]);
      }
    });
  });
}

/** NOTE iOS can't cancel notification with group */
export async function cancelMultipleNotification(tagTime) {
  const listLocalNotification = await getListLocalNotification(tagTime);
  if (listLocalNotification.length > 0) {
    listLocalNotification.forEach(notification => {
      if (
        notification?.id &&
        moment().isSame(moment(notification?.date), 'day')
      ) {
        PushNotification.cancelLocalNotifications({ id: notification?.id });
      }
    });
  }
}

/** NOTE  if group ID's undefined RNPushNoti will remove all notifications */
export async function cancelGroupNotification(tagTime) {
  const latestLocalNotification = await getLatestLocalNotification();
  if (
    latestLocalNotification?.data?.group &&
    latestLocalNotification?.data?.tag === tagTime &&
    moment().isSame(moment(latestLocalNotification?.date), 'day')
  ) {
    PushNotification.cancelLocalNotifications({
      group: latestLocalNotification?.data.group,
    });
  }
}
