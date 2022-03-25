import { takeLatest, put, call } from 'redux-saga/effects';
import { BookingAPI } from '@api';
import { BookingsActions } from '@actions';
import { BookingsConstants } from '@constants';

function* getBookings({ data }) {
  try {
    const result = yield call(BookingAPI.getMobileBookings, data);
    yield put(BookingsActions.getBookingsSuccess(result));
  } catch (e) {
    yield put(BookingsActions.getBookingsFailure(e));
  }
}

function* fetchDoctorBookings() {
  try {
    const result = yield call(BookingAPI.fetchDoctorBooking);
    yield put(BookingsActions.getBookingsSuccess(result));
  } catch (e) {
    yield put(BookingsActions.getBookingsFailure(e));
  }
}

// Individual exports for testing
export default function* watchBookingsSaga() {
  // Take Last Action Only
  yield takeLatest(BookingsConstants.GET_BOOKINGS_REQUEST, getBookings);
  yield takeLatest(
    BookingsConstants.GET_DOCTOR_BOOKINGS_REQUEST,
    fetchDoctorBookings,
  );
}
