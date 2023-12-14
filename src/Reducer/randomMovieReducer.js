import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    randMovie: [],
};


const randMovieReducer = createSlice({
    name: "randMovie",
    initialState,
    reducers: {
        updateRandMovie: (state, action) => {
            state.randMovie = action.payload
        },
        setRandMovie: (state, action) => {
            state.randMovie = action.payload;
        },
    },
});


export const { updateRandMovie, setRandMovie} = randMovieReducer.actions;
export default randMovieReducer.reducer;