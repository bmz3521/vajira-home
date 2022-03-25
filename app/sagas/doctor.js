import { takeLatest, put, call } from 'redux-saga/effects';
import { DoctorAPI } from '@api';
import { DoctorActions } from '@actions';
import { DoctorConstants } from '@constants';

function* getDoctor({ data }) {
  try {
    const result = yield call(DoctorAPI.getDoctor, data);
    yield put(DoctorActions.getDoctorSuccess(result));
  } catch (e) {
    yield put(DoctorActions.getDoctorFailure(e));
  }
}

// Individual exports for testing
export default function* watchDoctorSaga() {
  // Take Last Action Only
  yield takeLatest(DoctorConstants.GET_DOCTOR_REQUEST, getDoctor);
}
