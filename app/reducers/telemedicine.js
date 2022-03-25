import { TelemedicineConstants } from '@constants';

const initialState = {
  data: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TelemedicineConstants.SET_TELEMEDICINE:
      return {
        ...state,
        data: { ...state.data, ...action.data },
      };
    default:
      return state;
  }
};
