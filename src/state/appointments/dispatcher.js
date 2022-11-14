import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    reserveStart = (payload) => this.dispatch({ type: Types.RESERVE_START, payload });

    confirmStart = (payload) => this.dispatch({ type: Types.CONFIRM_START, payload });
    
    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}