import { takeLatest, put, all, call } from 'redux-saga/effects';
import { processError } from 'state/utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        console.log('res');
        const res = yield fetch(process.env.PUBLIC_URL + '/data/categories.json');
        console.log(res);
        const users = yield res.json();
        const categories = Object.values(users);
        yield put({ type: Types.FETCH_SUCCESS, payload: categories });
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
