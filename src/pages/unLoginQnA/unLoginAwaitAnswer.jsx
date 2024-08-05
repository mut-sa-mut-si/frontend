import React, { useState, useEffect, useRef } from 'react';

// Import images
import grwmProfile from '../../assets/img/grwmProfile.png';

// Import Component
import LoginPopup from '../../components/login_popup';

function UnLoginAwaitAnswer( {data} ) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLoginInfo, setShowLoginInfo] = useState(false);
    const popupRef = useRef();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000); // 3초마다 다음 게시물로 이동

        return () => clearInterval(intervalId);
    }, [data]);

    const handleClick = () => {
        setShowLoginInfo(true);
    }

    return (
        <div className="p-5 mb-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <h1 className="text-xl font-bold">답변을 기다리는 질문</h1>
                <p className="text-gray-300 font-bold">답변을 등록하고 그룸 포인트를 받아가세요</p>
            </div>

            <div className="overflow-hidden" style={{ height: 'fit-content' }}>
                {data.map((question, index) => (
                    <div
                        key={question.id}
                        className={`transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                    >
                        <div className="mb-4 rounded-lg">
                            <div className='bg-green-100 p-4 rounded-xl'>
                                <div className="flex items-center mb-3">
                                    <img src={grwmProfile} alt='Profile' className='w-10 h-10 rounded-full mr-3' />
                                    <p className="font-semibold">{question.questionWriter.name}</p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold mb-1">{question.title}</h2>
                                    <p className="text-gray-800">{question.content}</p>
                                </div>
                            </div>
                            <div>
                                <button className="w-full py-3 bg-green-500 mt-3 text-white font-bold rounded-lg hover:bg-green-600"
                                        onClick={handleClick}>
                                    답변 등록하고 50 그룸 포인트 받기
                                </button>
                            </div>
                        </div>
                        {showLoginInfo && <LoginPopup />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnLoginAwaitAnswer;