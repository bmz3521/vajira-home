import { BookingConstants } from '@constants';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BookingConstants.CREATE_BOOKING_REQUEST:
      return {
        data: null,
        loading: true,
        error: null,
      };
    case BookingConstants.CREATE_BOOKING_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case BookingConstants.CREATE_BOOKING_SUCCESS:
      return {
        data: action.result,
        loading: false,
      };

    case BookingConstants.GET_BOOKING_REQUEST:
      return {
        data: null,
        loading: true,
        error: null,
      };
    case BookingConstants.GET_BOOKING_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case BookingConstants.GET_BOOKING_SUCCESS:
      return {
        data: action.result,
        loading: false,
      };

    default:
      return state;
  }
};
