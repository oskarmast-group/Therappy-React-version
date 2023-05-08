import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';

const authCrudder = (domain, resource) => {
    const url = `${domain}/${resource}`;

    const headers = Authorization;

    return {
        login: (data) => executeCall(() => Axios.post(`${url}/login`, data, { headers: {} })),
        register: (data) => executeCall(() => Axios.post(`${url}/register`, data, { headers: {} })),
        confirmation: (data) => executeCall(() => Axios.post(`${url}/confirmation`, data, { headers })),
        requestEmailConfirmation: () => executeCall(() => Axios.post(`${url}/request-confirmation-email`, {}, { headers })),
    };
};

export default authCrudder;
