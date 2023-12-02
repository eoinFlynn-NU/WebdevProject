import "./Nav.css"
import northeastern from '../../northeastern.png'

import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav bg-black nav-fill  justify-content-center w-100">
        <Link to="/home"
              className={`nav-link ${pathname.includes("home") ? "active" : ""}`}><img src={northeastern} alt="logo"/></Link>
        <Link to="/home"
              className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>Home</Link>
        <Link to="/login"
              className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>Login</Link>
        <Link to="/profile"
              className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>Profile</Link>
        <Link to="/search"
              className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>Search</Link>
        <Link to="/register"
              className={`nav-link ${pathname.includes("/register") ? "active" : ""}`}>Register</Link>
        <Link to="/detail"
              className={`nav-link ${pathname.includes("/detail") ? "active" : ""}`}>Detail</Link>
    </nav>
  );
}
export default Nav;