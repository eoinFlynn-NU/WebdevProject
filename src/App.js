import './App.css';
import {HashRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import Home from './home';
import Search from "./Search";
import Profile from "./Profile";
import Register from "./Register";
import Details from "./Details";
import Nav from "./componets/Nav/Nav";
import Login from "./Login";
import Review from "./Review";

function App() {
    return (
        <HashRouter>
            <div className="html w-100">
                <Nav/>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/search' element={<Search/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/detail' element={<Details/>}/>
                    <Route path='/review' element={<Review/>}/>
                </Routes>
            </div>
    </HashRouter>
  );
}

export default App;
