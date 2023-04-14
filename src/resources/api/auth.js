let token;

export function getToken() {

    const auth = localStorage.getItem('auth');
    const parsedAuth = JSON.parse(auth);

    if (!token) {
        token = parsedAuth !== null ? parsedAuth.token : null;
    }

    return token;
}

const Authorization = { Authorization: getToken() };

export default Authorization;
