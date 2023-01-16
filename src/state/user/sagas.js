import { takeLatest, put, all, call } from 'redux-saga/effects';
import { profileAPI, stripeClientsAPI, therapistAPI } from 'resources/api';
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
        yield put({ type: Types.UPDATE_SUCCESS, payload: newProfile });
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

function* setupIntentStartAsync() {
    try {
        const res = yield stripeClientsAPI.setupIntent();
        yield put({ type: Types.SETUP_INTENT_SUCCESS, payload: res });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.SETUP_INTENT_ERROR, payload: message });
    }
}

function* setupIntentStart() {
    yield takeLatest(Types.SETUP_INTENT_START, setupIntentStartAsync)
}

function* fetchPaymentMethodsStartAsync() {
    try {
        const res = yield stripeClientsAPI.paymentMethods();
        yield put({ type: Types.FETCH_PAYMENT_METHODS_SUCCESS, payload: res.methods });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.FETCH_PAYMENT_METHODS_ERROR, payload: message });
    }
}

function* fetchPaymentMethodsStart() {
    yield takeLatest(Types.FETCH_PAYMENT_METHODS_START, fetchPaymentMethodsStartAsync)
}

function* updateTherapistStartAsync({ payload }) {
    try {
        const { key, value } = payload;
        yield therapistAPI.update({[key]: value});
        const newProfile = yield profileAPI.profile();
        yield put({ type: Types.UPDATE_SUCCESS, payload: newProfile });
    } catch (error) {
        const message = processError(error);
        console.error(message);
        yield put({ type: Types.UPDATE_ERROR, payload: message });
    }
}

function* updateTherapistStart() {
    yield takeLatest(Types.UPDATE_THERAPIST_START, updateTherapistStartAsync);
}

export default function* sagas() {
    yield all([
        call(fetchStart),
        call(updateImageStart),
        call(updateStart),
        call(updateSuccess),
        call(setupIntentStart),
        call(fetchPaymentMethodsStart),
        call(updateTherapistStart),
    ]);
}
