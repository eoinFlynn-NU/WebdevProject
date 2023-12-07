import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as client from "../../src/Client/Detail/DetailClient"
import {findMovieDetail} from "../../src/Client/Detail/DetailClient";

function ReviewForProfile({clicked, setClicked, setYourReview, yourReivew, listReivews}) {
    const user = useSelector((state) => state.userReducer.user);
    const [movie, setMovie] = useState([])

    const [review, setReview] = useState({
        _id: yourReivew._id,
        movie: yourReivew.movie,
        username: yourReivew.username,
        date: yourReivew.date,
        rating: yourReivew.rating,
        review: yourReivew.review,
    })

    useEffect(() => {
        findMovieDetail(yourReivew.movie).then(
            movie => {
                setMovie(movie)
            }
        )
    }, []);

    const closeModal = () => {
        setClicked(false);
    };
    const updateReview = async () => {
        try {
            await client.updateReview(review)
            const newList = listReivews.filter((review) =>(review.movie !== yourReivew.movie))
            newList.push(review)
            setYourReview(newList)
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
                                               defaultValue={review.date.substring(0, 10)}
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
                                               defaultValue={review.rating}
                                               onChange={(e) => setReview({...review, rating: e.target.value})}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description:</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="5"
                                                  defaultValue={review.review}
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
                                <button type="button" className="btn btn-primary" onClick={updateReview}>
                                    Modify
                                </button>

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

export default ReviewForProfile;