import { takeLatest, put, all, call } from 'redux-saga/effects';
import { documentationAPI, requiredDocumentationAPI } from 'resources/api';
import { processError } from 'state/utils';
import Types from './types';
import UserTypes from '../user/types';
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
        const res = yield documentationAPI.uploadDocument(form);
        yield put({ type: Types.UPLOAD_SUCCESS, payload: res });
        yield put({ type: UserTypes.ADD_DOCUMENTATION, payload: res.data });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPLOAD_ERROR, payload: message });
    }
}

function* uploadStart() {
  yield takeLatest(Types.UPLOAD_START, uploadStartAsync);
}

function* updateStartAsync({ payload }) {
    try {
        const form = toFormData(payload);
        const res = yield documentationAPI.uploadDocument(form);
        yield put({ type: Types.UPDATE_SUCCESS, payload: res });
        yield put({ type: UserTypes.UPDATE_DOCUMENTATION, payload: { uuid: payload.uuid, newDocument: res.data} });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPDATE_ERROR, payload: message });
    }
}

function* updateStart() {
  yield takeLatest(Types.UPDATE_START, updateStartAsync);
}

function* deleteStartAsync({ payload }) {
    try {
        const res = yield documentationAPI.deleteDocument(payload);
        yield put({ type: Types.DELETE_SUCCESS, payload: res });
        yield put({ type: UserTypes.DELETE_DOCUMENTATION, payload });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.DELETE_ERROR, payload: message });
    }
}

function* deleteStart() {
  yield takeLatest(Types.DELETE_START, deleteStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(uploadStart),
        call(updateStart),
        call(deleteStart),
    ]);
}
