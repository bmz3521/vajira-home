import { UserConstants } from '@constants';

/* GET USER */
export function getUser() {
  return {
    type: UserConstants.GET_USER_REQUEST,
  };
}
export function getUserSuccess(result) {
  return {
    type: UserConstants.GET_USER_SUCCESS,
    result,
  };
}
export function getUserFailure(error) {
  return {
    type: UserConstants.GET_USER_FAILURE,
    error,
  };
}
export function logout(callback) {
  return {
    type: UserConstants.LOGOUT_REQUEST,
    callback,
  };
}
export function logoutSuccess(error) {
  return {
    type: UserConstants.LOGOUT_SUCCESS,
    error,
  };
}

export function getUpdateInfo() {
  return {
    type: UserConstants.GET_UPDATE_INFO_REQUEST,
  };
}

export function getUpdateInfoSuccess(result) {
  return {
    type: UserConstants.GET_UPDATE_INFO_SUCCESS,
    result,
  };
}

export function getUpdateInfoFailure(error) {
  return {
    type: UserConstants.GET_UPDATE_INFO_FAILURE,
    error,
  };
}
