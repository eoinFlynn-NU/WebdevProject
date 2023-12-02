import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const apiKey = process.env.API_KEY
const OMDb = `https://www.omdbapi.com/?apikey=7bc5227b&plot=full&`
const USERS_API = `${BASE_API}/api/users`
const REVIEWS_API = `${BASE_API}/api/review`

const request = axios.create({
    withCredentials: true,
});
export const findMovieDetail = async (movieTitle) => {
    const response = await axios
        .get(`${OMDb}t=${movieTitle}`);
    return response.data;
};

export const signIn = async (credentials) => {
    const response = await request.post( `${USERS_API}/signin`, credentials );
    return response.data;
};

export const signup = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/signup`, credentials);
    return response.data;
};
export const findReview = async (movieName) => {
    const response = await request.get(
        `${REVIEWS_API}/${movieName}`);
    console.log( response.data)
    return response.data;
};