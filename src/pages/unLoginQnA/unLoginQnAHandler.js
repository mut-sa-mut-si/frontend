// 비로그인 QnA 핸들러

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Components
import Side from '../../components/side';
import UnLoginQnAHeader from './unLoginQnAHeader';
import UnLoginAwaitAnswer from './unLoginAwaitAnswer';
import UnLoginQnAList from './unLoginQnAList';
import Footer from '../../components/footer';

const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function UnLoginQnAHandler() {
    const [category, setCategory] = useState('skin');
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchQnA = async () => {
            try {
                const response = await api.get(`api/v1/questions/unauthentication?category=${category.toUpperCase()}`);
                setData(response.data);
                console.log('Login Finished: ', response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQnA();
    }, [category]);

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] overflow-y-auto no-scrollbar z-10'>
                {/* 초록색 박스 */}
                <div className='sticky absolute left-0 right-0 top-0 bg-[#F9F8F8] z-20 w-full'>
                    <UnLoginQnAHeader category={category} setCategory={setCategory} />
                </div>
                {data ? (
                    <>
                        <UnLoginAwaitAnswer data={data.waitingAnswerQuestion} />
                        <UnLoginQnAList data={data.questions} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/*<Footer />*/}
        </div>
    );
}

export default UnLoginQnAHandler;
