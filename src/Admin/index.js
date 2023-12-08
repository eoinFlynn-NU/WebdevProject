import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import * as client from "../Client/Users/UsersClient";
import './admin.css'
import {BsTrash3Fill, BsPencil} from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";


function Admin() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
      const users = await client.findAllUsers();
      setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);
  
    return(
        <div className="home-background">
            <h1 className="text">Admin Page</h1>
            <div className="container-fluid side-padding">
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
                
                    <button className="btn btn-light margin-left"><FaRegUserCircle /> </button>
                    <button className="btn btn-light margin-left"><BsPencil /> </button>
                    <button className="btn btn-danger margin-left"><BsTrash3Fill /> </button>
              </div>
              </td>
            </tr>))}
        </tbody>
      </table>
            </div>
            
        </div>
    )
}
export default Admin;