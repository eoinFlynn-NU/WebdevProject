import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const USERS_API = `${BASE_API}/api/users`

const request = axios.create({
    withCredentials: true,
});
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};

export const findUser = async (userid) =>{
    const response = await request.get(`${USERS_API}/${userid}`);
    return response.data;
}