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
        getPending: () => executeCall(() => Axios.get(url + '/pending', { headers })),
        getUpcoming: () => executeCall(() => Axios.get(url + '/upcoming', { headers })),
        reserve: (data) => executeCall(() => Axios.post(url + '/reserve', data, { headers })),
        confirm: (data) => executeCall(() => Axios.post(url + '/confirm', data, { headers })),
        accept: (data) => executeCall(() => Axios.post(url + '/accept', data, { headers })),
        reject: (data) => executeCall(() => Axios.post(url + '/reject', data, { headers })),
        cancel: (data) => executeCall(() => Axios.post(url + '/cancel', data, { headers })),
        view: (id) => executeCall(() => Axios.get(url + `/${id}`, { headers })),
        serverTime: (id) => executeCall(() => Axios.get(url + `/time-now`, { headers })),
    };
};


export default crudder;