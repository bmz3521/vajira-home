import { UserTeleConstants, AuthConstants } from '@constants';

const initialState = {
  dataTele: null,
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UserTeleConstants.GET_USER_TELE_REQUEST:
      return {
        dataTele: null,
        loading: true,
        error: null,
      };
    case UserTeleConstants.GET_USER_TELE_SUCCESS:
      return {
        dataTele: action.result,
        loading: false,
      };
    case UserTeleConstants.GET_USER_TELE_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case UserTeleConstants.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
