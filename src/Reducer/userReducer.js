import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: [],
};


const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});


export const { setUser, updateUser} = userSlicer.actions;
export default userSlicer.reducer;