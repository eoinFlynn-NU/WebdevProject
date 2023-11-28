import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to="/HOME"/>}/>
        </Routes>
      </div>
    </HashRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
