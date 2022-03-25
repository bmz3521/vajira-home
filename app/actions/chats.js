/*
 *
 * Chats actions
 *
 */

import { ChatsConstants } from '@constants';

/* GET CHATS */
export function getChats(data) {
    return {
        type: ChatsConstants.GET_CHATS_REQUEST,
        data,
    };
}
export function getChatsSuccess(result) {
    return {
        type: ChatsConstants.GET_CHATS_SUCCESS,
        result,
    };
}
export function getChatsFailure(error) {
    return {
        type: ChatsConstants.GET_CHATS_FAILURE,
        error,
    };
}
