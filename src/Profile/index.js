import {useSelector} from "react-redux";

function Profile(){
    const user = useSelector((state) => state.userReducer.user)
    console.log(user)
    return(
        <div>
            <p>{user.username.toString()}</p>
            <p>{user.firstName.toString()}</p>
            <p>{user.lastName.toString()}</p>
            <p>{user.role.toString()}</p>
        </div>
    )
}

export default Profile;