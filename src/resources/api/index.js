import Axios from "axios";
import Authorization from './auth';
import { API } from '../constants/urls';
import crudder from './crudder';
import profile from './profile';
import stripeClients from './stripeClients';
import appointments from './appointments';
import messages from './messages';
import notifications from './notifications';
import authCrudder from './auth-crud';
import stripeTherapist from './stripeTherapist';

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

const Crudder = crudder(API);
export const authAPI = authCrudder(API, "auth");
export const profileAPI = profile(API, "profile");
export const therapistAPI = Crudder("therapist");
export const categoriesAPI = Crudder("categories");
export const stripeClientsAPI = stripeClients(API, "stripe-clients");
export const stripeTherapistAPI = stripeTherapist(API, "stripe-therapist");
export const appointmentsAPI = appointments(API, "appointments");
export const conversationsAPI = appointments(API, "conversations");
export const messagesAPI = messages(API, "messages");
export const notificationsAPI = notifications(API, "notifications");
