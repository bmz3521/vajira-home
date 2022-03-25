import { takeLatest, put, call } from 'redux-saga/effects';
import { ClinicAPI } from '@api';
import { ClinicActions } from '@actions';
import { ClinicConstants } from '@constants';

function* getClinic({ data }) {
    try {
        const result = yield call(ClinicAPI.getClinic, data);
        yield put(ClinicActions.getClinicSuccess(result));
    } catch (e) {
        yield put(ClinicActions.getClinicFailure(e));
    }
}

// Individual exports for testing
export default function* watchClinicSaga() {
    // Take Last Action Only
    yield takeLatest(
        ClinicConstants.GET_CLINIC_REQUEST,
        getClinic,
    );
};