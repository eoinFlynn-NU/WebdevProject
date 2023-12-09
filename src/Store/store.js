import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/userReducer";
import followingReducer from "../Reducer/followingReducer";
import followerReducer from "../Reducer/followerReducer";

const store = configureStore({
    reducer: {
        userReducer,
        followingReducer,
        followerReducer
    }
});


export default store;