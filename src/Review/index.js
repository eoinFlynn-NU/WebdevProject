import {useState} from "react";
import {useSelector} from "react-redux";
import * as client from "../../src/Client/Detail/DetailClient"
function Review({movie, clicked, setClicked}) {
    const user = useSelector((state) => state.userReducer.user);
    const [review, setReview] = useState({movie: movie.Title, username: user.username ,date: "", rating: "", review: ""})
    const openModal = () => {
        setClicked(true);
    };

    const closeModal = () => {
        setClicked(false);
    };

    const submitForm = async () =>{
        try {
            await client.postReview(review)
            setClicked(false);
        }catch (e){
            console.log(e)
        }
    }
    return (
        <div>
            {clicked && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Review</h5>
                                <button type="button" className="close btn btn-danger" onClick={closeModal} aria-label="Close">
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
                                               onChange={(e) => setReview({...review, rating: e.target.value})}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description:</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="5"
                                                  onChange={(e) => setReview({...review, review: e.target.value})}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={submitForm}>
                                    Submit
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

export default Review;