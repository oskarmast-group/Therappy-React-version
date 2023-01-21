import Types from './types';
export default class Dispatcher {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

    updateImageStart = (image) => this.dispatch({ type: Types.UPDATE_IMAGE_START, payload: image });

    updateStart = (payload) => this.dispatch({ type: Types.UPDATE_START, payload });

    updateTherapistStart = (payload) => this.dispatch({ type: Types.UPDATE_THERAPIST_START, payload });

    setupIntentStart = () => this.dispatch({ type: Types.SETUP_INTENT_START, payload: {} });

    deletePaymentMethodStart = (payload) => this.dispatch({ type: Types.DELETE_PAYMENT_METHOD_START, payload });

    fetchPaymentMethodsStart = () => this.dispatch({ type: Types.FETCH_PAYMENT_METHODS_START, payload: {} });

    resetError = () => this.dispatch({ type: Types.RESET_ERROR, payload: {} });
}