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
        view: (uuid) => executeCall(() => Axios.get(url + `/${uuid}`, { headers })),
        send: (data, uuid) => executeCall(() => Axios.post(url + `/${uuid}`, data, { headers })),
    };
};


export default crudder;