import { all, call } from 'redux-saga/effects';
import user from './user/sagas';
import therapists from './therapists/sagas';
import categories from './categories/sagas';
import appointments from './appointments/sagas';
import conversations from './conversations/sagas';
import messages from './messages/sagas';
import requiredDocumentation from './requiredDocumentation/sagas';

export default function* rootSaga() {
  yield all([
    call(user),
    call(therapists),
    call(categories),
    call(appointments),
    call(conversations),
    call(messages),
    call(requiredDocumentation),
  ]);
}
