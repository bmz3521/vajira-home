/*
 *
 * Booking actions
 *
 */

import { BookingsConstants } from '@constants';

/* GET BOOKINGS */
export function getBookings(data) {
  return {
    type: BookingsConstants.GET_BOOKINGS_REQUEST,
    data,
  };
}

export function getDoctorBookings() {
  return {
    type: BookingsConstants.GET_DOCTOR_BOOKINGS_REQUEST,
  };
}

export function getBookingsSuccess(result) {
  return {
    type: BookingsConstants.GET_BOOKINGS_SUCCESS,
    result,
  };
}
export function getBookingsFailure(error) {
  return {
    type: BookingsConstants.GET_BOOKINGS_FAILURE,
    error,
  };
}
