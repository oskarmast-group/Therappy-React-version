import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    fetchOneStart = (payload) => this.dispatch({ type: Types.FETCH_ONE_START, payload });

    clearConversation = () => this.dispatch({ type: Types.CLEAR_CONVERSATION, payload: {} });

    addLastMessage = (payload) => this.dispatch({ type: Types.ADD_LAST_MESSAGE, payload });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}