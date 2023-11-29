import Nav from "../Nav";
import AnonymousHome from "./AnonymousHome";
import "./home.css"
import "bootstrap"




function Home() {
    return (
        <div className="container">
            <Nav/>
            <AnonymousHome/>
        </div>
    )
}
export default Home