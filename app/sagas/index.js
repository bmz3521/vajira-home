// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
// Imports: Redux Sagas
import watchAuth from './auth';
import watchBooking from './booking';
import watchBookings from './bookings';
import watchChat from './chat';
import watchChats from './chats';
// import watchClinic from './clinic';
// import watchPromotions from './promotions';
import watchDoctor from './doctor';
import watchUser from './user';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchBooking),
    fork(watchBookings),
    fork(watchChat),
    fork(watchChats),
    fork(watchDoctor),
    fork(watchUser),
  ]);
}
