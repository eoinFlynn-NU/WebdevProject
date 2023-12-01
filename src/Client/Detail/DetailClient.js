import axios from "axios";
export const apiKey = process.env.API_KEY
const OMDb = `https://www.omdbapi.com/?apikey=7bc5227b&plot=full&`
export const findMovieDetail = async (movieTitle) => {
    const response = await axios
        .get(`${OMDb}t=${movieTitle}`);
    return response.data;
};