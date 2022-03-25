import { call, put, takeLatest } from 'redux-saga/effects';
// import { UserAPI } from '@api';
import {
  AuthActions,
  UserActions,
  TelemedicineActions,
  UserTeleActions,
} from '@actions';
import { AuthConstants } from '@constants';

import {
  login as loginAPI,
  register as RegisterAPI,
  logout as logoutAPI,
  userInfos as userInfosAPI,
  userInfosDoctor as userInfosDoctorAPI,
  refreshNewToken as refreshNewTokenAPI,
} from '@services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTypeOfUser, getAccessToken } from '@utils/asyncStorage';

function* register({ data }) {
  try {
    //   console.log('register in sagas tests');
    const result = yield call(RegisterAPI, data);
    //   console.log('Register Token');
    //   console.log(result);
    yield put(AuthActions.registerSuccess(result));
  } catch (e) {
    yield put(AuthActions.loginFailure(e));
  }
}

function* login({ credential }) {
  let userInfos = null;
  const typeUser = yield call(getTypeOfUser);
  try {
    //   console.log('result');
    const result = yield call(loginAPI, credential);
    //   console.log(result);
    if (typeUser !== 'DOCTOR') {
      userInfos = yield call(userInfosAPI);
      yield put(AuthActions.loginSuccess(userInfos, typeUser));
    } else {
      userInfos = yield call(userInfosDoctorAPI);
      yield put(AuthActions.loginSuccess(userInfos, typeUser));
    }

    //   console.log('userInfos!!!!');
    //   console.log(userInfos);

    yield put(UserActions.getUser());
    yield put(UserTeleActions.getUser());
  } catch (e) {
    //   console.log('error');
    //   console.log(e);
    setTypeOfUser('USER');
    yield put(AuthActions.loginFailure(e));
  }
}
async function setTypeOfUser(type) {
  await AsyncStorage.setItem('USER_TYPE', type);
}

function* logout({ callback }) {
  //   console.log('Before logoutAPI');
  yield call(logoutAPI);
  //   console.log('After logoutAPI');
  yield put(AuthActions.logoutSuccess());
  yield put(UserActions.logoutSuccess());
  yield put(UserTeleActions.logoutSuccess());

  if (typeof callback === 'function') {
    yield call(callback, { success: true });
  }
}

function* isAuth() {
  const token = yield call(getAccessToken);
  yield put(AuthActions.isAuthSuccess(token !== null));
  if (token !== null) {
    yield put(UserActions.getUser());
    yield put(TelemedicineActions.getUser());
  }
}

function* thirdPartyLogin({ data }) {
  try {
    //! UserAPI is not exist path /thirdPartyLogin
    // const result = yield call(UserAPI.thirdPartyLogin, data);
    // yield call(refreshNewTokenAPI, result.refreshToken);
    yield put(AuthActions.thirdPartyLoginSuccess());
    yield put(UserActions.getUser());
    yield put(TelemedicineActions.getUser());
  } catch (e) {
    yield put(AuthActions.thirdPartyLoginFailure(e));
  }
}

// Individual exports for testing
export default function* watchAuthSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(AuthConstants.LOGIN_REQUEST, login);
  yield takeLatest(AuthConstants.REGISTER_REQUEST, register);
  yield takeLatest(AuthConstants.LOGOUT_REQUEST, logout);
  yield takeLatest(AuthConstants.IS_AUTH_REQUEST, isAuth);
  yield takeLatest(AuthConstants.THIRD_PARTY_LOGIN_REQUEST, thirdPartyLogin);
}
