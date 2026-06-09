import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

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
        <div className='w-full'>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <h2 className="text-3xl font-bold text-center text-pink-500">
                    Login
                </h2>

                <div className="mb-3">

                    <label
                        htmlFor="inputEmail"
                        className="block mb-2 font-medium"
                    >
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        value={credential.email}
                        onChange={handleChange}
                        className=" w-full 
                                    p-3
                                    border
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-pink-300 "
                    />

                    <br />
                    <br />

                    <label
                        htmlFor="inputPassword"
                        className="block mb-2 font-medium"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        value={credential.password}
                        onChange={handleChange}
                        className=" w-full
                                    p-3
                                    border
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-pink-300 "
                    />

                    {error && (
                        <p className="text-red-500 text-center">
                            <br />
                            {error}
                        </p>
                    )}

                    <br />
                    <br />

                    <button
                        type="submit"
                        className=" bg-pink-400
                                    hover:bg-pink-500
                                    text-white
                                    font-semibold
                                    py-3
                                    px-6
                                    rounded-xl
                                    transition
                                  "
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Submit"
                        }
                    </button>

                    <br />

                    <h3 className='text-center'>Not registered ? <span className="nav-link 
                              text-pink-500 
                              cursor-pointer 
                              font-semibold" 
                    onClick={() => navigate("/signup")}>Signup</span></h3>

                </div>
            </form>
        </div>
    );
};

export default Login;