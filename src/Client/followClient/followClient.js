import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const FOLLOW_API = `${BASE_API}/api/follows`

const request = axios.create({
    withCredentials: true,
});

export const findFollowing = async (username) => {
    const response = await request.get(`${FOLLOW_API}/${username}/following`);
    return response.data;
}

export const findFollower = async (username) => {
    const response = await request.get(`${FOLLOW_API}/${username}/followers`);
    return response.data;
}

export const followUser = async (followerId, followedId) => {
    const response = await request.post(`${FOLLOW_API}/${followerId}/follows/${followedId}`);
    return response.data;
}

export const findAll = async () => {
    const response = await request.get(`${FOLLOW_API}`);
    return response.data;
}

export const isItFollowing = async (followerId, followedId) => {
    const response = await request.get(`${FOLLOW_API}/${followerId}/follows/${followedId}`);
    return response.data;
}