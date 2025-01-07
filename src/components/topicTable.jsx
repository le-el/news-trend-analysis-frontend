import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import "./table.css";

const TopicTable = ({ id, topic }) => {
    const [data, setData] = useState([
        { month: '2023.03', article_amount: "215", average_sentiment: "0.8" },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch data here and set it in state
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/topic/${id}`, {
                    headers: {
                        'ngrok-skip-browser-warning': true
                    }
                });
                console.log("this is response==>", response.data);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleResultDisplay = (month) => {
        navigate(`${location.pathname}/articles/${month}`, {
            state: {
                topic_name: topic
            }
        });
    };

    if (loading) {
        return (
            <div className="loading-container flex justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Date(YY/MM)</th>
                    <th>Amount</th>
                    <th>Average Sentiment</th>
                    <th>Result Display</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.month}</td>
                        <td>{item.article_amount}</td>
                        <td>{item.average_sentiment}</td>
                        <td>
                            <IconButton color="primary" aria-label="display results" onClick={() => handleResultDisplay(item.month)}>
                                <VisibilityIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TopicTable;