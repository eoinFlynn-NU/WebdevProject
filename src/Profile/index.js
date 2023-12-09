import {useDispatch, useSelector} from "react-redux";
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
import {useNavigate} from "react-router";
import {findFollower, findFollowing, isItFollowing} from "../Client/followClient/followClient";
import {updateFollower} from "../Reducer/followerReducer";
import {updateFollowing} from "../Reducer/followingReducer";

function Profile() {
    let {userId} = useParams()
    const dispatch = useDispatch();
    let user = useSelector((state) => state.userReducer.user)
    let followerClicked = useSelector((state) => state.followerReducer.follower)
    let followingClicked = useSelector((state) => state.followingReducer.following)

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
    }, [userId, user, viewUser._id])
    const [favoriteMovie, setYourFavoriteMovie] = useState([])
    const [yourReview, setReviews] = useState([])
    const [clicked, setClicked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentReview, setCurrentReview] = useState()
    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])
    const sameUser = user._id === viewUser._id
    const navigate = useNavigate();

    const goToAdmin = () => {
        navigate(`/admin`);
    }


    const [isItFollow, setisItFollow] = useState(false)
    const openModal = (review) => {
        setCurrentReview(review)
        setClicked(true)
    }
    const openFollowing = () => {
        console.log(followingClicked)
        dispatch(updateFollowing(true))
    }

    const openFollower = () => {
        dispatch(updateFollower(true))
    }
    const openEditModal = () => {
        setEdit(true)
    }

    useEffect(() => {
        if (viewUser.username !== "" && user.username !== undefined) {
            isItFollowing(user._id, userId).then((isItfollow) => {
                setisItFollow(isItfollow.length === 1)
            }
            )
        }
    }, [viewUser, user._id, user.username, userId])

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
        } else {
            findFollowing(viewUser._id).then(
                follower => {
                    setFollowing(follower)
                })
        }
    }, [user._id, user.username, viewUser._id, viewUser.username])

    useEffect(() => {
        if (viewUser.username === undefined && user.username !== "") {
            findFollower(user._id).then(
                follower => {
                    setFollower(follower)
                })
        } else {
            findFollower(viewUser._id).then(
                follower => {
                    setFollower(follower)
                })
        }
    }, [user._id, user.username, viewUser._id, viewUser.username])

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


    const lastReview = (reviews) => {
        const s = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        return s[0];
    }

    const mostRecentObject = lastReview(yourReview);

    return (
        <div className="page w-100 p-0" style={{height: "100%"}}>
            <div className="row">
                <div className="profile">
                    <div>
                        <h1 className="text-center">profile</h1>
                        <h5 className="my-3 text-white margin-left">{viewUser.firstName + " " + viewUser.lastName}</h5>
                        <h5 className="my-3 text-white margin-left">{viewUser.email}</h5>
                        <p>Followers : <span className="counts "> {follower.length} </span></p>
                        <p>Following : <span className="counts ">{following.length}</span></p>
                        <div>
                        </div>
                        <div className="margin-top  d-flex justify-content-center mb-2 ">
                            {(user._id !== viewUser._id) &&
                                <div>
                                    {!isItFollow ?
                                        <button type="button" onClick={followUser}
                                                className="btn btn-primary me-2">Follow</button> :
                                        <button type="button" onClick={unfollowUser}
                                                className="btn btn-danger me-2">UnFollow</button>
                                    }
                                    <button type="button" className="btn btn-outline-primary me-2">Message</button>
                                </div>}
                            {(user._id === viewUser._id) &&
                                <button onClick={openEditModal} className='btn btn-success ms-1 me-2'>
                                    Edit Profile
                                </button>}
                            {(user.role === 'ADMIN' && user._id === viewUser._id) &&
                                <button className='btn btn-info ms-1 me-2' onClick={() => goToAdmin()}>
                                    Admin Page
                                </button>}
                            <button className="btn btn-light me-2" onClick={openFollowing}>
                                Following
                            </button>
                            <button className="btn btn-secondary me-2" onClick={openFollower}>
                                Follower
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="row reviews">*/}
            {/*    <h1 className="text-white">Latest Review</h1>*/}
            {/*    {yourReview.length !== 0 &&*/}
            {/*        <div className="text-white d-flex flex-column" style={{ width: '60rem', overflowX: 'auto' }}>*/}
            {/*            <Link to={"/profile"} className="text-decoration-none">*/}
            {/*                <h5>{mostRecentObject.username}</h5>*/}
            {/*            </Link>*/}
            {/*            <h>Date: {mostRecentObject.date}</h>*/}
            {/*            <p>Movie: {mostRecentObject.movie}</p>*/}
            {/*            <p>Rating: {mostRecentObject.rating}</p>*/}
            {/*            <p>{mostRecentObject.review}</p>*/}
            {/*        </div>*/}

            {/*    }*/}
            {/*</div>*/}

            <div className="row g-0 h-100 movieList">
                {favoriteMovie.length > 1 &&
                    <div>
                        <div className="text-center">
                            <h1 className="text-white">Favorite Movie</h1>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {
                                favoriteMovie.map((movie, index) => (
                                    <MovieCards
                                        sameUser={sameUser}
                                        key={index}
                                        movies={movie}
                                        favoriteMovie={favoriteMovie}
                                        setYourFavoriteMovie={setYourFavoriteMovie}
                                    />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="row g-0 ">
                {yourReview.length !== 0 &&
                    <div className="reviews ms-auto me-auto pt-4 align-content-center"
                         style={{width: '60rem', overflowX: 'auto'}}>
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
                                                {(user._id === viewUser._id) &&
                                                    <div className="ms-auto">
                                                        <button
                                                            onClick={() => deleteReview(review.username, review.movie)}
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
                    </div>
                }
            </div>
            {followerClicked && <FollowList list={follower} followerList={true}/>}
            {followingClicked && <FollowList list={following} followerList={false}/>}
            {clicked &&
                <ReviewForProfile clicked={clicked} setClicked={setClicked} setYourReview={setReviews}
                                  yourReivew={currentReview} listReivews={yourReview}/>}
            {edit && <EditProfile setEdit={setEdit} edit={edit}/>}
        </div>

    )
}

export default Profile;