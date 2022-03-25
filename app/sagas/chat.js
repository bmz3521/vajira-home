import { takeLatest, put, call } from 'redux-saga/effects';
import { BookingAPI } from '@api';
import { ChatActions } from '@actions';
import { ChatConstants } from '@constants';

function* createChat({ data }) {
    try {
        const result = yield call(BookingAPI.createConversation, data);
        yield put(ChatActions.createChatSuccess(result));
    } catch (e) {
        yield put(ChatActions.createChatFailure(e));
    }
}

// Individual exports for testing
export default function* watchChatSaga() {
    // Take Last Action Only
    yield takeLatest(ChatConstants.CREATE_CHAT_REQUEST, createChat);
};