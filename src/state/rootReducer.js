import { combineReducers } from 'redux';
import user from './user/reducer';
import therapists from './therapists/reducer';
import categories from './categories/reducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  user,
  therapists,
  categories,
  router: connectRouter(history),
});

export default rootReducer;