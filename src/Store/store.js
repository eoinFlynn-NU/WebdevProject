import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/userReducer";
import followingReducer from "../Reducer/followingReducer";
import followerReducer from "../Reducer/followerReducer";
import searchReducer from "../Reducer/searchReducer";

const store = configureStore({
    reducer: {
        userReducer,
        followingReducer,
        followerReducer,
        searchReducer,
    }
});


export default store;