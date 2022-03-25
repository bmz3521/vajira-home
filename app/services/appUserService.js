import { AppUserAPI } from '@api';

export function getAppUserIdentity(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AppUserAPI.fetchAppUserIdentity({ id: id });
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
