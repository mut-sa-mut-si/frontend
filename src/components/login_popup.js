// components/LoginPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/login');
    };
  return (
    <div    style={{
        position: 'fixed',
        width: '400px',
        height: '300px',
        bottom: '3%',
        left: '73%',
        transform: 'translateX(-50%)',
        padding: '20px',
        borderRadius: '30px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000
      }}
      >
      <div className="text-center mt-6"></div>
      <div className="">
        <p className="text-center text-[24px] font-bold mb-4">로그인 후 이용 가능해요</p>
        <p className="text-center text-lg mb-4">그룸을 시작해보세요</p>
        <button
          onClick={handleLoginClick}
          className="px-10 flex py-2  w-[300px] mt-10 text-[18px] font-bold h-14 bg-[#56C08C] rounded-[20px]"
        >
            <div className='text-[#FFE400] mt-2'>
          카카오톡
          </div>
          <div className='text-white mt-2'>
          으로 그룸 시작하기
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
