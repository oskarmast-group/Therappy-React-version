import Axios from "axios";
import { executeCall } from "./utils";

export default (crudder) => {
    const headers = crudder.options.headers;

    crudder.getPublic = () => executeCall(() => Axios.get(crudder.options.url + '/public', { headers }));

    return crudder;
} 