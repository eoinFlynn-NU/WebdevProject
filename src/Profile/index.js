import {useSelector} from "react-redux";
import "./index.css"
import MovieCards from "../Componets/MovieCards";
import {useEffect, useState} from "react";
import {deleteReviews, findRecentReviewsByUsername} from "../Client/Reviews/ReviewClient";
import {Link} from "react-router-dom";
import {findMoviedByUser} from "../Client/LikedMovieClient/LikedMovieClient";
import ReviewForProfile from "../ReviewForProfile";
import EditProfile from "../EditProfile";

function Profile() {
    const user = useSelector((state) => state.userReducer.user)
    const likedMovie = ["The Dark Knight", "Iron Man", "Whiplash" , "Iron Man","Iron Man" ]
    const [favoriteMovie, setYourFavoriteMovie] = useState([])
    const [yourReview, setReviews] = useState([])
    const [clicked, setClicked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentReview, setCurrentReview] = useState()

    const openModal = (review) => {
        setCurrentReview(review)
        setClicked(true)
    }

    const openEditModal = () => {
        setEdit(true)
    }
    useEffect(() => {
        findMoviedByUser(user.username).then(
            favoriteMovie => {
                setYourFavoriteMovie(favoriteMovie)
            })
    }, [])

    console.log(favoriteMovie)

    useEffect(() => {
        findRecentReviewsByUsername(user.username).then(
            reviews => {
                setReviews(reviews)
            })
    }, [])

    const deleteReview = async (username, movie) => {
        await deleteReviews(username, movie)
        setReviews(
            yourReview.filter((review) => (review.movie !== movie))
        )
    }

    return (
        <div className="page w-100 p-0">
            <div className="row mb-3 g-0">
                <div>
                    <div className="text-center">
                        <h5 className="my-3 text-white">{user.firstName + " " + user.lastName}</h5>
                        <p className=" mb-1 text-white">{user.email}</p>
                        <p className=" mb-4 text-white">{user.dob.substring(0, 10)}</p>
                        <div className="d-flex justify-content-center mb-2">
                            <button type="button" className="btn btn-primary">Follow</button>
                            <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                            <button onClick={openEditModal} className='btn btn-success ms-1'>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0">
                <div className="text-center">
                    <h1 className="text-white">Favorite Movie</h1>
                </div>
                <div className="d-flex flex-wrap flex-row align-items-center justify-content-center">
                    {
                        favoriteMovie.map((movie, index) => (
                            <MovieCards key={index} movies={movie} favoriteMovie={favoriteMovie} setYourFavoriteMovie={setYourFavoriteMovie}/>
                        ))
                    }
                </div>
            </div>
            <div className="row g-0 ">
                {yourReview.length !== 0 &&
                    <div className="reviews ms-auto me-auto pt-4 align-content-center" style={{ width: '60rem', overflowX: 'auto' }}>
                        <h2 className="text-white">Review</h2>

                        <ul className="list-group list-group-flush">
                            {
                                yourReview
                                    .map((review, index) => (
                                        <li key={index} className="list-group-item list-group-item-secondary">
                                            <div className="d-flex flex-row">
                                                <div className="text-white d-flex flex-column">
                                                    <Link to={"/profile"} className="text-decoration-none">
                                                        <h5>{review.username}</h5>
                                                    </Link>
                                                    <h>Date: {review.date}</h>
                                                    <p>Movie: {review.movie}</p>
                                                    <p>Rating: {review.rating}</p>
                                                    <p>{review.review}</p>
                                                </div>
                                                <div className="ms-auto">
                                                    <button onClick={() => deleteReview(review.username, review.movie)}
                                                            className="btn btn-danger me-2">Delete
                                                    </button>
                                                    <button onClick={() => openModal(review)}
                                                            className="btn btn-secondary">Modify
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                        {clicked && <ReviewForProfile clicked={clicked} setClicked={setClicked} setYourReview={setReviews} yourReivew={currentReview} listReivews={yourReview}/>}
                        {edit && <EditProfile setEdit={setEdit} edit={edit}/>}
                    </div>
                }
            </div>
        </div>

    )
}

export default Profile;