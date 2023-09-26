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
        const { appointmentId, roomId } = payload;
        const res = yield appointmentsAPI.accept({ appointmentId });
        yield put({ type: Types.ACCEPT_SUCCESS, payload: res });

        if(roomId) {
            yield put({ type: Types.FETCH_ONE_START, payload: roomId });
        } else {
            yield put({ type: Types.FETCH_PENDING_START, payload: {} });
        }
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

function* getServerTimeStartAsync() {
    try {
        const res = yield appointmentsAPI.serverTime();
        yield put({ type: Types.GET_SERVER_TIME_SUCCESS, payload: res.now });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.GET_SERVER_TIME_ERROR, payload: message });
    }
}

function* getServerTimeStart() {
    yield takeLatest(Types.GET_SERVER_TIME_START, getServerTimeStartAsync);
}

function* cancelStartAsync({ payload }) {
    try {
        yield appointmentsAPI.cancel(payload);
        yield put({ type: Types.CANCEL_SUCCESS, payload: {} });
        yield put({ type: Types.FETCH_ONE_START, payload: payload.roomId });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.CANCEL_ERROR, payload: message });
    }
}

function* cancelStart() {
  yield takeLatest(Types.CANCEL_START, cancelStartAsync);
}

function* rejectStartAsync({ payload }) {
    try {
        const { appointmentId, roomId } = payload;
        const res = yield appointmentsAPI.reject({ appointmentId });
        yield put({ type: Types.REJECT_SUCCESS, payload: res });

        if(roomId) {
            yield put({ type: Types.FETCH_ONE_START, payload: roomId });
        } else {
            yield put({ type: Types.FETCH_PENDING_START, payload: {} });
        }
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.REJECT_ERROR, payload: message });
    }
}

function* rejectStart() {
  yield takeLatest(Types.REJECT_START, rejectStartAsync);
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
        call(getServerTimeStart),
        call(cancelStart),
        call(rejectStart),
    ]);
}
