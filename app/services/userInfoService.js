import { UserInfosAPI } from '@api';

export function checkUserDetail(patientId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserInfosAPI.checkUserDetail({
        patientId: patientId,
      });
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}

export function fetchUserInfoByPatientId(patientId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserInfosAPI.fetchUserInfoByPatientId({
        patientId: patientId,
      });
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}
