import { takeLatest, put, all, call } from 'redux-saga/effects';
import { processError } from 'state/utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        const storage = localStorage.getItem("auth");
        const parsedAuth = JSON.parse(storage);
        const { email } = parsedAuth;
        const res = yield fetch(process.env.PUBLIC_URL + '/data/users.json');
        const users = yield res.json();
        const auth = users[email];
        yield put({ type: Types.FETCH_SUCCESS, payload: auth });
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
