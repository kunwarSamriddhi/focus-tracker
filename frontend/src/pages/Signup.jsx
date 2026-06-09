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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center text-pink-500">Signup</h2>

                <div className="mb-3">

                    <label htmlFor="inputEmail" className="block mb-2 font-medium">Email address</label>

                    <input type="email" id='inputEmail' name='email' value={credential.email} onChange={handleChange} className=" w-full 
                                    p-3
                                    border
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-pink-300 "
                    />

                    <br /> <br />
                    <label htmlFor="inputPassword" className="block mb-2 font-medium">Password</label>

                    <input type="password" id='inputPassword' name='password' value={credential.password} onChange={handleChange} className=" w-full 
                                    p-3
                                    border
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-pink-300 "
                    />

                    <br />

                    {error &&
                        <p className="text-red-500 text-center">
                            <br />
                            {error}
                        </p>
                    }

                    <br />
                    <button type="submit" className=" bg-pink-400
                                    hover:bg-pink-500
                                    text-white
                                    font-semibold
                                    py-3
                                    px-6
                                    rounded-xl
                                    transition
                                  "
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup
