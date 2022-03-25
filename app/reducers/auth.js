import { AuthConstants } from '@constants';

const initialState = {
  isAuthenticated: null,
  loading: false,
  error: null,
  data: null,
  typeUser: 'USER',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthConstants.LOGIN_REQUEST:
      return {
        isAuthenticated: null,
        loading: true,
        error: null,
      };
    case AuthConstants.LOGIN_FAILURE:
      return {
        loading: false,
        error: action,
      };
    case AuthConstants.REGISTER_SUCCESS:
      return {
        // isAuthenticated: true,
        data: action.data,
        loading: false,
      };
    case AuthConstants.REGISTER_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case AuthConstants.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        data: action.data,
        loading: false,
        typeUser: action.typeUser,
      };

    case AuthConstants.LOGOUT_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case AuthConstants.LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        data: '',
        loading: false,
      };

    case AuthConstants.IS_AUTH_REQUEST:
      return {
        isAuthenticated: null,
        loading: true,
      };
    case AuthConstants.IS_AUTH_SUCCESS:
      return {
        isAuthenticated: action.result,
        loading: false,
      };

    case AuthConstants.THIRD_PARTY_LOGIN_REQUEST:
      return {
        isAuthenticated: null,
        loading: true,
        error: null,
      };
    case AuthConstants.THIRD_PARTY_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case AuthConstants.THIRD_PARTY_LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};
