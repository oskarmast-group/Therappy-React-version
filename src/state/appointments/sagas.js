import { takeLatest, put, all, call } from 'redux-saga/effects';
import { appointmentsAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        const res = yield appointmentsAPI.getAll();
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

function* reserveStartAsync({ payload }) {
    try {
        const res = yield appointmentsAPI.reserve(payload);
        yield put({ type: Types.RESERVE_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.RESERVE_ERROR, payload: message });
    }
}

function* reserveStart() {
  yield takeLatest(Types.RESERVE_START, reserveStartAsync);
}

function* confirmStartAsync({ payload }) {
    try {
        const res = yield appointmentsAPI.confirm(payload);
        yield put({ type: Types.CONFIRM_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.CONFIRM_ERROR, payload: message });
    }
}

function* confirmStart() {
  yield takeLatest(Types.CONFIRM_START, confirmStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(reserveStart),
        call(confirmStart),
    ]);
}
