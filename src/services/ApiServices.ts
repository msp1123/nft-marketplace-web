import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:3200/v1`
});

export async function GetAllNfts() {
    let response;
    try {
        response = await api.get(`/nfts`);
        if (response.status === 200) {
            return response.data;
        } else {
            let message = response.data;
            throw new Error(message.error);
        }
    } catch (e) {
        throw e
    }
}
