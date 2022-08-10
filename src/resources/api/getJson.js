import Axios from 'axios';

const getJson = async (url) => {
    try {
        const response = await Axios.get(url, {
            responseType: 'json',
            headers: {
                Accept: 'application/json;',
            },
        });
        return response.data;
    } catch (e) {
        console.error(e);
    }
    return null;
};

export default getJson;
