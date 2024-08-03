import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Components
import Side from '../../components/side';
import QnAHeader from './qnaHeader';
import AwaitAnswer from './awaitAnswer';
import QnAList from './qnaList';
import Footer from '../../components/footer';

const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function QnAHandler() {
    const [category, setCategory] = useState('skin');
    const [data, setData] = useState(null);
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    useEffect(() => {
        const fetchQnA = async () => {
            try {
                const response = await api.get(`api/v1/questions/authentication?category=${category.toUpperCase()}`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
                setData(response.data);
                console.log('Login Finished: ', response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQnA();
    }, [category]);

    return (
        <div className='relative w-screen h-screen'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] z-10'>
                {/* 초록색 박스 */}
                <div className='sticky left-0 right-0 top-0 bg-[#F9F8F8] z-20 w-full'>
                    <QnAHeader category={category} setCategory={setCategory} />
                </div>
                {data ? (
                    <div className='overflow-y-auto'>
                        <AwaitAnswer data={data.waitingAnswerQuestion} />
                        <QnAList data={data.questions} />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/*<Footer />*/}
        </div>
    );
}

export default QnAHandler;
