import { useState } from "react";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const submit = async (e) => {
        e.preventDefault();

        try {
            await fetch(`${process.env.REACT_APP_API_END_POINT}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            .then(() => {
                setError("");
                setSuccess("Registration Success!");
                setName("");
                setEmail("");
                setPassword("");

            })
        } catch (err) {
            console.error();
            setSuccess("");
            setError("Registration was not succesful");
        }

    }

    return (
        <div className="form-signin m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <input className="form-control" placeholder="Name" required onChange={e => setName(e.target.value)}></input>
                <input type="email" className="form-control" id="inputEmail" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>

            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
            <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
        </div>
    )
}

export default Register