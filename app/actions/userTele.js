import { UserTeleConstants } from '@constants';

/* GET USER */
export function getUser() {
  return {
    type: UserTeleConstants.GET_USER_TELE_REQUEST,
  };
}
export function getUserSuccess(result) {
  return {
    type: UserTeleConstants.GET_USER_TELE_SUCCESS,
    result,
  };
}
export function getUserFailure(error) {
  return {
    type: UserTeleConstants.GET_USER_TELE_FAILURE,
    error,
  };
}
export function logout(callback) {
  return {
    type: UserTeleConstants.LOGOUT_REQUEST,
    callback,
  };
}
export function logoutSuccess(error) {
  return {
    type: UserTeleConstants.LOGOUT_SUCCESS,
    error,
  };


};

