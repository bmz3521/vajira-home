import { UserConstants } from '@constants';

const initialState = {
  data: null,
  dataOMA: null,
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UserConstants.GET_USER_REQUEST:
      return {
        data: null,
        loading: true,
        error: null,
      };
    case UserConstants.GET_USER_FAILURE:
      return {
        loading: false,
        error: action.error,
        data: null,
      };
    case UserConstants.GET_USER_SUCCESS:
      return {
        data: action.result,
        loading: false,
      };
    case UserConstants.GET_UPDATE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.GET_UPDATE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          userInformation: action.result,
        },
      };
    case UserConstants.GET_UPDATE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UserConstants.LOGOUT_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case UserConstants.LOGOUT_SUCCESS:
      return {
        data: null,
        dataTele: '',
        loading: false,
      };

    default:
      return state;
  }
};
