import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const TopicTable = ({ id, month }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoading, setImageLoading] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch data here and set it in state
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/articles`, {
                    params: {
                        id: id,
                        month: month
                    }
                }, {
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
    }, [id, month]);

    const handleViewArticle = (uri) => {
        navigate(`${location.pathname}/${uri}`);
    };

    const goToSource = (url) => {
        window.open(url, '_blank');
    };

    const handleImageLoad = (uri) => {
        setImageLoading(prevState => ({ ...prevState, [uri]: false }));
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
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Language</th>
                    <th>Sentiment</th>
                    <th>Words</th>
                    <th>View</th>
                    <th>Origin</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.uri}>
                        <td className='p-2'>
                            {imageLoading[item.uri] !== false && (
                                <div className="image-loading-container">
                                    <CircularProgress />
                                </div>
                            )}
                            <img
                                src={item.thumbnail}
                                className='w-44 mx-auto'
                                alt="thumbnail"
                                style={{ display: imageLoading[item.uri] === false ? 'block' : 'none' }}
                                onLoad={() => handleImageLoad(item.uri)}
                                onError={() => handleImageLoad(item.uri)}
                            />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.date}</td>
                        <td>{item.source}</td>
                        <td>{item.lang}</td>
                        <td>{item.sentiment}</td>
                        <td>{item.words}</td>
                        <td>
                            <IconButton color="primary" aria-label="view article" onClick={() => handleViewArticle(item.uri)}>
                                <VisibilityIcon />
                            </IconButton>
                        </td>
                        <td>
                            <IconButton color="primary" aria-label="go to source" onClick={() => goToSource(item.url)}>
                                <SendRoundedIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TopicTable;