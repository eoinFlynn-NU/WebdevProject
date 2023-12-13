import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateSearchTerm} from "../Reducer/searchReducer";

const SearchBar = ({ onSearch }) => {
    let search = useSelector((state) => state.searchReducer.searchTerm)
    const dispatch = useDispatch()

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Call the onSearch function with the current search term
      onSearch(search);
    }
  };
  console.log(search)
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
        onKeyDown={handleKeyPress}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onSearch(search)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;