import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return setError(data.message);
            }

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            setError("Something went wrong.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <h3>Login</h3>

                <div className="mb-3">

                    <label htmlFor="inputEmail">
                        Email address
                    </label>

                    <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        value={credential.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="inputPassword">
                        Password
                    </label>

                    <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        value={credential.password}
                        onChange={handleChange}
                    />

                    {error && (
                        <p>{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Submit"
                        }
                    </button>
                    <br /><br />
                    <h3>Not registered ? <Link className="nav-link" to="/signup">Signup</Link></h3>
                    

                </div>
            </form>
        </div>
    );
};

export default Login;