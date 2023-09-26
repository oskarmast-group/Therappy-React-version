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
        list: () => executeCall(() => Axios.get(url, { headers })),
        register: (data) => executeCall(() => Axios.post(url + `/register`, data, { headers })),
        unregister: (data) => executeCall(() => Axios.post(url + `/unregister`, data )),
    };
};


export default crudder;