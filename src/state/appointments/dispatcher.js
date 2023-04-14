import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    fetchPendingStart = () => this.dispatch({ type: Types.FETCH_PENDING_START, payload: {} });

    fetchUpcomingStart = () => this.dispatch({ type: Types.FETCH_UPCOMING_START, payload: {} });

    acceptStart = (payload) => this.dispatch({ type: Types.ACCEPT_START, payload });

    reserveStart = (payload) => this.dispatch({ type: Types.RESERVE_START, payload });

    confirmStart = (payload) => this.dispatch({ type: Types.CONFIRM_START, payload });

    fetchOneStart = (payload) => this.dispatch({ type: Types.FETCH_ONE_START, payload });
    
    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}