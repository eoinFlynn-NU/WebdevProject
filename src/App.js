import './App.css';
import { HashRouter } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router';
import Home from './home';
import Search from "./Search";
import Profile from "./Profile";
import Register from "./Register";
import Details from "./Details";
import Nav from "./componets/Nav/Nav";

function App() {
    return (
        <HashRouter>
            <Nav/>
            <div>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/search' element={<Search/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/login' element={<Profile/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/detail' element={<Details/>}/>
                </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
