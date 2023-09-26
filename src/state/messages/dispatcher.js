import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    sendMessageStart = (payload) => this.dispatch({ type: Types.SEND_MESSAGE_START, payload });

    addMessage = (payload) => this.dispatch({ type: Types.ADD_MESSAGE, payload });

    clearChat = () => this.dispatch({ type: Types.CLEAR_CHAT, payload: {} });

    setExtraMessagesToFetch = (payload) => this.dispatch({ type: Types.SET_EXTRA_MESSAGES_TO_FETCH, payload });

    markAsReadStart = (payload) => this.dispatch({ type: Types.MARK_AS_READ_START, payload });

    clearReadList = () => this.dispatch({ type: Types.CLEAR_READ_LIST, payload: {} });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}