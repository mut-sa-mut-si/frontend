import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import loginLine from '../../assets/img/loginLine.png';
import kakaoImg from '../../assets/img/kakao.png';
import axios from 'axios';
import Side from '../../components/side';

// Import images
import BackButton from '../../assets/img/backButton.png';
import grwmProfile from '../../assets/img/grwmProfile.png';

function Login() {
    const navigate = useNavigate();

    // 카카오
    const location = useLocation();
    const [hasFetched, setHasFetched] = useState(false);

    const KakaoLogin = () => {
        window.location.href =
            'https://kauth.kakao.com/oauth/authorize?redirect_uri=http://localhost:3000/redirect&client_id=e3743c41d0df1be9ef7bdc6790434cde&response_type=code';
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        const api = `http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080`;

        if (code) {
            axios
                .get(`${api}/api/v1/login/kakao/redirect?code=${code}`)
                .then((response) => {
                    console.log(response);
                    const jwt = response.data; // 소문자로 변경

                    if (jwt) {
                        const cleanToken = jwt ? jwt.replace('Token: ', '') : '';
                        localStorage.setItem('jwt', jwt);
                        console.log('JWT', jwt);
                        setHasFetched(true); // 요청 완료 상태 업데이트
                        axios
                            .get(`${api}/api/v1/members/check-onboard`, {
                                headers: {
                                    Authorization: `${cleanToken}`,
                                },
                            })
                            .then((response) => {
                                const isOnboarded = response.data;
                                console.log('isOnboarded', response.data);
                                if (isOnboarded) {
                                    navigate(`/logincomplete`);
                                } else {
                                    navigate(`/onboarding`);
                                }
                            })
                            .catch((error) => {
                                console.error('There was an error!', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('JWT를 가져오는데 실패했습니다!', error);
                    setHasFetched(true); // 에러 발생 시에도 상태 업데이트
                });
        }
    }, [location, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            <Side className='hidden sm:block' />
            <div className='fixed top-0 left-0 sm:left-[765px] sm:w-[512px] h-[calc(100vh-3px)] w-full bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                <img
                    src={BackButton}
                    alt='BackButton'
                    className='w-7 h-7 absolute top-10 left-4 cursor-pointer'
                    onClick={handleBack}
                />
                <div className='text-3xl font-bold mb-4 text-center mt-10'>회원가입하기</div>

                <div className='text-[18px] font-bold mb-6 text-[#D9D9D9] text-center'>
                    소셜 로그인으로 가입할 수 있습니다
                </div>

                <img src={grwmProfile} alt='Profile' className='w-1/2 mb-3' />

                <div className='flex flex-col items-center mt-[20px]'>
                    <button className='p-4' onClick={KakaoLogin}>
                        <img src={kakaoImg} alt='Kakao' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
