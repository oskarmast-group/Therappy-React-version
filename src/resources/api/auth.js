import { AUTH_VALIDATION } from 'resources/constants/constants';

let token;

export function getToken() {
    const authValidation = localStorage.getItem('authValidation');
    if (!authValidation || authValidation !== AUTH_VALIDATION) return null;

    const auth = localStorage.getItem('auth');
    const parsedAuth = JSON.parse(auth);

    const email = parsedAuth !== null ? parsedAuth.email : null;
    if (!email) return null;

    if (!token) {
        token = parsedAuth !== null ? parsedAuth.token : null;
    }

    return token;
}

const Authorization = { Authorization: getToken() };

export default Authorization;
