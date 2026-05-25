import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setCredential({
            ...credential,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const { email, password } = credential;

        if (!email || !password) {
            return setError("All fields are required.");
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
            );
            const data = await response.json();

            if (!response.ok) {
                return setError(data.message);
            }

            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>SignUp</h3>
                <div className="mb-3">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id='inputEmail' name='email' value={credential.email} onChange={handleChange} />

                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id='inputPassword' name='password' value={credential.password} onChange={handleChange} />

                    {error && <p>{error}</p>}
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
