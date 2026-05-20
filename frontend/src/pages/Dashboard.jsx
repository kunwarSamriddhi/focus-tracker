import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/dashboard");
            return;
        }

        const fetchSessions = async () => {
            try {
                const response = fetch("http://localhost:5000/api/auth/get-session", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                const data = await response.json();
                console.log(data);
                setSessions(data.sessions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSessions();

    }, []);


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard;
