import { AuthConstants } from '@constants';

/* Register */
export function register(data) {
  return {
    type: AuthConstants.REGISTER_REQUEST,
    data,
  };
}
export function registerSuccess(result) {
  return {
    type: AuthConstants.REGISTER_SUCCESS,
    data: result,
  };
}

export function registerFailure(error) {
  return {
    type: AuthConstants.REGISTER_FAILURE,
    error,
  };
}

/* Login */
export function login(credential) {
  return {
    type: AuthConstants.LOGIN_REQUEST,
    credential,
  };
}
export function loginSuccess(userInfos, typeUser) {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
    data: userInfos,
    typeUser: typeUser,
  };
}

export function loginFailure(error) {
  return {
    type: AuthConstants.LOGIN_FAILURE,
    error,
  };
}

/* Logout */
export function logout(callback) {
  return {
    type: AuthConstants.LOGOUT_REQUEST,
    callback,
  };
}
export function logoutSuccess() {
  return {
    type: AuthConstants.LOGOUT_SUCCESS,
  };
}

/* Check */
export function isAuth(options) {
  return {
    type: AuthConstants.IS_AUTH_REQUEST,
    options,
  };
}
export function isAuthSuccess(result) {
  return {
    type: AuthConstants.IS_AUTH_SUCCESS,
    data: result,
  };
}

/* Third Party Login */
export function thirdPartyLogin(info) {
  return {
    type: AuthConstants.THIRD_PARTY_LOGIN_REQUEST,
    data: info,
  };
}
export function thirdPartyLoginSuccess(result) {
  return {
    type: AuthConstants.THIRD_PARTY_LOGIN_SUCCESS,
    data: result,
  };
}
export function thirdPartyLoginFailure(error) {
  return {
    type: AuthConstants.THIRD_PARTY_LOGIN_FAILURE,
    error,
  };
}
