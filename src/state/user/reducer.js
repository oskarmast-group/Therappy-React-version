import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
  user: {},
  fetching: { state: false, config: {} },
  error: { ...DEFAULT_NO_ERROR },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_START:
    case Types.UPDATE_START:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE, state: true } };

    case Types.UPDATE_IMAGE_START:
      return { ...state, fetching: { config: { key: 'image' }, state: true } };

    case Types.FETCH_SUCCESS:
      return { ...state, user: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.UPDATE_SUCCESS:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };

    case Types.FETCH_ERROR:
    case Types.UPDATE_ERROR:
    case Types.FETCH_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.RESET_ERROR: return { ...state, error: { ...DEFAULT_NO_ERROR } }

    default:
      return state;
  }
};
