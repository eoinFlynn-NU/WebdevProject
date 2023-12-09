import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    follower: false,
};


const followerReducer = createSlice({
    name: "follower",
    initialState,
    reducers: {
        updateFollower: (state, action) => {
            state.follower = action.payload
        },
    },
});


export const { updateFollower} = followerReducer.actions;
export default followerReducer.reducer;