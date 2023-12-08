import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function FollowList({clicked, setClicked, list}) {
    const navigate = useNavigate()
    const closeModal = () => {
        setClicked(false);
    };
    console.log(list)
    const findUser = async (userId) => {
        const user = await findUser(userId)
        return user
    }
    return (
        <div>
            {clicked && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Follow</h5>
                                <button type="button" className="close btn btn-danger" onClick={closeModal}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body d-flex flex-row">
                                <ul className="list-group">
                                    {list.map((follower, index) => (
                                        <Link to={`/profile/${follower.follower}`}>
                                            {follower.follower}
                                        </Link>

                                    ))}
                                </ul>
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

export default FollowList;