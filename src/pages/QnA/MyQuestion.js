import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import images
import BackButton from '../../assets/img/backButton.png';
import alphabetQ from '../../assets/img/alphabetQ.png';
import grwmProfile from '../../assets/img/grwmProfile.png';

// 컴포넌트 불러오기
import Side from '../../components/side';

const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function MyQuestion() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    useEffect(() => {
        // 실제 API 호출 부분은 주석 처리
        const fetchMyQuestion = async () => {
            try {
                const response = await api.get('api/v1/questions/my-question', {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
                setData(response.data.questions);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMyQuestion();
    }, []);

    const handleClick = (id) => {
        navigate(`/qna/${id}`);
    };

    // 뒤로가기 버튼
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                <div className='flex mb-4'>
                    <img
                        src={BackButton}
                        alt='BackButton'
                        className='w-7 h-7 mr-5 cursor-pointer'
                        onClick={handleBack}
                    />
                    <h1 className='text-xl font-extrabold'>내 질문</h1>
                </div>

                {data.map((question) => (
                    <div
                        key={question.id}
                        onClick={() => {
                            handleClick(question.id);
                        }}
                        className={`mb-4 p-4 rounded-lg shadow-lg cursor-pointer ${
                            question.content ? 'bg-white' : 'bg-white'
                        }`}
                    >
                        <div className='text-right'>
                            <span className='text-xs text-gray-400 font-bold rounded-full p-2 bg-[#E7F2ED]'>
                                {question.content ? '답변 완료' : '답변 대기 중'}
                            </span>
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <div className='flex items-center'>
                                <img src={alphabetQ} alt='Q' className='w-6 h-6 mr-2' />
                                <h2 className='text-lg font-semibold'>{question.title}</h2>
                            </div>
                        </div>

                        <hr className='my-2' />
                        <RenderContent data={question} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// 댓글 여부에 따른 렌더링 컴포넌트
function RenderContent({ data }) {
    if (data.content) {
        return (
            <div>
                <div className='flex items-center'>
                    <img src={grwmProfile} alt='Profile' className='w-8 h-8 rounded-full mr-2 mb-2' />
                    <p className='font-semibold'>{data.member.name}</p>
                </div>

                <div className='text-gray-800 ml-2'>{data.content}</div>
            </div>
        );
    }

    return (
        <div className='flex items-center'>
            <img src={grwmProfile} alt='Profile' className='w-8 h-8 rounded-full mr-2' />
            <p className='font-semibold text-gray-500'>답변을 기다리는 중이에요</p>
        </div>
    );
}

export default MyQuestion;
