import Axios from "axios";
import Authorization from './auth';
import { executeCall } from "./utils";

const crudder = (domain, resource, withAuth = true) => {
    const url = `${domain}/${resource}`;

    const headers = withAuth ? Authorization : {};

    return {
        options: {
            headers,
            url,
        },
        setupIntent: () => executeCall(() => Axios.get(url + '/setup-payment', { headers })),
        paymentMethods: () => executeCall(() => Axios.get(url + '/payment-methods', { headers })),
        deletePaymentMethod: (data) => executeCall(() => Axios.post(url + '/delete-payment-method', data, { headers })),
    };
};


export default crudder;