/*
 *
 * Chat actions
 *
 */

import { ChatConstants } from '@constants';
  
/* CREATE CHAT */
export function createChat(data) {
    return {
        type: ChatConstants.CREATE_CHAT_REQUEST,
        data,
    };
}
export function createChatSuccess(result) {
    return {
        type: ChatConstants.CREATE_CHAT_SUCCESS,
        result,
    };
}
export function createChatFailure(error) {
    return {
        type: ChatConstants.CREATE_CHAT_FAILURE,
        error,
    };
}
