import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

const Article = () => {
    const { id, month, article_id } = useParams()

    const [data, setData] = useState({
        'date': '',
        'time': '',
        'url': '',
        'title': '',
        'body': '',
        'source': '',
        'image': '',
        'sentiment': '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/topic/${id}/article/${article_id}`);
                console.log("this is response==>", response.data);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="w-2/3 mx-auto rounded-md">
                <div className="text-4xl text-violet-50 p-5 font-bold text-center w-10/12 mx-auto">
                    {data.title}
                </div>
                <div className="flex justify-end text-violet-50">
                    <div className="mx-2">
                        {data.source}
                    </div>
                    <div className="mx-2">
                        {data.date} {data.time}
                    </div>
                    <div className="mx-2">
                        {parseFloat(data.sentiment).toFixed(2)}({parseFloat(data.sentiment) >= 0.5 ? '😀' : parseFloat(data.sentiment) <= -0.5 ? '😞' : '😐'})
                    </div>
                </div>
                <img src={data.image} className="w-4/12 mx-auto p-5 rounded-md" />
                <div className="text-neural-50 text-2xl text-justify font-medium p-5 h-2/12">
                    {data.body.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Article