import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from "state/constants";
import Types from "./types";

const INITIAL_STATE = {
    list: [],
    fetching: {
        fetch: { ...DEFAULT_FETCHING_STATE },
        upload: { ...DEFAULT_FETCHING_STATE },
    },
    error: { ...DEFAULT_NO_ERROR },
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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

        case Types.UPLOAD_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    upload: {
                        config: { key: action.payload.uuid, name: action.payload.name },
                        state: true,
                    },
                },
            };
        case Types.UPLOAD_SUCCESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    upload: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.UPLOAD_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    upload: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };

        case Types.RESET_ERROR:
            return { ...state, error: { ...DEFAULT_NO_ERROR } };

        default:
            return state;
    }
};

export default reducer;
