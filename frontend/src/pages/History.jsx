import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const History = () => {
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

    const completedSessions = sessions.filter(
        session => session.endTime !== null
    );

    return (
        <div>
            <h1 className='text-4xl font-bold text-blue-500'>History</h1>
            {completedSessions.map((session) => {
                const formattedStart =
                    new Date(session.startTime).toLocaleString();

                const formattedEnd =
                    session.endTime
                        ? new Date(session.endTime).toLocaleString()
                        : "Session Active";

                const duration = new Date(session.endTime) - new Date(session.startTime);
                
                const minutes = Math.floor(duration / 1000 / 60);

                const hours = Math.floor(minutes / 60);

                const remainingMinutes = minutes % 60;

                return (
                    <div key={session._id}>

                        <p>Start: {formattedStart}</p>

                        <p>End: {formattedEnd}</p>

                        <p>Duration: {hours}h {remainingMinutes}m</p>

                        <hr />
                    </div>
                );

            })}
        </div>
    )
}

export default History
