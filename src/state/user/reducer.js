import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from 'state/constants';
import Types from './types';

const INITIAL_STATE = {
    current: {},
    setupIntentToken: null,
    paymentMethods: [],
    fetching: {
        fetch: { ...DEFAULT_FETCHING_STATE },
        update: { ...DEFAULT_FETCHING_STATE },
        setup: { ...DEFAULT_FETCHING_STATE },
        deletePaymentMethod: { ...DEFAULT_FETCHING_STATE },
        paymentMethods: { ...DEFAULT_FETCHING_STATE },
        acceptInvitation: { ...DEFAULT_FETCHING_STATE },
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
                current: action.payload,
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

        // UPDATE
        case Types.UPDATE_START:
        case Types.UPDATE_THERAPIST_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    update: {
                        config: { key: action.payload.key },
                        state: true,
                    },
                },
            };
        case Types.UPDATE_IMAGE_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    update: { config: { key: 'image' }, state: true },
                },
            };
        case Types.UPDATE_SUCCESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    update: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.UPDATE_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    update: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };

        // SETUP INTENT
        case Types.SETUP_INTENT_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    setup: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.SETUP_INTENT_SUCCESS:
            return {
                ...state,
                setupIntentToken: action.payload,
                fetching: {
                    ...state.fetching,
                    setup: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.SETUP_INTENT_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    setup: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };

        // DELETE PAYMENT METHOD
        case Types.DELETE_PAYMENT_METHOD_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    deletePaymentMethod: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.DELETE_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    deletePaymentMethod: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.DELETE_PAYMENT_METHOD_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    deletePaymentMethod: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };


        // PAYMENT METHODS
        case Types.FETCH_PAYMENT_METHODS_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    paymentMethods: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.FETCH_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethods: action.payload,
                fetching: {
                    ...state.fetching,
                    paymentMethods: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.FETCH_PAYMENT_METHODS_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    paymentMethods: { ...DEFAULT_FETCHING_STATE },
                },
                error: { timestamp: Date.now(), message: action.payload },
            };
            
        // ACCEPT INVITATION
        case Types.ACCEPT_INVITATION_START:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    acceptInvitation: { ...DEFAULT_FETCHING_STATE, state: true },
                },
            };
        case Types.ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    acceptInvitation: { ...DEFAULT_FETCHING_STATE },
                },
                error: { ...DEFAULT_NO_ERROR },
            };
        case Types.ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    acceptInvitation: { ...DEFAULT_FETCHING_STATE },
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