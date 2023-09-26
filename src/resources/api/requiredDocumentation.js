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
        uploadDocument: (data) => executeCall(() => Axios.post(url, data, { headers: { ...headers, "Content-Type": "multipart/form-data", } })),
        updateDocument: (data) => executeCall(() => Axios.patch(url, data, { headers: { ...headers, "Content-Type": "multipart/form-data", } })),
        deleteDocument: (id) => executeCall(() => Axios.delete(url + `/${id}`, { headers })),
    };
};


export default crudder;