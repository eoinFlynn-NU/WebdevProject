import {useState} from "react";
import {useNavigate} from "react-router";
import * as client from "../Client/Detail/DetailClient";

function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        firstname: "", lastname: "",
        username: "", password: "", role: ""
    });
    const navigate = useNavigate();
    const signUp = async () => {
        try {
            await client.signup(credentials)
            navigate("/profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    console.log(credentials)

    return (
        <div className="sign-background">
            <div className=" sign-box bg-secondary w-50 ms-auto me-auto p-3 border rounded border-dark">
                <h1 className=" text-center">Sign Up</h1>
                <form>
                    <div className="d-flex flex-row mb-2">
                        <div className="form-group form-control-sm">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input id="exampleInputEmail1" className="form-control" value={credentials.firstname}
                                   onChange={(e) => setCredentials({...credentials, firstname: e.target.value})}/>
                        </div>
                        <div className="form-group ms-auto form-control-sm">
                            <label htmlFor="exampleInputEmail1">Last Name</label>
                            <input id="exampleInputEmail1" className="form-control" value={credentials.lastname}
                                   onChange={(e) => setCredentials({...credentials, lastname: e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-group mb-2 form-control-sm">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input id="exampleInputEmail1" className="form-control" value={credentials.username}
                               onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3 form-control-sm">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input id="exampleInputPassword1" className="form-control" value={credentials.password}
                               onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" value="ADMIN" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                        onChange={(e) => setCredentials({...credentials, role: e.target.value})}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Admin
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"  value="USER" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        onChange={(e) => setCredentials({...credentials, role: e.target.value})}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                User
                            </label>
                    </div>


                    <div className="d-flex flex-row">
                        <button type="submit" className={"btn btn-success ms-auto"} onClick={signUp}> Sign Up</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Register;