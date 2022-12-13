import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setName}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        if (response.ok) {
            setError("");
            setSuccess("Login Success!");
            const content = await response.json();
            setName(content.name);
            console.log(response.data);
            navigate("/")
            window.location.reload();
        }
        else {
            setSuccess("");
            setError("Login Failed!");
            throw new Error('Something went wrong');
        }



    }


    return (
        <div className="form-signin m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" id="inputEmail" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>

            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
            <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
        </div>
    )
}

export default Login;