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
        getAll: () => executeCall(() => Axios.get(url, { headers })),
        reserve: (data) => executeCall(() => Axios.post(url + '/reserve', data, { headers })),
        confirm: (data) => executeCall(() => Axios.post(url + '/confirm', data, { headers })),
    };
};


export default crudder;