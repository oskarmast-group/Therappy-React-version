import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    uploadStart = (file) => this.dispatch({ type: Types.UPLOAD_START, payload: file });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}