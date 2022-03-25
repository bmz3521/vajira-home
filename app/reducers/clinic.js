import { ClinicConstants } from "@constants";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ClinicConstants.GET_CLINIC_REQUEST:
            return {
                data: null,
                loading: true,
                error: null,
            };
        case ClinicConstants.GET_CLINIC_FAILURE:
            return {
                loading: false,
                error: action.error,
            };
        case ClinicConstants.GET_CLINIC_SUCCESS:
            return {
                data: action.result,
                loading: false,
            };
        default:
            return state;
    }
};
