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
        inactivate: (data) => executeCall(() => Axios.patch(url, data, { headers })),
        comment: (data) => executeCall(() => Axios.patch(url + '/comment', data, { headers })),
        verification: () => executeCall(() => Axios.get(url + '/verification', { headers })),
        history: () => executeCall(() => Axios.get(url + '/history', { headers })),
        statistics: () => executeCall(() => Axios.get(url + '/statistics', { headers })),
    };
};


export default crudder;