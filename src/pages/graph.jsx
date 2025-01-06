import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SelectButton from "../components/selectButton"
import Chart from "../components/chart"
import axios from "axios";

const Graph = () => {

    const [data, setData] = useState([
        { month: '', article_amount: '', average_sentiment: '' },
    ]);

    const location = useLocation();
    const { id } = useParams();

    const { topic } = location.state || {};

    useEffect(() => {
        // Fetch data here and set it in state
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/topic/${id}`);
                console.log("this is response==>", response.data);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='text-center text-4xl font-sans text-sky-600 mt-10'>
                Topic:
                <span className="ml-5 text-pink-700">
                    {topic}
                </span>
            </div>
            <div className="w-10/12 mx-auto">
                {/* <div className="flex justify-end">
                    <SelectButton />
                </div> */}
                <div className="mt-20">
                    <Chart data={data} />
                </div>
            </div>
        </>
    );
};

export default Graph;