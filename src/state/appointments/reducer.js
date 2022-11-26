import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
  list: [],
  pendingList: [],
  reservation: {},
  fetching: { state: false, config: {} },
  confirmed: false,
  error: { ...DEFAULT_NO_ERROR },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_START:
    case Types.RESERVE_START:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE, state: true } };
    case Types.FETCH_SUCCESS:
      return { ...state, list: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.FETCH_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };
    
    case Types.RESERVE_SUCCESS:
      return { ...state, reservation: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.RESERVE_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.CONFIRM_START:
      return { ...state, fetching: { config: { key: 'confirm' }, state: true } };
    case Types.CONFIRM_SUCCESS:
      return { ...state, confirmed: true, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.CONFIRM_ERROR:
      return { ...state, confirmed: false, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.ACCEPT_START:
      return { ...state, fetching: { config: { key: 'accept' }, state: true } };
    case Types.ACCEPT_SUCCESS:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.ACCEPT_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.FETCH_PENDING_START:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE, state: true } };
    case Types.FETCH_PENDING_SUCCESS:
      return { ...state, pendingList: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.FETCH_PENDING_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.RESET_ERROR: return { ...state, error: { ...DEFAULT_NO_ERROR } }

    default:
      return state;
  }
};
