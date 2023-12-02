import {useState} from "react";
import {useNavigate} from "react-router";
import './index.css'
import * as client from "../Client/Detail/DetailClient";
import {useDispatch, useSelector} from "react-redux";
import {setUser, updateUser} from "../Reducer/userReducer";


import {Link} from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const signin = async () => {
        await client.signIn(credentials);
        navigate("/home");
    };

    return (
        <div className="sign-background">
            <div className=" sign-box bg-secondary w-50 ms-auto me-auto p-3 border rounded border-dark">
                <h1 className=" text-center">Sign In</h1>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input id="exampleInputEmail1" className="form-control" value={credentials.username}
                               onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input id="exampleInputPassword1" className="form-control" value={credentials.password}
                               onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    </div>
                    <div className="d-flex flex-row">
                        <Link to="/register"
                              className={`btn btn-secondary`}>Register</Link>
                        <button type="submit" className={"btn btn-success ms-auto"} onClick={signin}> Signin</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Login;