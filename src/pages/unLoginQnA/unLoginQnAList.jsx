import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import grwmProfile from '../../assets/img/grwmProfile.png';
import alphabetQ from '../../assets/img/alphabetQ.png';

function UnLoginQnAList({ data }) {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setQuestions(data);
        }
    }, [data]);

    const handleClick = (id) => {
        navigate(`/qna/unathentication/${id}`);
    };

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-5">질문</h1>
            {questions.length > 0 ? (
                questions.map((q) => (
                    <div key={q.id} className="mb-4 p-4 bg-green-100 rounded-lg cursor-pointer"
                        onClick={()=>handleClick(q.id)}>
                        <div className="flex items-center mb-2">
                            <img src={grwmProfile} alt='Profile' className='w-8 h-8 rounded-full mr-2' />
                            <p className="font-semibold">{q.questionWriter.name}</p>
                        </div>
                        <div className="flex items-center">
                            <img src={alphabetQ} alt='Q' className='w-5 h-5 mr-2' />
                            <p className="text-gray-800">{q.title}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>질문이 없습니다.</p>
            )}
        </div>
    );
}

export default UnLoginQnAList;
