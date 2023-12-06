import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

const REVIEWS_API = `${BASE_API}/api/review`

const request = axios.create({
    withCredentials: true,
});
export const findRecentReviews = async () => {
    const response = await request.get(`${REVIEWS_API}/recent`);
    return response.data
}

export const findRecentReviewsByUsername = async (username) => {
    const response = await request.get(`${REVIEWS_API}/username/${username}`);
    return response.data;
}

export const deleteReviews = async (username, movie) =>{
    const response = await request.delete(`${REVIEWS_API}/username/${username}/movie/${movie}`);
    return response.data;
}

export const findReviewByUser = async (username,movie) => {
    const response = await request.get(`${REVIEWS_API}/username/${username}/movie/${movie}`);
    return response.data;
}