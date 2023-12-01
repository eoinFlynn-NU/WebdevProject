import {useEffect, useState} from "react";
import {findMovieDetail} from "../Client/Detail/DetailClient";
import './index.css'
import {Link} from "react-router-dom";

function Details() {
    const movieTitle = "Dark Knight"
    const [movie, setMovie] = useState([])
    useEffect(() => {
        findMovieDetail(movieTitle).then(
            movie => {
                setMovie(movie)
            }
        )
    }, []);

    const reviews = [{
        user: "user1",
        review: "Every scene feels like a cataclysm waiting to happen, fitting for a film that builds, step-by-step, to the creation of a cataclysm machine. Oppenheimer both summons awe for what it took to build the bomb and for the changes it wrought.",
        date: "2012-04-21",
        rating: "8.7/10"
    },
        {
            user: "user1",
            review: "Every scene feels like a cataclysm waiting to happen, fitting for a film that builds, step-by-step, to the creation of a cataclysm machine. Oppenheimer both summons awe for what it took to build the bomb and for the changes it wrought.",
            date: "2012-04-21",
            rating: "8.7/10"
        },
        {
            user: "user1",
            review: "Every scene feels like a cataclysm waiting to happen, fitting for a film that builds, step-by-step, to the creation of a cataclysm machine. Oppenheimer both summons awe for what it took to build the bomb and for the changes it wrought.",
            date: "2012-04-21",
            rating: "8.7/10"
        },
        {
            user: "user1",
            review: "Every scene feels like a cataclysm waiting to happen, fitting for a film that builds, step-by-step, to the creation of a cataclysm machine. Oppenheimer both summons awe for what it took to build the bomb and for the changes it wrought.",
            date: "2012-04-21",
            rating: "8.7/10"
        }]

    return (
        <div className="page w-100 d-flex flex-column">
            <div className="main-content pt-5 d-flex flex-row ms-5 me-5">
                <div className="me-5 ">
                    <img src={movie.Poster} className="" alt="Responsive image"/>
                    <h1>Rating: {movie.imdbRating}/10</h1>
                    <h5>Movie Votes: {movie.imdbVotes}</h5>
                </div>

                <div className="content ">
                    <h1>{movie.Title}</h1>
                    <h1 className="mb-5">Release Date: {movie.Year}</h1>
                    <h3>Plot:</h3>
                    <p>{movie.Plot}</p>
                    <h3>Cast:</h3>
                    <p>{movie.Actors}</p>
                </div>
                <div>
                    <Link to={"/review"}>
                        <button className="btn btn-secondary">Write Review</button>
                    </Link>
                </div>
            </div>
            <div className="reviews ms-5 me-5 pt-4">
                <h2 className="text-white">Review</h2>
                <ul className="list-group list-group-flush">
                    {
                        reviews
                            .map((review, index) => (
                                <li key={index} className="list-group-item list-group-item-secondary">
                                    <div className="text-white d-flex flex-column">
                                        <Link to={"/profile"} className="text-decoration-none"><h5>{review.user}</h5>
                                        </Link>
                                        <h>Date: {review.date}</h>
                                        <p>Rating: {review.rating}</p>
                                        <p>{review.review}</p>
                                    </div>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Details;