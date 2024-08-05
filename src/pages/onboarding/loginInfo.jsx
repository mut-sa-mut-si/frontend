import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 사진 가져오기
import GRWMCharacter from '../../assets/img/characterImg.png';


// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});


function LoginInfo({ onNext }) {
    const [loginMember, setLoginMember] = useState({ member: { id: '', name: '' } });
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
  
    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
             
                const response = await api.get(`api/v1/onboards`, {
                    headers: {
                        'Authorization': `${cleanToken}`,
                    },
                });
                console.log(response.data);
                setLoginMember(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLoginInfo();
    }, []);

    console.log(loginMember.member);
   

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#14AE63]'>{loginMember.member.name}</span>님
                </h1>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#14AE63]'>그룸</span>에 오신 것을 환영해요
                </h1>
            </div>
            <div>
                <h2 className='text-2xl mb-3 font-extrabold'>당신에 대해서 알려주세요</h2>
                <p className='text-gray-300 text-s mb-5'>
                    저에 대해서 먼저 알려드리면, 저는 <span className='font-bold'>그룸</span>이고...
                </p>
            </div>
            <div className='flex justify-center items-center'>
                <img src={GRWMCharacter} className='w-65 h-60 mb-3' alt='Character' />
            </div>
            <div className='flex justify-center items-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#14AE63] bottom-60 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full hover:bg-[#0E7B46]'
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default LoginInfo;
