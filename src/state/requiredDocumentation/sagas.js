import { takeLatest, put, all, call } from 'redux-saga/effects';
import { requiredDocumentationAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';
import { toFormData } from 'utils';

function* fetchStartAsync() {
    try {
        const res = yield requiredDocumentationAPI.getAll();
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

function* uploadStartAsync({ payload }) {
    try {
        const form = toFormData(payload);
        const res = yield requiredDocumentationAPI.uploadDocument(form);
        yield put({ type: Types.UPLOAD_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPLOAD_ERROR, payload: message });
    }
}

function* uploadStart() {
  yield takeLatest(Types.UPLOAD_START, uploadStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
    ]);
}
