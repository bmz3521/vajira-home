import { TokenAPI, UserAPI, UserInfosAPI } from '@api';

import { refreshToken, resetPassword } from '@utils/request';
import { setAccessToken, removeAccessToken } from '@utils/asyncStorage';

export function register(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('UserAPI register from auth service ????');
      const response = await UserAPI.register(data);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function login(credential) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('CREDENTIAL', credential);
      const response = await UserAPI.login(credential);
      console.log('setAccessToken', response);
      await setAccessToken(response);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function userInfos() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getUserInfo();
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
export function userInfosDoctor() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getDoctorInfo();
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
export function logout() {
  return new Promise(async resolve => {
    await removeAccessToken();
    resolve();
  });
}

export function verifyToken(token) {
  return new Promise(async resolve => {
    try {
      const response = await TokenAPI.verify(token);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function refreshNewToken(token) {
  return new Promise(async resolve => {
    try {
      const response = await refreshToken(token);
      await setAccessToken(response);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export function setNewPassword(token, password) {
  return new Promise(async resolve => {
    try {
      const response = await resetPassword(token, password);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
