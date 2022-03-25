import { CommunicationAPI } from '@api';

export function getTwilioToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await CommunicationAPI.fetchTwilioToken();
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}
