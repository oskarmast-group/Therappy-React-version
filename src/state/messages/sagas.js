import { takeLatest, put, all, call, takeEvery, select } from 'redux-saga/effects';
import { messagesAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';
import conversationSelector from '../conversations/selector';
import  messagesSelector from './selector';
import  userSelector from '../user/selector';

function* fetchStartAsync() {
    try {
        const conversationState = yield select(conversationSelector);
        const messagesState = yield select(messagesSelector);
        const res = yield messagesAPI.view(conversationState.conversation.uuid, messagesState.extraMessagesToFetch);
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

function* markAsReadStartAsync() {
    try {
        const messagesState = yield select(messagesSelector);
        const userState = yield select(userSelector);
        const toMark = messagesState.list.filter((msg)=>userState.current.id !== msg.from.id && !msg.readTimestamp).map(({uuid})=>uuid);

        const alreadyMarked = new Set(messagesState.markedAsRead);
        console.log({ list: messagesState.list, toMark, alreadyMarked});
        let messages = [];
        for(const msg of toMark) {
            if(!alreadyMarked.has(msg)) {
                messages.push(msg);
            }
        }
        if(messages.length > 0) yield messagesAPI.markAsRead({ messages });
        yield put({ type: Types.MARK_AS_READ_SUCCESS, payload: messages });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.MARK_AS_READ_ERROR, payload: message });
    }
}

function* markAsReadStart() {
  yield takeLatest(Types.MARK_AS_READ_START, markAsReadStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(sendMessageStart),
        call(markAsReadStart),
    ]);
}
