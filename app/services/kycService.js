import { KycPatientImageAPI } from '@api';

export function getKycPatientImages(patientId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await KycPatientImageAPI.getKycPatientImages({
        patientId: patientId,
      });
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}
