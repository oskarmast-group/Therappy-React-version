import { takeLatest, put, all, call } from 'redux-saga/effects';
import { profileAPI } from 'resources/api';
import { processError } from 'state/utils';
import { toFormData } from 'utils';
import Types from './types';

function* fetchStartAsync() {
    try {
        const res = yield profileAPI.profile();
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

function* updateImageStartAsync({ payload }) {
    try {
        const form = toFormData({profile: payload});
        yield profileAPI.updateImage(form);
        const newProfile = yield profileAPI.profile();
        yield put({ type: Types.FETCH_SUCCESS, payload: newProfile });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPDATE_ERROR, payload: message });
    }
}

function* updateImageStart() {
    yield takeLatest(Types.UPDATE_IMAGE_START, updateImageStartAsync);
}

function* updateStartAsync({ payload }) {
    try {
        const { key, value } = payload;
        yield profileAPI.update({[key]: value});
        const newProfile = yield profileAPI.profile();
        yield put({ type: Types.FETCH_SUCCESS, payload: newProfile });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPDATE_ERROR, payload: message });
    }
}

function* updateStart() {
    yield takeLatest(Types.UPDATE_START, updateStartAsync);
}

function* updateSuccess() {
    yield takeLatest(Types.UPDATE_SUCCESS, fetchStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(updateImageStart),
        call(updateStart),
        call(updateSuccess),
    ]);
}
