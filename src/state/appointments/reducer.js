import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
  list: [],
  pendingList: [],
  upcomingList: [],
  reservation: {},
  appointment: {},
  serverTime: null,
  fetching: { state: false, config: {} },
  confirmed: false,
  error: { ...DEFAULT_NO_ERROR },
};

const reducer = (state = INITIAL_STATE, action) => {
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

    case Types.FETCH_UPCOMING_START:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE, state: true } };
    case Types.FETCH_UPCOMING_SUCCESS:
      return { ...state, upcomingList: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.FETCH_UPCOMING_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.FETCH_ONE_START:
      return { ...state, fetching: { config: { key: 'fetchOne' }, state: true } };
    case Types.FETCH_ONE_SUCCESS:
      return { ...state, appointment: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.FETCH_ONE_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.GET_SERVER_TIME_START:
      return { ...state, fetching: { config: { key: 'serverTime' }, state: true } };
    case Types.GET_SERVER_TIME_SUCCESS:
      return { ...state, serverTime: action.payload, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.GET_SERVER_TIME_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.CANCEL_START:
      return { ...state, fetching: { config: { key: 'cancel' }, state: true } };
    case Types.CANCEL_SUCCESS:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.CANCEL_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.REJECT_START:
      return { ...state, fetching: { config: { key: 'reject' }, state: true } };
    case Types.REJECT_SUCCESS:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { ...DEFAULT_NO_ERROR } };
    case Types.REJECT_ERROR:
      return { ...state, fetching: { ...DEFAULT_FETCHING_STATE }, error: { timestamp: Date.now(), message: action.payload } };

    case Types.CLEAR_CURRENT: return { ...state, appointment: {}, };

    case Types.RESET_ERROR: return { ...state, error: { ...DEFAULT_NO_ERROR } };

    default:
      return state;
  }
};
 export default reducer;