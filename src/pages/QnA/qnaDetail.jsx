import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

function QnADetail() {
    const [data, setData] = useState(null);
    const [reply, setReply] = useState('');
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();
    const { id } = useParams();

   
    // QnA 상세정보 불러옴
    // 데이터 불러오는 함수 분리
    const fetchQnADetail = async () => {
        try {
            const response = await api.get(`api/v1/questions/${id}/authentication`, {
                headers: {
                    'Authorization': `${cleanToken}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        fetchQnADetail();
    }, [id]);

    // 답글 제출 후 데이터 재요청
    const handleReply = async () => {
        if (reply.trim().length > 0) {
            try {
                await api.post(`api/v1/questions/${id}/answers`, {
                    content: reply,
                }, {
                    headers: {
                        'Authorization': `${cleanToken}`,
                    },
                });
                setReply(''); // 입력 필드 비우기
                fetchQnADetail(); // 답변 제출 후 데이터 다시 불러오기
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('No content to submit');
        }
    };
    

    if (!data) {
        return <div>Loading...</div>;
    }

    // 1:1채팅 누를 시 이동
    const handleChat = () => {
        navigate(`/chat`);
    }

    // 뒤로가기 버튼
    const handleBack = () => {
        navigate(-1);
    }

    const handleInput = (e) => {
        setReply(e.target.value);
        
        if (data.isWritten && reply.length>0 ) {
            setReply('');
            return (
                <PopupQnA />
            );
        }
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
                    <div className="mb-20">
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
                            <input
                                className="flex-grow bg-[#E7F2EC] rounded-full p-2 mr-2"
                                onChange={handleInput}
                                value={reply}
                                placeholder="답변을 입력하세요"
                            />
                            <button className="bg-green-500 text-white rounded-full px-4 py-2" onClick={handleReply}>
                                답변
                            </button>
                        </div>
                    </div>
                    {!data.isWritten && <PopupQnA />}        
                    </div>

                </div>

    );
}

function PopupQnA() {
    return (
        <div className='font-bold'>
            <p>내가 작성한 질문 또는 이미 답변을 등록한 질문은</p>
            <p><span className='text-green-300'>답변</span>을 남길 수 없어요</p>
            <button className='bg-green-300 text-white'>
                질문으로 돌아가기
            </button>
        </div>
    )
}

export default QnADetail;
