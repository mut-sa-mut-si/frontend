import React, { useEffect } from 'react';
import naverImg from '../../assets/img/naver.png';
import loginLine from '../../assets/img/loginLine.png';
import kakaoImg from '../../assets/img/kakao.png';
import googleImg from '../../assets/img/google.png';
import axios from 'axios';
import Footer from '../../components/footer';
import Header from '../../components/Layout';

function Login() {
    let api = 'http://localhost:8080';
    // 카카오
    const KakaoLogin = () => {
        axios
            .get(`${api}/api/v1/login/kakao`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('에러가 발생했습니다!', error);
            });
    };

    // 구글 로그인 요청
    const GoogleLogin = () => {
        axios
            .get(`${api}/api/v1/login/google`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('에러가 발생했습니다!', error);
            });
    };

    const loginHandlerKakao = () => {
        KakaoLogin();
    };

    const loginHandlerGoogle = () => {
        GoogleLogin();
    };

    //구글

    return (
        <div className='relative w-[50vw] h-[932px]  max-w-[512px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[90px] flex-grow'>
            <div className='text-2xl font-bold mb-4 mt-[50px] '>회원가입하기</div>

            <div className='text-[18px] font-bold mb-6 text-[#D9D9D9]'>소셜 로그인으로 가입할 수 있습니다</div>

            <div className='mb-3  mt-[30px] '>
                <img src={loginLine} alt='Login Line' />
            </div>

            <div className='flex flex-col items-center mt-[20px]  '>
                <button className='p-4' onClick={loginHandlerKakao}>
                    <img src={kakaoImg} alt='Kakao' />
                </button>
                <button className='p-4' onClick={loginHandlerGoogle}>
                    <img src={googleImg} alt='Google' />
                </button>
            </div>
        </div>
    );
}

export default Login;
