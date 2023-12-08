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
    const handleSearch = async (searchTerm) => {
        console.log('Searching for:', searchTerm);
        setUserResults(JSON.parse(await searchForUsers(searchTerm)))
        setMovieResults(JSON.parse(await findMovieList(searchTerm)).Search)
      };
    console.log(userResults)
    return(
        <div className="container-fluid home-background">
            <h1 className="text-white">Search for Movies or Users</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="row">
                <div className="col">
                    <MovieResults results={movieResults}/>
                </div>
                <div className="col">
                    <UserResults results={userResults}/>
                </div>
            </div>
        </div>
    )
}

export default Search;