export const processError = (error) => {
    const response = error.response;
    if (response) {
        return { status: response.status, message: response.data.message};
    } 
    return error.message;
}