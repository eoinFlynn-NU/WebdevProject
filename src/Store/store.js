import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from "../Reducer/userReducer";
import followingReducer from "../Reducer/followingReducer";
import followerReducer from "../Reducer/followerReducer";
import searchReducer from "../Reducer/searchReducer";

const persistConfig = {
    key: 'root', // Key to uniquely identify your application's storage
    storage,
    whitelist: ['searchReducer'], // Reducers you want to persist
};

// Combine reducers
const rootReducer = combineReducers({
    userReducer,
    followingReducer,
    followerReducer,
    searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;