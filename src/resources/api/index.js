import Axios from "axios";
import Authorization from './auth';
import { API } from '../constants/urls';
import crudder from './crudder';
import profile from './profile';
import authCrudder from './auth-crud';

export async function registerPush(data) {
    try {
        const response = await Axios.post(API + '/menu/user/pushregister', data, {
            headers: { Authorization },
        });

        return response.data;
    } catch (error) {
        console.error('ERROR on REGISTER PUSH ', error);
        throw error;
    }
}

const AppSinTiCrudder = crudder(API);
export const authAPI = authCrudder(API, "auth");
export const profileAPI = profile(API, "profile");
export const therapistAPI = AppSinTiCrudder("therapist");
export const categoriesAPI = AppSinTiCrudder("categories");
