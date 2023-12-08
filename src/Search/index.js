import "./search.css"
import SearchBar from "./Searchbar";
import UserResults from "./UserResults";
import MovieResults from "./MovieResults";
import { searchForUsers } from "../Client/Users/UsersClient";
import { findMovieList } from "../Client/Movie/MovieClient";
import {useEffect, useState} from "react";

function Search(){
    const [userResults, setUserResults] = useState([]);
    const [movieResults, setMovieResults] = useState([]);
    const [search, setSearch] = useState("");
    const [currPage, setCurrPage] = useState(0);
    const [allowNextPage, setAllowNextPage] = useState(true);
    const [allowPrevPage, setAllowPrevPage] = useState(true);
    const handleSearch = async (searchTerm) => {
        setSearch(searchTerm)
        const response = await findMovieList(searchTerm, 1)
        if (response.Response === "True") {
            setMovieResults(response.Search)
            setCurrPage(1)
            console.log(response)
        } 
      };
    const nextPage = async () => {
        const response = await findMovieList(search, currPage + 1)
        if (response.Response === "True") {
            setCurrPage(currPage => currPage + 1)
            setMovieResults(response.Search)
            setAllowPrevPage(true)
        } else {
            setAllowNextPage(false)
        }
    }
    const previousPage = async () => {
        const response = await findMovieList(search, currPage - 1)
        if (response.Response === "True") {
            setCurrPage(currPage => currPage - 1)
            setMovieResults(response.Search)
            setAllowNextPage(true)
        } else {
            setAllowPrevPage(false)
        }
    }
    //console.log(userResults)
    return(
        <div className="container-fluid home-background">
            <h1 className="text-white">Search for Movies or Users</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="row">
                <div className="col-8">
                    <h3 className="text-white">Movies</h3>
                    <MovieResults results={movieResults}/>
                </div>
                <div className="col">
                    <h3 className="text-white">Users</h3>
                    <UserResults results={userResults}/>
                </div>
            </div>
            {
                currPage > 0 &&
                <div>
                    {
                        allowPrevPage && <button className="btn btn-primary" onClick={previousPage}>Previous Page</button>
                    }
                    { allowNextPage && <button className="btn btn-primary" onClick={nextPage}>Next Page</button>}
                </div> 
            }
        </div>
    )
}

export default Search;