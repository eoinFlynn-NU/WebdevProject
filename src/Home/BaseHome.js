import { useEffect, useState, Component } from "react";
import { findMovieDetail } from "../Client/Detail/DetailClient";
import { findRecentReviews } from "../Client/Reviews/ReviewClient"
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
    const movieTitle3 = "Star Wars: Episode IV - A New Hope"
    const [movie3, setMovie3] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle3).then(
            movie3 => {
                setMovie3(movie3)
            }
        )
    }, []);
    
    const movieTitle4 = "Mad Max: Fury Road"
    const [movie4, setMovie4] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle4).then(
            movie4 => {
                setMovie4(movie4)
            }
        )
    }, []);

    const movieTitle5 = "Pulp Fiction"
    const [movie5, setMovie5] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle5).then(
            movie5 => {
                setMovie5(movie5)
            }
        )
    }, []);

    const movieTitle6 = "Pirates of the Caribbean: The Curse of the Black Pearl"
    const [movie6, setMovie6] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle6).then(
            movie6 => {
                setMovie6(movie6)
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
            <div className="top-padding">
                <h4 className="text-white">Our Favorite Movies so Far</h4>
                <hr className="white-line"/> 
            <div className="something d-flex flex-wrap justify-content-center">
                <div>
                    <img src={movie1.Poster} className="movie-poster" alt="movie poster 1" />
                </div>
                <div>
                    <img src={movie2.Poster} className="movie-poster" alt="movie poster 2" />
                </div>
                <div>
                    <img src={movie3.Poster} className="movie-poster" alt="movie poster 3" />
                </div>
                <div>
                    <img src={movie4.Poster} className="movie-poster" alt="movie poster 3" />
                </div>
                <div>
                    <img src={movie5.Poster} className="movie-poster" alt="movie poster 3" />
                </div>
            </div>
            </div>

            <div className="container-fluid top-padding side-padding home-background ">
                <div className="row">
                    <div className="col">
                        <h3 className="text-white">Recent Reviews</h3>
                        {<ReviewList reviews={reviews} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BaseHome