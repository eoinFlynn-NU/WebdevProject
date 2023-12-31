import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {findMovieDetail} from "../Client/Detail/DetailClient";
import {findRecentReviews, findRecentReviewsByUsername} from "../Client/Reviews/ReviewClient"
import "./home.css"
import ReviewList from "./ReviewLists"
import {findRandomMovie} from "../Client/Movie/MovieClient";
import MovieCards from "../Componets/MovieCards";
import HomeMovieCards from "../Componets/HomeMovieCard";

function LoggedInHome() {
    const movieTitle1 = "The Dark Knight"
    const [movie1, setMovie1] = useState([])
    const [randMovie, setRandMovie] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle1).then(
            movie1 => {
                setMovie1(movie1)
            }
        )
    }, []);
    const movieTitle2 = "Memento"
    const [movie2, setMovie2] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle2).then(
            movie2 => {
                setMovie2(movie2)
            }
        )
    }, []);
    const movieTitle3 = "Mad Max: Fury Road"
    const [movie3, setMovie3] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle3).then(
            movie3 => {
                setMovie3(movie3)
            }
        )
    }, []);

    const currUser = useSelector((state) => state.userReducer.user.username);
    const usersName = useSelector((state) => state.userReducer.user.firstName);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        findRecentReviewsByUsername(currUser).then(
            reviews => {
                setReviews(reviews)
            }
        )
    }, []);

    useEffect( ()=>{
        findRandomMovie().then(
            movie =>{
                setRandMovie(movie)
            }
        )
    },[])
    console.log(randMovie)
    return (
        <div className="w-auto" style={{padding: "0px", overflowX: "hidden"}}>
            <h3 className="text-center text-white top-padding">Welcome {usersName}</h3>
            <div className="row top-padding">
                <div className="d-flex flex-wrap justify-content-center" style={{padding: "0px", overflowX: "hidden"}}>
                    <div>
                        <img src={movie1.Poster} className="movie-poster" alt="movie poster 1"/>
                    </div>
                    <div >
                        <img src={movie2.Poster} className="movie-poster" alt="movie poster 2"/>
                    </div>
                    <div>
                        <img src={movie3.Poster} className="movie-poster" alt="movie poster 3"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="text-center">
                        <h1 className="text-white">Movie Suggestion</h1>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {
                            randMovie.map((movie, index) => (
                                <HomeMovieCards
                                    movies={movie}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="container-fluid top-padding side-padding home-background ">
                <div className="row">
                    <div className="col">
                        {reviews.length > 0 ?
                        <div>
                            <h3 className="text-white">Recent Reviews</h3>
                            <ReviewList reviews={reviews}/>
                        </div> :
                            <h3 className="text-white">You have not written any reviews yet</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoggedInHome