import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    fetchProfileStart = (therapistId) => this.dispatch({ type: Types.FETCH_PROFILE_START, payload: therapistId });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}