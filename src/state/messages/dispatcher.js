import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    sendMessageStart = (payload) => this.dispatch({ type: Types.SEND_MESSAGE_START, payload });

    addMessage = (payload) => this.dispatch({ type: Types.ADD_MESSAGE, payload });

    clearChat = () => this.dispatch({ type: Types.CLEAR_CHAT, payload: {} });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}