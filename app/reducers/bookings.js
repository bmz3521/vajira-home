import { BookingsConstants } from '@constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BookingsConstants.GET_BOOKINGS_REQUEST:
      return {
        data: [],
        loading: true,
        error: null,
      };
    case BookingsConstants.GET_DOCTOR_BOOKINGS_REQUEST:
      return {
        data: action.result,
        loading: true,
        error: null,
      };
    case BookingsConstants.GET_BOOKINGS_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case BookingsConstants.GET_BOOKINGS_SUCCESS:
      return {
        data: action.result,
        loading: false,
      };
    default:
      return state;
  }
};
