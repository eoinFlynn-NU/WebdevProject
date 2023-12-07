import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

const LIKED_API = `${BASE_API}/api/liked`

const request = axios.create({
    withCredentials: true,
});

export const findMoviedByUser = async (username,movie) => {
    const response = await request.get(`${LIKED_API}/${username}`);
    return response.data;
}