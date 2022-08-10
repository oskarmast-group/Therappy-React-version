import Axios from "axios";
import Authorization from './auth';
import { API, IMAGES_URL, ICONS_URL, ADMIN_API } from '../constants/urls';
import crudder from './crudder';
import inactive86 from './inactive86';
import product from './product';
import authCrudder from './auth-crud';
import { executeCall } from "./utils";
import { GROUP_ID } from "resources/constants/config";
import getJson from "./getJson";
import config from './config';

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
export const authAPI = authCrudder(ADMIN_API, "auth/access-list");

export const inactive86API = inactive86(API, "menu/inactive86");
export const productsAPI = product(AppSinTiCrudder("menu/product"));
export const configAPI = config(AppSinTiCrudder("menu/config"));
export const categoriesAPI = AppSinTiCrudder("menu/category");
export const tablesAPI = AppSinTiCrudder("menu/table");
export const areasAPI = AppSinTiCrudder("menu/area");
export const tagAPI = AppSinTiCrudder("menu/tag");
export const productHistoryAPI = AppSinTiCrudder("menu/product-history");
export const familyAPI = AppSinTiCrudder("menu/family");
export const ingredientAPI = AppSinTiCrudder("menu/ingredient");
export const xetuxAPI = AppSinTiCrudder("menu/xetux");
export const getImage = (name) => `${IMAGES_URL}${name}`;
export const fetchGalleries = () => getJson(`${ICONS_URL}index.json`);
export const fetchIcons = (gallery) => getJson(`${ICONS_URL}${gallery}/index.json`);
export const getUsersOfGroup = ({ division, role }) => executeCall(() => Axios.get(`${API}/security/user/ofgroup/${GROUP_ID}/${!!division ? division : '0'}/${!!role ? role : '0'}`, { headers: Authorization }));
