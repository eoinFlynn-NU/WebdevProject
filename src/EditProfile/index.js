import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateProfile} from "../Client/Detail/DetailClient";
import {updateUser} from "../Reducer/userReducer";

function EditProfile({setEdit, edit}) {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({
        _id : user._id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role : user.role
    })

    const closeModal = () => {
        setEdit(false);
    };

    const editProfile = async() =>{
        await updateProfile(userInfo)
        dispatch(updateUser(userInfo))
        setEdit(false)
    }
    return (
        <div>
            {edit && (
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
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor={"username"}>Username</label>
                                        <input className="form-control"
                                               type="text"
                                               id="username"
                                               defaultValue={user.username}
                                               onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={"username"}>Email</label>
                                        <input className="form-control"
                                               type="text"
                                               id="username"
                                               defaultValue={user.email}
                                               onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={"password"}>Password</label>
                                        <input className="form-control"
                                               type="text"
                                               id="password"
                                               defaultValue={user.password}
                                               onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="form-group me-auto">
                                            <label htmlFor={"firstName"}>First Name</label>
                                            <input className="form-control"
                                                   type="text"
                                                   id="firstName"
                                                   defaultValue={user.firstName}
                                                   onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={"lastName"}>last Name</label>
                                            <input className="form-control"
                                                   type="text"
                                                   id="lastName"
                                                   defaultValue={user.lastName}
                                                   onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={"dob"}>Date of Birth</label>
                                        <input className="form-control"
                                               type="date"
                                               id="dob"
                                               defaultValue={user.dob.substring(0, 10)}
                                               onChange={(e) => setUserInfo({...userInfo, dob: e.target.value})}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={editProfile}>
                                    Modify
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Backdrop for the modal (optional) */}
            {edit && <div className="modal-backdrop show" onClick={closeModal}></div>}
        </div>
    )
}

export default EditProfile;