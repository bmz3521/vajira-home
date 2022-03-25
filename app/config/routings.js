/*
 *
 * default routings
 *
 */

export const LANDING_PATH = '/';
export const CLINIC_FILTER_PATH = '/s';
export const CLINIC_PROFILE_PATH = clinicSlug => path(['mc', clinicSlug]);
export const CLINIC_BOOKING_PATH = clinicSlug =>
  path(['mc', clinicSlug, 'quotation']);
export const CLINIC_CHAT_PATH = bookingId =>
  path(['bookings', bookingId, 'chat']);
export const CLINIC_BOOKING_RECRIPT_PATH = bookingId =>
  path(['bookings', bookingId, 'recript']);
export const CLINIC_BOOKING_COMFIRMATION_PATH = bookingId =>
  path(['bookings', bookingId]);

const path = paths => `/${paths.filter(p => p).join('/')}`;
