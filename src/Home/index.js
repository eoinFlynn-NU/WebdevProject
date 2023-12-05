import { useSelector } from "react-redux";
import LoggedInHome from "./LoggedInHome";
import BaseHome from "./BaseHome";
import "./home.css"



function Home(){
    const user = useSelector((state) => state.userReducer.user);
    const isLoggedIn = typeof user === 'object' && !Array.isArray(user);

    return(
        <div className="home-background">
            <h1 className="text-center text-white top-padding">NEU Movie Review</h1>
            {isLoggedIn ? <LoggedInHome /> : <BaseHome />}
        </div>
    )
}

export default Home;