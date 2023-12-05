import {useEffect, useState} from "react";
import {findMovieDetail} from "../Client/Detail/DetailClient";
import {findRecentReviews} from "../Client/Reviews/ReviewClient"
import "./home.css"
import ReviewList from "./ReviewLists"

function BaseHome() {
    const movieTitle1 = "The Dark Knight"
    const [movie1, setMovie1] = useState([])
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
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        findRecentReviews().then(
            reviews => {
                setReviews(reviews)
            }
        )
    }, []);
    return (
        <div>
            <h3 className="text-center text-white top-padding">The #1 movie review website for Northeastern students</h3>
            <div className="row top-padding">
                <div className="col"></div>
                <div className="col w-auto">
                    <img src={movie1.Poster} className="movie-poster" alt="movie poster 1"/>
                </div>
                <div className="col w-auto">
                    <img src={movie2.Poster} className="movie-poster" alt="movie poster 2"/>
                </div>
                <div className="col w-auto">
                    <img src={movie3.Poster} className="movie-poster" alt="movie poster 3"/>
                </div>
                <div className="col"></div>
            </div>
            <div className="container-fluid top-padding side-padding home-background ">
                <div className="row">
                    <div className="col">
                        <h3 className="text-white">Recent Reviews</h3>
                        {<ReviewList reviews={reviews}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BaseHome