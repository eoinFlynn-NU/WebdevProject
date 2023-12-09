import './App.css';
import {HashRouter} from 'react-router-dom';
import {Route, Routes, Navigate} from 'react-router';
import Home from './Home';
import Search from "./Search";
import Profile from "./Profile";
import Admin from "./Admin"
import Register from "./Register";
import Details from "./Details";
import Nav from "./Componets/Nav/Nav";
import Login from "./Login";
import Review from "./Review";
import {Provider} from "react-redux";
import store from "./Store/store";
import ViewProfile from "./Profile/viewUserProfile";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <div className="html w-100">
                    <Nav/>
                    <Routes>
                        <Route path='/' element={<Navigate to="/home"/>}/>
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/search' element={<Search/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profile/:userId' element={<ViewProfile/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/detail/:movieTitle' element={<Details/>}/>
                    </Routes>
                </div>
            </HashRouter>
        </Provider>
  );
}

export default App;
