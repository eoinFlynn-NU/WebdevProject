import "./Nav.css"

import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav mt-2 container">
      <Link className={`nav-link ${pathname.includes("HOME") ? "active" : ""}`} to="/HOME">Home</Link>
      <Link className={`nav-link ${pathname.includes("SEARCH") ? "active" : ""}`} to="/SEARCH">Search</Link>
      <Link className={`nav-link ${pathname.includes("PROFILE") ? "active" : ""}`} to="/PROFILE">Profile</Link>
      <Link className={`nav-link ${pathname.includes("hello") ? "active" : ""}`} to="/LOGIN" >Login</Link>
    </nav>
  );
}
export default Nav;