import Axios from "axios";
import Authorization from './auth';
import { API } from '../constants/urls';

const ENDPOINT = 'menu/statistics';



export const getHosts = (dateInit, dateEnd) => getStatistic('hosts', dateInit, dateEnd);

export const getServers = (dateInit, dateEnd) => getStatistic('servers', dateInit, dateEnd);

export const getManagers = (dateInit, dateEnd) => getStatistic('managers', dateInit, dateEnd);



async function getStatistic(stat, dateInit, dateEnd) {
    try {
        const response = await Axios.get(`${API}/${ENDPOINT}/${stat}/${dateInit}/${dateEnd}`, { headers: Authorization });
        return response.data
    } catch (error) {
        throw error;
    }
}

