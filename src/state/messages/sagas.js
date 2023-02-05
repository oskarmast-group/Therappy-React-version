import { takeLatest, put, all, call, takeEvery, select } from 'redux-saga/effects';
import { messagesAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';
import conversationSelector from '../conversations/selector';

function* fetchStartAsync() {
    try {
        const conversationState = yield select(conversationSelector);
        const res = yield messagesAPI.view(conversationState.conversation.uuid);
        yield put({ type: Types.FETCH_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_ERROR, payload: message });
    }
}

function* fetchStart() {
  yield takeLatest(Types.FETCH_START, fetchStartAsync);
}


function* sendMessageStartAsync({ payload }) {
    try {
        const conversationState = yield select(conversationSelector);
        const res = yield messagesAPI.send({...payload}, conversationState.conversation.uuid);
        yield put({ type: Types.SEND_MESSAGE_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.SEND_MESSAGE_ERROR, payload: message });
    }
}

function* sendMessageStart() {
  yield takeEvery(Types.SEND_MESSAGE_START, sendMessageStartAsync);
}


export default function* sagas() {
    yield all([
        call(fetchStart),
        call(sendMessageStart),
    ]);
}
