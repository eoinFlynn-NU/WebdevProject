import {useState} from "react";
import {useSelector} from "react-redux";
import * as client from "../../src/Client/Detail/DetailClient"
import {useNavigate} from "react-router";

function Review({movie, clicked, setClicked, setYourReview, yourReivew}) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);
    const yourReivewc = yourReivew.length === 1 ? yourReivew[0] : {
        date: "",
        rating: "",
        review: ""
    }

    const [review, setReview] = useState({
        _id: yourReivewc._id,
        movie: movie.Title,
        username: user.username,
        date: yourReivewc.date,
        rating: yourReivewc.rating,
        review: yourReivewc.review
    })

    const openModal = () => {
        setClicked(true);
    };

    const closeModal = () => {
        setClicked(false);
    };

    const submitForm = async () => {
        try {
            if (user.username !== undefined) {
                await client.postReview(review)
                setYourReview([review])
                setClicked(false);
            }else {
                navigate("/register")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateReview = async () => {
        try {
            await client.updateReview(review)
            setYourReview([review])
            setClicked(false);
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            {clicked && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Review</h5>
                                <button type="button" className="close btn btn-danger" onClick={closeModal}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body d-flex flex-row">
                                <img className="me-2" src={movie.Poster}/>
                                <form>
                                    <h3>{movie.Title}</h3>
                                    <div className="form-group">
                                        <label htmlFor="date">Date:</label>
                                        <input className="form-control"
                                               type="date"
                                               id="date"
                                               defaultValue={yourReivewc.date.substring(0, 10)}
                                               onChange={(e) => setReview({...review, date: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rating">Rating:</label>
                                        <input className="form-control"
                                               type="number"
                                               placeholder="0"
                                               min="0"
                                               step="0.1"
                                               max="10"
                                               id="rating"
                                               defaultValue={yourReivewc.rating}
                                               onChange={(e) => setReview({...review, rating: e.target.value})}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description:</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="5"
                                                  defaultValue={yourReivewc.review}
                                                  onChange={(e) => setReview({
                                                      ...review,
                                                      review: e.target.value
                                                  })}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                {(yourReivewc.review === "") ?
                                    <button type="button" className="btn btn-primary" onClick={submitForm}>
                                        Submit
                                    </button> :
                                    <button type="button" className="btn btn-primary" onClick={updateReview}>
                                        Modify
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Backdrop for the modal (optional) */}
            {clicked && <div className="modal-backdrop show" onClick={closeModal}></div>}
        </div>
    )
}

export default Review;