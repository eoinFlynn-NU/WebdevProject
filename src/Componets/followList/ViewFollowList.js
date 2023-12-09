import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {findFollower, findFollowing} from "../../Client/followClient/followClient";
import {click} from "@testing-library/user-event/dist/click";
import {findUser} from "../../Client/Account /AccountClient";

function ViewFollowList({clicked, setClicked, list ,followerList}) {
    const navigate = useNavigate()
    const [userNames, setUserNames] = useState([]);

    const closeModal = () => {
        setClicked(false);
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

    console.log(userNames)
    return (
        <div>
            {clicked && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black">{followerList ? "Follower" : "Following"}</h5>
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
            {click && <div className="modal-backdrop show" onClick={closeModal}></div>}
        </div>
    )
}

export default ViewFollowList;