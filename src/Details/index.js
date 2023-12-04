import {useEffect, useState} from "react";
import {findMovieDetail, findReview} from "../Client/Detail/DetailClient";
import './index.css'
import {Link} from "react-router-dom";
import Review from "../Review";

function Details() {
    const movieTitle = "The Dark Knight"
    const [movie, setMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [clicked, setClicked] = useState(false)

    const openModal = () => {
        setClicked(true)
    }

    useEffect(() => {
        findMovieDetail(movieTitle).then(
            movie => {
                setMovie(movie)
            }
        )
    }, []);

    useEffect(() =>{
        findReview(movieTitle).then(
            review => {
                setReviews(review)
            }
        )
    }, [])

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
                        <button className="btn btn-secondary" onClick={openModal}>Write Review</button>
                </div>
            </div>
            {(reviews.length > 1) &&
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
            </div>}
            { clicked && <Review movie={movie} clicked={clicked} setClicked = {setClicked}/> }
        </div>
    )
}

export default Details;