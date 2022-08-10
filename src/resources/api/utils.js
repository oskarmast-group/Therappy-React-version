export async function executeCall(callback) {
    const response = await callback();
    return response.data;
}