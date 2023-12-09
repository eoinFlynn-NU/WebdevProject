import "./Nav.css"
import northeastern from '../../northeastern.png'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { signOutUser } from "../../Client/Account /AccountClient";
import { setUser } from "../../Reducer/userReducer";
import { Dropdown } from 'react-bootstrap';


function Nav() {

    const { pathname } = useLocation();
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = async () => {
        await signOutUser()
        dispatch(setUser([]))
        navigate("/home")
    }
    

    return (
        <nav className="nav bg-black nav-fill  justify-content-center w-100">

            <Link to="/home"
                className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>
                <img src={northeastern} alt="logo" /> NEU Movie Review
            </Link>

            <Link to="/home"
                className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>Home</Link>
            <Link to="/search"
                className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>Search</Link>
            {user._id !== undefined && <Link to={`/profile`}
                className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>Profile</Link>}
            {user._id === undefined &&
                <Link to="/login"
                    className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>Login</Link>}
            {user._id === undefined && <Link to="/register"
                className={`nav-link ${pathname.includes("/register") ? "active" : ""}`}>Register</Link>}
            <div className="nav-item">
            {user._id !== undefined &&
                <div>
                    {/* <button onClick={() => signOut()} className="btn btn-outline-danger">
                        Sign Out
                    </button> */}
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                           Signed in as {user.username} 
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate("/profile")}>go to profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/home")}>Go to Home</Dropdown.Item>
                            <Dropdown.Item onClick={() => signOut()}>sign out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>


            }
            </div>
        </nav>
    );
}
export default Nav;