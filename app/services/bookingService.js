import { BookingAPI } from '@api';

export function getDoctorBookings() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await BookingAPI.fetchDoctorBooking();
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}
