import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from "state/constants";
import Types from "./types";

const INITIAL_STATE = {
    list: [],
    conversation: {},
    fetching: {
        fetch: { ...DEFAULT_FETCHING_STATE },
        fetchOne: { ...DEFAULT_FETCHING_STATE },
    },
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

        // FETCH ONE
        case Types.FETCH_ONE_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    fetchOne: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.FETCH_ONE_SUCCESS:
            return {
                ...state,
                conversation: action.payload,
                fetching: {
                    ...state.fetching,
                    fetchOne: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.FETCH_ONE_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    fetchOne: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };
        case Types.CLEAR_CONVERSATION:
            return { ...state, conversation: {}, error: { ...DEFAULT_NO_ERROR } };

        case Types.ADD_LAST_MESSAGE: {
            const list = state.list;
            
            const conversation = list.find(({ uuid }) => uuid === action.payload.conversationUUID);
            console.log({ conversation })
            if(!conversation) return state;

            const index = list.indexOf(conversation);
            if(index < 0) return state;

            list[index] = { ...conversation, lastMessage: action.payload,  unreadMessagesCount: (conversation.unreadMessagesCount ?? 0) + 1}

            return { ...state, list: [...list], error: { ...DEFAULT_NO_ERROR } };
        }

        case Types.RESET_ERROR:
            return { ...state, error: { ...DEFAULT_NO_ERROR } };

        default:
            return state;
    }
};

export default reducer;
