import { PromotionsConstants } from '@constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PromotionsConstants.GET_PROMOTIONS_REQUEST:
      return {
        data: [],
        loading: true,
        error: null,
      };
    case PromotionsConstants.GET_PROMOTIONS_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case PromotionsConstants.GET_PROMOTIONS_SUCCESS:
      return {
        data: action.result,
        loading: false,
      };
    default:
      return state;
  }
};
