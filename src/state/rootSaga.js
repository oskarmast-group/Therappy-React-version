import { all, call } from 'redux-saga/effects';
import user from './user/sagas';
import therapists from './therapists/sagas';
import categories from './categories/sagas';

export default function* rootSaga() {
  yield all([
    call(user),
    call(therapists),
    call(categories),
  ]);
}
