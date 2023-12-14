import axios from "axios";
const OMDb = `https://www.omdbapi.com/?apikey=7bc5227b&`
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

const MOVIE_API = `${BASE_API}/api/movie`

const request = axios.create({
    withCredentials: true,
});

export const findMovieList = async (movieTitle, pageNum) => {
    const response = await axios.get(`${OMDb}s=${movieTitle}&page=${pageNum}`);
    return response.data;
};

export const findRandomMovie = async () => {
    const response = await request.get(`${MOVIE_API}`);
    return response.data
};