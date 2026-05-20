import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = credential;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
            );
            const data = await response.json();
            console.log(data);

            localStorage.setItem("token", data.token);
            navigate("/dashboard");

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div className="mb-3">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id='inputEmail' name='email' value={credential.email} onChange={handleChange} />

                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id='inputPassword' name='password' value={credential.password} onChange={handleChange} />

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
