import UserTeleAPI from '@api/userTele';

import { getAccessToken, setAccessTeleToken } from '@utils/asyncStorage';

export function loginTele() {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = await getAccessToken();
      const response = await UserTeleAPI.loginWithToken({ jwtToken: id });
      await setAccessTeleToken(response);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
