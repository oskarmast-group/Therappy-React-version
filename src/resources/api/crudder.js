import Axios from "axios";
import Authorization from './auth';
import { executeCall } from "./utils";

const crudder = (domain) => (resource, withAuth = true) => {
    const url = `${domain}/${resource}`;

    const headers = withAuth ? Authorization : {};

    return {
        options: {
            headers,
            url,
        },
        getAll: () => executeCall(() => Axios.get(url, { headers })),
        getOne: (id) => executeCall(() => Axios.get(url + '/' + id, { headers })),
        create: (data) => executeCall(() => Axios.post(url, data, { headers })),
        update: (data) => executeCall(() => Axios.patch(url, data, { headers })),
        delete: (options) => executeCall(() => Axios.delete(url, { data: options, headers })),
    };
};


export default crudder;