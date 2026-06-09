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

    const handleLogout = async() => {
        if(activeSession){
            await endSession();
        }
        localStorage.removeItem("token");
        navigate("/login");
    }


    return (
        <div>
            <h1 className='text-4xl font-bold text-blue-500'>Dashboard</h1>
            <h2>Your focus sessions: </h2>

            {activeSession ? (
                <div>
                    <p>Start: {new Date(activeSession.startTime).toLocaleString()}</p>

                    <p>End: Status: Active</p>

                    <p>Duration: {hours}h {minutes}m</p>
                </div>
            ) : (
                <p>No active sessions</p>
            )}

            {activeSession ? (
                <button onClick={endSession}>End Session</button>
            ) : (
                <button onClick={startSession}>
                    Start Session
                </button>
            )
            }
            <br /><br />
            <button onClick={() => navigate("/history")}>View History</button>

            <br /><br />
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard;
