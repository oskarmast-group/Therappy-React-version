import { takeLatest, put, all, call } from 'redux-saga/effects';
import { therapistAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        const res = yield therapistAPI.getAll()
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

function* fetchProfileStartAsync({ payload }) {
    try {
        const res = yield therapistAPI.getOne(payload)
        yield put({ type: Types.FETCH_PROFILE_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_PROFILE_ERROR, payload: message });
    }
}

function* fetchProfileStart() {
  yield takeLatest(Types.FETCH_PROFILE_START, fetchProfileStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(fetchProfileStart),
    ]);
}
