import { combineReducers } from 'redux';

import AuthReducer from './auth';
import BookingReducer from './booking';
import BookingsReducer from './bookings';
import ChatReducer from './chat';
import ChatsReducer from './chats';
import ClinicReducer from './clinic';
import PromotionsReducer from './promotions';
import UserReducer from './user';
import UserTeleReducer from './userTele';
import TelemedicineReducer from './telemedicine';
import { waterReducer as water } from './waterReducer';
import { nutritionReducer as nutrition } from './nutritionReducer';
import { glucoseReducer as glucose } from './glucoseReducer';
import { diaryReducer as diary } from './diaryReducer';
import { pressureReducer as pressure } from './pressureReducer';
import { weightReducer as weight } from './weightReducer';
import { communityReducer as community } from './comunnityReducer';
import { notificationReducer as notification } from './notificationReducer';
import { settingReducer as setting } from './settingReducer';

const appReducer = combineReducers({
  auth: AuthReducer,
  booking: BookingReducer,
  bookings: BookingsReducer,
  chat: ChatReducer,
  chats: ChatsReducer,
  clinic: ClinicReducer,
  promotions: PromotionsReducer,
  user: UserReducer,
  userTele: UserTeleReducer,
  telemedicine: TelemedicineReducer,
  water,
  nutrition,
  community,
  notification,
  setting,
  glucose,
  pressure,
  weight,
  diary
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }