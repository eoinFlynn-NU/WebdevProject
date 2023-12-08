import axios from "axios";
const OMDb = `https://www.omdbapi.com/?apikey=7bc5227b&`


const request = axios.create({
    withCredentials: true,
});
export const findMovieList = async (movieTitle) => {
    const response = await axios.get(`${OMDb}s=${movieTitle}`);
    return response.data;
};