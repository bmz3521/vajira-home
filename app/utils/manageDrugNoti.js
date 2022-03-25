import moment from 'moment';
import { Platform } from 'react-native';
const initialRes = {
  morning: { beforeMeal: [], afterMeal: [] },
  lunch: { beforeMeal: [], afterMeal: [] },
  evening: { beforeMeal: [], afterMeal: [] },
  bed: { beforeMeal: [] },
};

export const manageDrugNotiIOS = (res = initialRes) => {
  try {
    if (res) {
      const totalRes = [
        ...res.morning.beforeMeal.map(a => ({
          type: 'morningBeforeMeal',
          val: a,
        })),
        ...res.morning.afterMeal.map(a => ({
          type: 'morningAfterMeal',
          val: a,
        })),
        ...res.lunch.beforeMeal.map(a => ({ type: 'lunchBeforeMeal', val: a })),
        ...res.lunch.afterMeal.map(a => ({ type: 'lunchAfterMeal', val: a })),
        ...res.evening.beforeMeal.map(a => ({
          type: 'eveningBeforeMeal',
          val: a,
        })),
        ...res.evening.afterMeal.map(a => ({
          type: 'eveningAfterMeal',
          val: a,
        })),
        ...res.bed.beforeMeal.map(a => ({ type: 'bedBeforeMeal', val: a })),
      ];
      const filterList = totalRes.filter(item =>
        moment(item.val).isAfter(moment()),
      );
      const sortTime = filterList.sort((a, b) => a.val - b.val);
      const limit = Platform.OS === 'ios' ? 11 : 33;
      const slice = sortTime.slice(0, limit); // NOTE limit 60 to prevent error on IOS can't stack more than 64 items in localNotification
      res.morning.beforeMeal = slice.flatMap(a => {
        return a.type == 'morningBeforeMeal' ? a.val : [];
      });
      res.morning.afterMeal = slice.flatMap(a => {
        return a.type == 'morningAfterMeal' ? a.val : [];
      });
      res.lunch.beforeMeal = slice.flatMap(a => {
        return a.type == 'lunchBeforeMeal' ? a.val : [];
      });
      res.lunch.afterMeal = slice.flatMap(a => {
        return a.type == 'lunchAfterMeal' ? a.val : [];
      });
      res.evening.beforeMeal = slice.flatMap(a => {
        return a.type == 'eveningBeforeMeal' ? a.val : [];
      });
      res.evening.afterMeal = slice.flatMap(a => {
        return a.type == 'eveningAfterMeal' ? a.val : [];
      });
      res.bed.beforeMeal = slice.flatMap(a => {
        return a.type == 'bedBeforeMeal' ? a.val : [];
      });
      return res;
    }
    return res;
  } catch (err) {}
};
