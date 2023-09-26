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
        accountInformation: () => executeCall(() => Axios.get(url + '/account-information', { headers })),
        accountLink: () => executeCall(() => Axios.get(url + '/account-link', { headers })),
    };
};


export default crudder;