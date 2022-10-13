import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';

const authCrudder = (domain, resource) => {
    const url = `${domain}/${resource}`;

    const headers = Authorization;

    return {
        login: (data) => executeCall(() => Axios.post(`${url}/login`, data, { headers: {} })),
    };
};

export default authCrudder;
