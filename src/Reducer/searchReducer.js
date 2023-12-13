import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchTerm: "",
    pageNum: 1
};


const SearchReducer = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        updatePageNum: (state, action) => {
            state.pageNum = action.payload
        }
    },
});


export const { updateSearchTerm, updatePageNum} = SearchReducer.actions;
export default SearchReducer.reducer;