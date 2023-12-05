import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

const REVIEWS_API = `${BASE_API}/api/review`


export const findRecentReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}/recent`);
    return response.data
}

export const findRecentReviewsByUsername = async (username) => {
    const response = await axios.get(`${REVIEWS_API}/username/${username}`);
    return response.data;
}