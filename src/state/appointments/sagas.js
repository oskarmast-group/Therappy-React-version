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

function* fetchPendingStartAsync() {
    try {
        const res = yield appointmentsAPI.getPending();
        yield put({ type: Types.FETCH_PENDING_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_PENDING_ERROR, payload: message });
    }
}

function* fetchPendingStart() {
  yield takeLatest(Types.FETCH_PENDING_START, fetchPendingStartAsync);
}

function* acceptStartAsync({ payload }) {
    try {
        const res = yield appointmentsAPI.accept(payload);
        yield put({ type: Types.ACCEPT_SUCCESS, payload: res });
        yield put({ type: Types.FETCH_PENDING_START, payload: {} });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.ACCEPT_ERROR, payload: message });
    }
}

function* acceptStart() {
  yield takeLatest(Types.ACCEPT_START, acceptStartAsync);
}

function* fetchOneStartAsync({ payload }) {
    try {
        const res = yield appointmentsAPI.view(payload);
        yield put({ type: Types.FETCH_ONE_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_ONE_ERROR, payload: message });
    }
}

function* fetchOneStart() {
  yield takeLatest(Types.FETCH_ONE_START, fetchOneStartAsync);
}

function* fetchUpcomingStartAsync() {
    try {
        const res = yield appointmentsAPI.getUpcoming();
        yield put({ type: Types.FETCH_UPCOMING_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_UPCOMING_ERROR, payload: message });
    }
}

function* fetchUpcomingStart() {
  yield takeLatest(Types.FETCH_UPCOMING_START, fetchUpcomingStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(reserveStart),
        call(confirmStart),
        call(fetchPendingStart),
        call(acceptStart),
        call(fetchOneStart),
        call(fetchUpcomingStart),
    ]);
}
