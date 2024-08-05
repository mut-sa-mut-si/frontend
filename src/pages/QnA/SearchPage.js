import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Import images
import BackButton from '../../assets/img/backButton.png';

// Import Components
import Side from '../../components/side';
import QnADetail from './qnaDetail';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function SearchPage() {
    const [data, setData] = useState({ search: '', questions: [] });
    const navigate = useNavigate();
    // const { keyword } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchSearchPage = async () => {
            try {
                // 실제 API 호출을 사용하려면 아래 줄의 주석을 해제하십시오
                const response = await api.get(`api/v1/questions/search?keyword=${keyword}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSearchPage();
    }, [keyword]);

    // 질문 항목을 클릭했을 때 선택된 질문 ID를 상태로 설정하는 함수
    const handleClick = (id) => {
        navigate(`/qna/${id}`);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                {/* 초록색 박스 */}
                <div>
                    <div>
                        <button>
                            <img src={BackButton} alt='BackButton' className='w-7 h-7 cursor-pointer' />
                        </button>
                    </div>
                </div>
                <div className='mt-4 mb-4'>
                    <p className='text-lg font-bold'>
                        <span className='text-green-500'>{data.search}</span>(으)로 검색한 결과
                    </p>
                </div>
                {data.questions.map((question) => (
                    <div
                        key={question.id}
                        onClick={() => handleClick(question.id)}
                        className='mb-4 pb-4 border-b border-gray-300 cursor-pointer'
                    >
                        <h2 className='font-bold text-lg'>{question.title}</h2>
                        <p className='text-gray-600'>{question.content}</p>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default SearchPage;
