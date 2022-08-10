let token;

export function getToken() {
    if (!token) {
        const auth = localStorage.getItem("auth");
        const parsedAuth = JSON.parse(auth);

        token = parsedAuth !== null ? parsedAuth.token : null;
    }


    return token;
}


const Authorization = { Authorization: getToken() }

export default Authorization;