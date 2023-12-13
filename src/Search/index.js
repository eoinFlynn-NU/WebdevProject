import "./search.css"
import SearchBar from "./Searchbar";
import UserResults from "./UserResults";
import MovieResults from "./MovieResults";
import { updateSearchTerm, updatePageNum } from "../Reducer/searchReducer";
import { searchForUsers } from "../Client/Users/UsersClient";
import { findMovieList } from "../Client/Movie/MovieClient";
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";


function Search(){
    const [userResults, setUserResults] = useState([]);
    const [movieResults, setMovieResults] = useState([]);
    let search = useSelector((state) => state.searchReducer.searchTerm)
    //const [search, setSearch] = useState("");
    const [currPage, setCurrPage] = useState(0);
    const [allowNextPage, setAllowNextPage] = useState(true);
    const [allowPrevPage, setAllowPrevPage] = useState(true);
    const dispatch = useDispatch()
    console.log(search)
    const handleSearch = async (searchTerm) => {
        let response
        console.log("handleSearch search:", search)
        if (search === "") {
            response = await findMovieList(searchTerm, 1)
        } else {
            response = await findMovieList(search, 1)
        }
        if (response.Response === "True") {
            dispatch(updateSearchTerm(searchTerm))
            console.log(search)
            setMovieResults(response.Search)
            setCurrPage(1)
            console.log(response)
            //localStorage.setItem('movieResults', JSON.stringify(response.Search));
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
    useEffect(() => {
        console.log("Search term on useEffect:", search);
        // const storedResults = localStorage.getItem('movieResults');
        // if (storedResults && search !== "") {
        //     setMovieResults(JSON.parse(storedResults));
        //     setCurrPage(1);
        // } else if (search !== "") {
        //     handleSearch(search);
        // }
        if (search !== "") {
            handleSearch(search);
        }
    }, [search])
    useEffect(() => {
        const handleBeforeUnload = () => {
            handleSearch(search)
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])
    //console.log(userResults)
    return(
        <div className="container-fluid home-background">
            <h1 className="text-white">Search for Movies or Users</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="row">
                <div className="col"></div>
                <div className="col-8 top-margin">
                {
                currPage > 0 &&
                <div>
                    {
                        allowPrevPage && <button className="btn btn-primary" onClick={previousPage}>Previous Page</button>
                    }
                    { allowNextPage && <button className="btn btn-primary left-margin" onClick={nextPage}>Next Page</button>}
                </div> 
                }
                    <MovieResults results={movieResults}/>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
}

export default Search;