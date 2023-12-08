import {useSelector} from "react-redux";
import "./index.css"
import MovieCards from "../Componets/MovieCards";
import {useEffect, useState} from "react";
import {deleteReviews, findRecentReviewsByUsername} from "../Client/Reviews/ReviewClient";
import {Link, useParams} from "react-router-dom";
import {findMoviedByUser} from "../Client/LikedMovieClient/LikedMovieClient";
import ReviewForProfile from "../ReviewForProfile";
import EditProfile from "../EditProfile";
import {findUser} from "../Client/Account /AccountClient";
import FollowList from "../Componets/followList";
import {findFollower, findFollowing, isItFollowing} from "../Client/followClient/followClient";

function Profile() {
    let {userId} = useParams()
    let user = useSelector((state) => state.userReducer.user)
    if (userId === undefined) {
        userId = user._id
    }
    const [viewUser, setViewUser] = useState({
        _id: userId,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        role: ""
    })


    useEffect(() => {
        if (viewUser._id !== undefined) {
            findUser(userId).then((currentUser) => {
                    setViewUser(currentUser)
                }
            )
        } else {
            setViewUser(user)
        }
    }, [userId])
    const [favoriteMovie, setYourFavoriteMovie] = useState([])
    const [yourReview, setReviews] = useState([])
    const [clicked, setClicked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentReview, setCurrentReview] = useState()
    const [followingClicked, setFollowingClicked] = useState(false)
    const [followerClicked, setFollowerClicked] = useState(false)
    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])
    const sameUser = user._id === viewUser._id
    const [isItFollow, setisItFollow] = useState(false)
    const openModal = (review) => {
        setCurrentReview(review)
        setClicked(true)
    }
    const openFollowing = () => {
        setFollowingClicked(true)
    }

    const openFollower = () => {
        setFollowerClicked(true)
    }
    const openEditModal = () => {
        setEdit(true)
    }

    console.log(followerClicked)

    useEffect(() => {
        if (viewUser.username !== "" && user.username !== undefined) {
            isItFollowing(user._id, userId).then((isItfollow) => {
                setisItFollow(isItfollow.length ===1)
                }
            )
        }
    }, [viewUser])

    useEffect(() => {
        if (viewUser.username !== "") {
            findMoviedByUser(viewUser.username).then(
                favoriteMovie => {
                    setYourFavoriteMovie(favoriteMovie)
                })
        }
    }, [viewUser])

    useEffect(() => {
        if (viewUser.username !== "") {
            findRecentReviewsByUsername(viewUser.username).then(
                reviews => {
                    setReviews(reviews)
                })
        }
    }, [viewUser])

    useEffect(() => {
        if (viewUser.username === undefined && user.username !== "") {
            findFollowing(user._id).then(
                following => {
                    setFollowing(following)
                })
        }else{
            findFollowing(viewUser._id).then(
                follower => {
                    setFollowing(follower)
                })
        }
    }, [])

    useEffect(() => {
        if (viewUser.username === undefined && user.username !== "") {
            findFollower(user._id).then(
                follower => {
                    setFollower(follower)
                })
        }else{
            findFollower(viewUser._id).then(
                follower => {
                    setFollower(follower)
                })
        }
    }, [])
    const deleteReview = async (username, movie) => {
        await deleteReviews(username, movie)
        setReviews(
            yourReview.filter((review) => (review.movie !== movie))
        )
    }

    const followUser = async () => {
        // followerId = user._id
        // followId = id
        if (user._id !== undefined) {
            await followUser(user._id, userId)
            setisItFollow(true)
        }
    }

    const unfollowUser = async () => {
        if (user._id !== undefined) {
            await unfollowUser(user._id, userId)
            setisItFollow(false)
        }
    }
    return (
        <div className="page w-100 p-0">
            <div className="row mb-3 g-0">
                <div>
                    <div className="text-center">
                        <h5 className="my-3 text-white">{viewUser.firstName + " " + viewUser.lastName}</h5>
                        <p className=" mb-1 text-white">{viewUser.email}</p>
                        <p className=" mb-4 text-white">{viewUser.dob.substring(0, 10)}</p>
                        <div className="d-flex justify-content-center mb-2">
                            {(user._id !== viewUser._id) &&
                                <div>
                                    {!isItFollow ?
                                    <button type="button" onClick={followUser} className="btn btn-primary me-2">Follow</button>:
                                    <button type="button" onClick={unfollowUser} className="btn btn-primary me-2">UnFollow</button>
                                    }
                                    <button type="button" className="btn btn-outline-primary me-2">Message</button>
                                </div>}
                            {(user._id === viewUser._id) &&
                                <button onClick={openEditModal} className='btn btn-success ms-1 me-2'>
                                    Edit Profile
                                </button>}
                            <button className="btn btn-info me-2" onClick={openFollowing}>Following</button>
                            <button className="btn btn-light" onClick={openFollower}>Follower</button>
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
                            <MovieCards sameUser={sameUser} key={index} movies={movie} favoriteMovie={favoriteMovie} setYourFavoriteMovie={setYourFavoriteMovie}/>
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
                                                {(user._id === viewUser._id)&&
                                                <div className="ms-auto">
                                                    <button onClick={() => deleteReview(review.username, review.movie)}
                                                            className="btn btn-danger me-2">Delete
                                                    </button>
                                                    <button onClick={() => openModal(review)}
                                                            className="btn btn-secondary">Modify
                                                    </button>
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                        {clicked &&
                            <ReviewForProfile clicked={clicked} setClicked={setClicked} setYourReview={setReviews}
                                              yourReivew={currentReview} listReivews={yourReview}/>}
                        {edit && <EditProfile setEdit={setEdit} edit={edit}/>}
                        {followerClicked && <FollowList clicked={followerClicked} setClicked={setFollowerClicked} list={follower}/>}
                        {followingClicked && <FollowList clicked={followingClicked} setClicked={setFollowingClicked} list={following}/>}
                    </div>
                }
            </div>
        </div>

    )
}

export default Profile;