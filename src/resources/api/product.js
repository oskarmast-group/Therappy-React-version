import Axios from "axios";

export default (crudder) => {
    const headers = crudder.options.headers;

    crudder.position = async (data) => {
        try {
            const url = `${crudder.options.url}/position`;
            const response = await Axios.patch(url, data, {
                headers,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    crudder.getList = async () => {
        const url = `${crudder.options.url}/list`
        try {
            const response = await Axios.get(url, {
                headers,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return crudder;
} 