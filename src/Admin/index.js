import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../Client/Users/UsersClient";
import './admin.css'
import { BsTrash3Fill, BsPencil } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import EditProfile from "../EditProfile";
import {setUser, updateUser} from "../Reducer/userReducer";
import {useDispatch, useSelector} from "react-redux";

import * as accountClient from "../Client/Account /AccountClient"

function Admin() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)

    const selectUser = async (user) => {
        try {
        setEdit(true)
        dispatch(setUser(user))
        
        } catch (err) {
          console.log(err);
        }
      };
    

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => { fetchUsers(); }, []);

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();

    const goToUserPage = (userId) => {
        navigate(`/profile/${userId}`);
    }


    const registerNewUser = () => {
            navigate(`/register`);
        }

    return (
        <div className="home-background">
            <h1 className="text">Admin Page</h1>
            <div className="container-fluid side-padding">
                <div>
                <button className="btn btn-light margin-left" onClick={() => registerNewUser()}>Add User</button>
                </div>

                <h3 className="text">User List</h3>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Admin Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div>

                                        <button className="btn btn-light margin-left" onClick={() => goToUserPage(user._id)}><FaRegUserCircle /> </button>
                                        <button className="btn btn-light margin-left"  onClick={() => selectUser(user)} ><BsPencil /> </button>
                                        <button className="btn btn-danger margin-left" onClick={() =>{if(window.confirm(`Delete user ${user.username}` )){deleteUser(user)};}}><BsTrash3Fill /> </button>

                                    </div>
                                    {edit && <EditProfile setEdit={setEdit} edit={edit} />}

                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Admin;