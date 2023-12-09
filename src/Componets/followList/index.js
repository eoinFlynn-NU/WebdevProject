import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {updateFollowing} from "../../Reducer/followingReducer";
import {updateFollower} from "../../Reducer/followerReducer";
import {useEffect, useState} from "react";
import {findUser} from "../../Client/Account /AccountClient";

function FollowList({list, followerList}) {
    const navigate = useNavigate()
    let followerClicked = useSelector((state) => state.followerReducer.follower)
    let followingClicked = useSelector((state) => state.followingReducer.following)
    const [userNames, setUserNames] = useState([]);

    const dispatch = useDispatch();
    let clicked = (followerClicked || followingClicked)
    const closeModal = () => {
        if (followerClicked){
            dispatch(updateFollower(false))
        }else{
            dispatch(updateFollowing(false))

        }

    };

    useEffect(() => {
        const fetchData = async () => {
            const names = [];
            for (let i = 0; i < list.length; i++) {
                const followerId = followerList ? list[i].follower : list[i].followed;
                const user = await findUser(followerId);
                const userName = `${user.firstName} ${user.lastName}`;
                names.push([userName, followerList ? list[i].follower : list[i].followed]);
            }
            setUserNames(names);
        };

        if (clicked) {
            fetchData();
        }

    }, [clicked, list, followerList]);
    console.log(clicked)
    return (
        <div>
            {clicked && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black">{followerClicked ? "Follower" : "Following"}</h5>
                                <button type="button" className="close btn btn-danger" onClick={closeModal}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body d-flex flex-row" >
                                <ul className="list-group">
                                    {userNames.map((follower, key) => (
                                        <Link to={`/profile/${follower[1]}`}>
                                            {follower[0]}
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