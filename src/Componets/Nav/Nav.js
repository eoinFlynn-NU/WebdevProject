import "./Nav.css"
import northeastern from '../../northeastern.png'
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

function Nav() {

    const {pathname} = useLocation();
    const user = useSelector((state) => state.userReducer.user);

    return (
        <nav className="nav bg-black nav-fill  justify-content-center w-100">
            <Link to="/home"
                  className={`nav-link ${pathname.includes("home") ? "active" : ""}`}><img src={northeastern}
                                                                                           alt="logo"/></Link>
            <Link to="/home"
                  className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>Home</Link>
            {user._id === undefined &&
                <Link to="/login"
                      className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>Login</Link>}

            {user._id !== undefined && <Link to="/profile"
                                             className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>Profile</Link>}
            <Link to="/search"
                  className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>Search</Link>

            {user._id === undefined && <Link to="/register"
                                             className={`nav-link ${pathname.includes("/register") ? "active" : ""}`}>Register</Link>}
            {/*{user._id !== undefined &&*/}
            {/*    <div>*/}
            {/*        <button className="btn btn-outline-danger">*/}
            {/*            Sign Out*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*}*/}
        </nav>
    );
}
export default Nav;