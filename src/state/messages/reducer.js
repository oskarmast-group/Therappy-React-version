import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
    list: [],
    markedAsRead: [],
    fetching: {
        fetch: { ...DEFAULT_FETCHING_STATE },
        fetchOne: { ...DEFAULT_FETCHING_STATE },
        markRead: { ...DEFAULT_FETCHING_STATE },
    },
    extraMessagesToFetch: 0,
    error: { ...DEFAULT_NO_ERROR },
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // FETCH
        case Types.FETCH_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    fetch: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.FETCH_SUCCESS:
            return {
                ...state,
                list: action.payload,
                fetching: {
                    ...state.fetching,
                    fetch: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.FETCH_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    fetch: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };

        // SEND MESSAGE
        case Types.SEND_MESSAGE_START:
            return {
                ...state,
                list: [...state.list, action.payload],
                fetching: {
                    ...state.fetching,
                    fetchOne: {
                        config: { id: action.payload.uuid },
                        state: true,
                    },
                },
            };
        case Types.SEND_MESSAGE_SUCCESS: {
            const newList = [...state.list];
            const message = newList.find(
                (msg) => msg.uuid === action.payload.uuid
            );
            const index = newList.indexOf(message);
            newList[index] = action.payload;
            return {
                ...state,
                list: newList,
                fetching: {
                    ...state.fetching,
                    fetchOne: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        }
        case Types.SEND_MESSAGE_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    fetchOne: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };
            
        case Types.ADD_MESSAGE:
            return {
                ...state,
                list: [...state.list, action.payload]
            };

        case Types.CLEAR_CHAT:
            return { ...state, list: [] };

        case Types.SET_EXTRA_MESSAGES_TO_FETCH:
            return {
                ...state,
                extraMessagesToFetch: action.payload,
            };

        // MARK AS READ
        case Types.MARK_AS_READ_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    markRead: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.MARK_AS_READ_SUCCESS:
            return {
                ...state,
                markedAsRead: [...state.markedAsRead, ...action.payload],
                fetching: {
                    ...state.fetching,
                    markRead: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.MARK_AS_READ_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    markRead: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };

        case Types.CLEAR_READ_LIST:
            return { ...state, markedAsRead: [], error: { ...DEFAULT_NO_ERROR } };

        case Types.RESET_ERROR:
            return { ...state, error: { ...DEFAULT_NO_ERROR } };

        default:
            return state;
    }
};

export default reducer;