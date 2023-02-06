import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
    list: [],
    fetching: {
        fetch: { ...DEFAULT_FETCHING_STATE },
        fetchOne: { ...DEFAULT_FETCHING_STATE },
    },
    error: { ...DEFAULT_NO_ERROR },
};

export default (state = INITIAL_STATE, action) => {
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
                    fetchOne: { config: { id: action.payload.uuid },  state: true },
                },
            };
        case Types.SEND_MESSAGE_SUCCESS: {
            const newList = [...state.list];
            const message = newList.find((msg) => msg.uuid === action.payload.uuid);
            console.log('message', message);
            const index = newList.indexOf(message);
            newList[index] = action.payload;
            console.log('newList', newList);
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
        case Types.RESET_ERROR:
            return { ...state, error: { ...DEFAULT_NO_ERROR } };

        default:
            return state;
    }
};
