import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import images
import BackButton from '../../assets/img/backButton.png';
import BoldQ from '../../assets/img/BoldQ.png';
import grwmCharacter from '../../assets/img/grwmProfile.png';
import alphabetA from '../../assets/img/alphabetA.png';

// Import Components
import Side from '../../components/side';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function UnLoginQnADetail() {
    const [data, setData] = useState(null);
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();
    const { id } = useParams();

    // QnA 상세정보 불러옴
    useEffect(() => {
        const fetchQnADetail = async () => {
            try {
                const response = await api.get(`api/v1/questions/${id}`, {
                    headers: {
                        'Authorization': `${cleanToken}`,
                    },
                });
                setData(response.data);
                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchQnADetail();
    }, [id]);


    if (!data) {
        return <div>Loading...</div>;
    }

    // 1:1채팅 누를 시 이동
    const handleChat = () => {
        navigate(`/login`);
    }

    // 뒤로가기 버튼
    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                
                    <div className="mb-4">
                        <img src={BackButton} alt="BackButton" className="w-7 h-7 cursor-pointer" onClick={handleBack}/>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src={BoldQ} alt="Q" className="w-8 h-7 mr-2 mt-5 mb-5" onClick={handleBack} />
                        <h2 className="text-xl font-bold">{data.question.title}</h2>
                    </div>
                    <div className="mb-4 p-4 bg-[#E7F2EC] rounded-lg">
                        <p>{data.question.content}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src={grwmCharacter} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                        <p className="font-semibold">{data.question.member.name}</p>
                        <button className="ml-auto bg-[#E7F2EC] text-black font-bold rounded-lg px-4 py-2" onClick={handleChat}>1:1채팅</button>
                    </div>
                    <div className="mb-4">
                        <img src={alphabetA} alt="A" className="w-8 h-7 mt-10 mb-5" />
                        {data.answers && data.answers.length > 0 ? (
                            data.answers.map((answer) => (
                                <div key={answer.id} className="flex items-center mb-2 p-4 bg-[#56C08C] rounded-lg">
                                    <img src={grwmCharacter} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                                    <div>
                                        <p className="font-semibold">{answer.member.name}</p>
                                        <p>{answer.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='font-bold text-gray-300'>답글이 없습니다.</p>
                        )}
                    </div>
                    <div className="fixed bottom-0 left-[765px] w-[512px] bg-white rounded-b-2xl shadow z-10 p-4">
                        <div className="flex items-center ">
                        <p className="flex-grow bg-[#E7F2EC] text-center text-gray-400 rounded-full p-3 mr-2">로그인 후 답글을 달아보세요</p>
                    </div>
                    </div>
                </div>
            
        </div>
    );
}

export default UnLoginQnADetail;
