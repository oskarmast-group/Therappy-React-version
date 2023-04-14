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
        profile: () => executeCall(() => Axios.get(url, { headers })),
        updateImage: (data) => executeCall(() => Axios.patch(url + '/img', data, { headers })),
        update: (data) => executeCall(() => Axios.patch(url, data, { headers })),
    };
};


export default crudder;