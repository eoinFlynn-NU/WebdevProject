import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const USERS_API = `${BASE_API}/api/users`

const request = axios.create({
    withCredentials: true,
});
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    console.log(response)
    console.log(response.data)
    return response.data;
};