import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    following: false,
};


const followingReducer = createSlice({
    name: "following",
    initialState,
    reducers: {
        updateFollowing: (state, action) => {
            state.following = action.payload
        },
    },
});


export const { updateFollowing} = followingReducer.actions;
export default followingReducer.reducer;