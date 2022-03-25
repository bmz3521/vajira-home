import { combineReducers } from 'redux';
import AuthReducer from './auth';
import BookingReducer from './booking';
import BookingsReducer from './bookings';
import ChatReducer from './chat';
import ChatsReducer from './chats';
import UserReducer from './user';
import UserTeleReducer from './userTele';
import TelemedicineReducer from './telemedicine';
// import ClinicReducer from './clinic';
// import PromotionsReducer from './promotions';
// import { waterReducer as water } from './waterReducer';
// import { nutritionReducer as nutrition } from './nutritionReducer';
// import { glucoseReducer as glucose } from './glucoseReducer';
// import { diaryReducer as diary } from './diaryReducer';
// import { pressureReducer as pressure } from './pressureReducer';
// import { weightReducer as weight } from './weightReducer';
// import { communityReducer as community } from './comunnityReducer';
// import { notificationReducer as notification } from './notificationReducer';
import { settingReducer as setting } from './settingReducer';

export default combineReducers({
  auth: AuthReducer,
  booking: BookingReducer,
  bookings: BookingsReducer,
  chat: ChatReducer,
  chats: ChatsReducer,
  user: UserReducer,
  userTele: UserTeleReducer,
  telemedicine: TelemedicineReducer,
  setting,
});
