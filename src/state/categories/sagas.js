import { takeLatest, put, all, call } from 'redux-saga/effects';
import { categoriesAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        const res = yield categoriesAPI.getAll();
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

export default function* sagas() {
    yield all([
        call(fetchStart),
    ]);
}
