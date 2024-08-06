import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import grwmProfile from '../../assets/img/grwmProfile.png';

// Import Components
import Side from '../../components/side';
import Footer from '../../components/footer';

function LoginComplete() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/main`);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center'>
            {/* 배경 디자인 컴포넌트 */}
            <Side className='hidden sm:block' />
            <div className='fixed top-0 left-0 sm:left-[765px] sm:w-[512px] h-[calc(100vh-3px)] w-full bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                <div className='font-bold text-center mb-10 text-2xl'>
                    <p>
                        <span className='text-green-500'>그룸</span>에 오신 것을 환영합니다!
                    </p>
                    <p>회원가입 완료되었습니다.</p>
                </div>
                <div className='mb-6 flex justify-center'>
                    <img src={grwmProfile} alt='Profile' className='w-3/4 mb-10' />
                </div>
                <div className='w-full flex justify-center'>
                    <button className='text-white bg-green-500 py-3 w-3/4 rounded-2xl font-bold' onClick={handleClick}>
                        홈으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginComplete;
