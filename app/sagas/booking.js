import { takeLatest, put, call } from 'redux-saga/effects';
import { BookingAPI } from '@api';
import { BookingActions } from '@actions';
import { BookingConstants } from '@constants';

function* createBooking({ data }) {
    try {
        const result = yield call(BookingAPI.createMobileBooking, data);
        // const result = yield call(BookingAPI.create, data);
        yield put(BookingActions.createBookingSuccess(result));
    } catch (e) {
        yield put(BookingActions.createBookingFailure(e));
    }
}

function* getBooking({ data }) {
    try {
        const result = yield call(BookingAPI.getMobileBooking, data);
        // const result = yield call(BookingAPI.findById, data);
        yield put(BookingActions.getBookingSuccess(result));
    } catch (e) {
        yield put(BookingActions.getBookingFailure(e));
    }
}

// Individual exports for testing
export default function* watchBookingSaga() {
    // Take Last Action Only
    yield takeLatest(BookingConstants.CREATE_BOOKING_REQUEST, createBooking);
    yield takeLatest(BookingConstants.GET_BOOKING_REQUEST, getBooking);
};