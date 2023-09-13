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
        view: (uuid, extraMessages) => executeCall(() => Axios.get(url + `/${uuid}?extraMessages=${extraMessages ?? 4}`, { headers })),
        send: (data, uuid) => executeCall(() => Axios.post(url + `/${uuid}`, data, { headers })),
        markAsRead: (data) => executeCall(() => Axios.post(url + `/markRead`, data, { headers })),
    };
};


export default crudder;