import {useEffect, useState} from "react";
import {
    addToLikedList,
    checkMovieAlreadyLike,
    findMovieDetail,
    findReview,
    removeLikedMovie
} from "../Client/Detail/DetailClient";
import './index.css'
import {Link} from "react-router-dom";
import Review from "../Review";
import {useSelector} from "react-redux";
import {deleteReviews, findReviewByUser} from "../Client/Reviews/ReviewClient";
import {useNavigate} from "react-router";

function Details() {
    const user = useSelector((state) => state.userReducer.user);
    const movieTitle = "The Dark Knight"
    const [movie, setMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [yourReview, setYourReview] = useState([])
    const [clicked, setClicked] = useState(false)
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate();

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

    useEffect(() => {
        findReview(movieTitle).then(
            review => {
                setReviews(review)
            }
        )
    }, [])

    useEffect(() => {
        findReviewByUser(user.username, movieTitle).then(
            review => {
                setYourReview(review)
            }
        )
    }, [])
    useEffect(() => {
        if (user != null) {
            checkMovieAlreadyLike(user.username, movieTitle).then(
                likedMovie => {
                    const alreadyLiked = likedMovie.length >= 1
                    setLiked(alreadyLiked)
                }
            )
        }
    }, [])

    const likeMovie = () => {
        console.log(user.username !== undefined)
        if (user.username !== undefined) {
            try {
                addToLikedList(user.username, movieTitle)
                setLiked(true)
            } catch (e) {
                console.log(e)
            }
        }else{
            navigate("/register")
        }
    }

    const unlikedMovie = () => {
        if (user != null) {
            try {
                removeLikedMovie(user.username, movieTitle)
                setLiked(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const deleteReview = async (username, movie) => {
        await deleteReviews(username, movie)
        setReviews(
            reviews.filter((review) => (review.username !== username))
        )
        if (username === user.username) {
            setYourReview([])
        }
    }
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
                    {yourReview.length === 0 &&
                        <button className="btn btn-secondary mb-3" onClick={openModal}>Write Review</button>}
                    {(liked ?
                            <button className="btn btn-danger" onClick={unlikedMovie}>Unlike Movie</button> :
                            <button className="btn btn-success" onClick={() => likeMovie()}>Like Movie</button>
                    )}
                </div>
            </div>
            {yourReview.length === 1 &&
                <div className="ms-5 me-5">
                    <h2 className="text-white">Your Review</h2>
                    <ul className="reviews list-group list-group-flush">
                        {yourReview.map((review, index) => (
                            <li key={index} className="list-group-item list-group-item-secondary">
                                <div className="d-flex flex-row">
                                    <div className="text-white d-flex flex-column">
                                        <Link to={"/profile"} className="text-decoration-none">
                                            <h5>{review.username}</h5>
                                        </Link>
                                        <h>Date: {review.date}</h>
                                        <p>Rating: {review.rating}</p>
                                        <p>{review.review}</p>
                                    </div>
                                    <div className="ms-auto">
                                        <button onClick={() => deleteReview(user.username, movie.Title)}
                                                className="btn btn-danger me-2">delete
                                        </button>
                                        <button onClick={openModal} className="btn btn-secondary">
                                            Modify
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            }
            {(reviews.length > 1) &&
                <div className="reviews ms-5 me-5 pt-4">
                    <h2 className="text-white">Review</h2>
                    <ul className="list-group list-group-flush">
                        {
                            reviews
                                .map((review, index) => (
                                    <li key={index} className="list-group-item list-group-item-secondary">
                                        <div className="d-flex flex-row">
                                            <div className="text-white d-flex flex-column">
                                                <Link to={"/profile"} className="text-decoration-none">
                                                    <h5>{review.username}</h5>
                                                </Link>
                                                <h>Date: {review.date}</h>
                                                <p>Rating: {review.rating}</p>
                                                <p>{review.review}</p>
                                            </div>
                                            {user.role === 'ADMIN' &&
                                                <div className="ms-auto">
                                                    <button onClick={() => deleteReview(review.username, movie.Title)}
                                                            className="btn btn-danger">delete
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>}
            {clicked && <Review movie={movie} clicked={clicked} setClicked={setClicked} setYourReview={setYourReview}
                                yourReivew={yourReview}/>}
        </div>
    )
}

export default Details;