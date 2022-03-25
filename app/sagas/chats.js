import { takeLatest, put, call } from 'redux-saga/effects';
import { BookingAPI } from '@api';
import { ChatsActions } from '@actions';
import { ChatsConstants } from '@constants';

function* getChats({ data }) {
    try {
        const result = yield call(BookingAPI.getConversation, data);
        yield put(ChatsActions.getChatsSuccess(result));
    } catch (e) {
        yield put(ChatsActions.getChatsFailure(e));
    }
}

// Individual exports for testing
export default function* watchChatsSaga() {
    // Take Last Action Only
    yield takeLatest(ChatsConstants.GET_CHATS_REQUEST, getChats);
};