import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import images
import skinIcon from '../../assets/img/skinIcon.png';
import healthIcon from '../../assets/img/healthIcon.png';
import vitaminIcon from '../../assets/img/vitaminIcon.png';
import BackButton from '../../assets/img/backButton.png';

// 컴포넌트 불러오기
import Side from '../../components/side';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function WriteQuestion() {
    const [category, setCategory] = useState('skin');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            category: category.toUpperCase(),
            title: title,
            content: content,
        };

        try {
            const response = await api.post('api/v1/questions', requestBody, {
                headers: {
                    Authorization: `${cleanToken}`,
                },
            });
            console.log(response.data);
            navigate(`/qna`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                <div className='flex items-center mb-4 cursor-pointer' onClick={handleBack}>
                    <img src={BackButton} alt='BackButton' className='w-6 h-6 mr-2 cursoer-pointer' />
                    <h1 className='text-xl font-bold'>질문 작성</h1>
                </div>

                <p className='text-gray-500 mb-4'>당신의 고민은 무엇인가요?</p>

                <div className='flex justify-center mt-4 mb-4 space-x-4'>
                    <button
                        className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full ${
                            category === 'skin' ? 'border-green-500 bg-green-100' : 'border-gray-300'
                        }`}
                        onClick={() => setCategory('skin')}
                    >
                        <img src={skinIcon} alt='skinIcon' className='w-10 h-10 mr-2' />
                        <span>피부</span>
                    </button>
                    <button
                        className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full ${
                            category === 'health' ? 'border-green-500 bg-green-100' : 'border-gray-300'
                        }`}
                        onClick={() => setCategory('health')}
                    >
                        <img src={healthIcon} alt='healthIcon' className='w-10 h-10 mr-2' />
                        <span>헬스</span>
                    </button>
                    <button
                        className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full ${
                            category === 'nutrients' ? 'border-green-500 bg-green-100' : 'border-gray-300'
                        }`}
                        onClick={() => setCategory('nutrients')}
                    >
                        <img src={vitaminIcon} alt='vitaminIcon' className='w-10 h-10 mr-2' />
                        <span>영양제</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input
                            type='text'
                            placeholder='제목을 입력하세요'
                            className='w-full p-3 border rounded-lg bg-green-100'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <textarea
                            placeholder='고민을 말해주세요'
                            className='w-full p-3 border rounded-lg bg-green-100'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='w-full py-3 bg-green-500 text-white rounded-lg'>
                        제출하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WriteQuestion;
