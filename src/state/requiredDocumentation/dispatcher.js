import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    uploadStart = (data) => this.dispatch({ type: Types.UPLOAD_START, payload: data });

    deleteStart = (data) => this.dispatch({ type: Types.DELETE_START, payload: data });

    updateStart = (data) => this.dispatch({ type: Types.UPDATE_START, payload: data });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}