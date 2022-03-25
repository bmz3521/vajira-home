import { ChatConstants } from "@constants";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ChatConstants.CREATE_CHAT_REQUEST:
            return {
                data: null,
                loading: true,
                error: null,
            };
        case ChatConstants.CREATE_CHAT_FAILURE:
            return {
                loading: false,
                error: action.error,
            };
        case ChatConstants.CREATE_CHAT_SUCCESS:
            return {
                data: action.result,
                loading: false,
            };
        default:
            return state;
    }
};
