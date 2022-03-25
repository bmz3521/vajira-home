import { ChatsConstants } from "@constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ChatsConstants.GET_CHATS_REQUEST:
            return {
                data: [],
                loading: true,
                error: null,
            };
        case ChatsConstants.GET_CHATS_FAILURE:
            return {
                loading: false,
                error: action.error,
            };
        case ChatsConstants.GET_CHATS_SUCCESS:
            return {
                data: action.result,
                loading: false,
            };
        default:
            return state;
    }
};
