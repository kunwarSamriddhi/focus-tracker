import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);

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

    const endSession=()=>{
        
    }

    const activeSession = sessions.find(
        (session) => session.endTime === null
    );

    return (
        <div>
            <h1>Dashboard</h1>

            {sessions.map((session) => (
                <div key={session._id}>

                    <p>Start: {session.startTime}</p>

                    <p>End: {session.endTime}</p>

                </div>
            ))}


            {activeSession ? (
                <button onClick={endSession}>End Session</button>
            ) : (
                <button onClick={startSession}>
                    Start Session
                </button>
            )
            }
        </div>
    )
}

export default Dashboard;
