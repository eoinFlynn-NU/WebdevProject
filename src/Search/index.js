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
    const [pageNum, setPageNum] = useState(1)
    const handleSearch = async (searchTerm) => {
        console.log(pageNum)
        //setUserResults(JSON.parse(await searchForUsers(searchTerm)))
        const response = await findMovieList(searchTerm, pageNum)
        setMovieResults(response.Search)
        console.log(response)
        //const response_json = JSON.parse(response)
        //setMovieResults(JSON.parse(await findMovieList(searchTerm)))
        //console.log(response_json)
        setPageNum(pageNum+1)
      };
    //console.log(userResults)
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
            <button className="btn btn-primary" onClick={handleSearch}>Next Page</button>
        </div>
    )
}

export default Search;