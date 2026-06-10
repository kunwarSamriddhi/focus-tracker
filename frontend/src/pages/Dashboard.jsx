import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);

    const [currentTime, setCurrentTime] = useState(Date.now());

    const fetchSessions = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/auth/get-session", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            const data = await response.json();
            setSessions(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        fetchSessions();

    }, [navigate]);

    const startSession = async () => {
        const token = localStorage.getItem("token");
        console.log("We're starting a session.");
        try {

            const response = await fetch("http://localhost:5000/api/auth/start-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(data);
            fetchSessions();
        } catch (error) {
            console.log(error);
        }

    }

    const endSession = async () => {
        const token = localStorage.getItem("token");
        try {

            const response = await fetch("http://localhost:5000/api/auth/end-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            console.log(data);
            fetchSessions();
        } catch (error) {
            console.log(error);
        }
    }

    const activeSession = sessions.find(
        session => session.endTime === null
    );

    let hours = 0;
    let minutes = 0;

    if (activeSession) {

        const duration = currentTime - new Date(activeSession.startTime);

        const totalMinutes = Math.floor(duration / 1000 / 60);

        hours = Math.floor(totalMinutes / 60);

        minutes = totalMinutes % 60;
    }

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const handleLogout = async () => {
        if (activeSession) {
            await endSession();
        }
        localStorage.removeItem("token");
        navigate("/login");
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-pink-500 mb-6">
                Dashboard
            </h1>

            <div className="bg-pink-100 rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    Current Session
                </h2>


                {activeSession ? (
                    <div className='space-y-3'>
                        <p>
                            <span className="font-semibold">
                                Status:
                            </span>{" "}
                            <span className="text-green-400">Active</span>
                        </p>

                        <p>
                            <span className='font-semibold'>Started</span>{" "}
                            : {new Date(activeSession.startTime).toLocaleString()}

                        </p>

                        <p>
                            <span className="font-semibold">
                                Duration:
                            </span>{" "}
                            {hours}h {minutes}m
                        </p>

                    </div>

                ) : (

                    <p className="text-gray-500">
                        No active session running
                    </p>

                )}
            </div>

            {activeSession ? (
                <button
                    onClick={endSession}
                    className="
                            bg-pink-400
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            mt-4
                            hover:bg-pink-500
                            transition
                    "
                >
                    End Session
                </button>
            ) : (
                <button
                    onClick={startSession}
                    className="
                            bg-pink-400
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            mt-4
                            hover:bg-pink-500
                            transition
                     "
                >
                    Start Session
                </button>
            )
            }
            <br /><br />
            <button
                onClick={() => navigate("/history")}
                className="
                    bg-white
                    border
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-pink-50
                "
            >
                History
            </button>

            <br /><br />

            <button
                onClick={handleLogout}
                className="
                    bg-white
                    border
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-pink-50
                "
            >
                Logout
            </button>
        </div>
    )
}

export default Dashboard;
