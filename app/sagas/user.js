import { call, put, takeLatest } from 'redux-saga/effects';
import { UserAPI, UserInfosAPI } from '@api';
import { UserActions, UserTeleActions, AuthActions } from '@actions';
import { UserConstants, UserTeleConstants } from '@constants';
import { loginTele as loginTeleAPI } from '@services/authTeleService';

import { userInfos as userInfosAPI } from '@services/authService';

function* getUser() {
  try {
    const result = yield call(UserAPI.getUser);
    //   console.log('Result from OMA');
    //   console.log(result);
    const image = yield call(UserInfosAPI.getPatientHIEImage, {
      patientId: result.id,
    });
    //   console.log('image');
    //   console.log(image);

    const resultWImg = {
      ...result,
      HIEimage: image.imageBase64,
    };

    yield put(UserActions.getUserSuccess(resultWImg));
  } catch (e) {
    yield put(UserActions.getUserFailure(e.response));
  }
}
function* getUserTele() {
  try {
    //   console.log('here at getUserTele');
    const result = yield call(loginTeleAPI);
    //   console.log('get user tele success!!!');
    //   console.log(result);
    yield put(UserTeleActions.getUserSuccess(result));
  } catch (e) {
    console.log('fail at getUserTele');
    yield put(UserTeleActions.getUserFailure(e.response));
  }
}

function* getUserInformation() {
  try {
    const userInfos = yield call(userInfosAPI);
    // console.log('userInfos from getUpdateInfo!!!!');
    // console.log(userInfos);

    yield put(UserActions.getUpdateInfoSuccess(userInfos));
    yield put(AuthActions.loginSuccess(userInfos));
  } catch (e) {
    console.log('error');
    console.log(e);
    yield put(UserActions.getUpdateInfoFailure(e.response));
  }
}

// Individual exports for testing
export default function* watchUserSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(UserConstants.GET_USER_REQUEST, getUser);
  yield takeLatest(UserConstants.GET_UPDATE_INFO_REQUEST, getUserInformation);
  yield takeLatest(UserTeleConstants.GET_USER_TELE_REQUEST, getUserTele);
  // yield takeLatest(TelemedicineConstants.GET_USER_REQUEST, getUserTele);
}
