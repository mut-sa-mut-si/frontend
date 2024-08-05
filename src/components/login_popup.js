import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({onClose}) => {
    const navigate = useNavigate();
    const popupRef = useRef();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // onClose prop을 호출하여 팝업을 닫음
      }
    };

    useEffect(() => {
      // 컴포넌트 마운트 시 mousedown 이벤트 리스너 추가
      document.addEventListener('mousedown', handleClickOutside);
  
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []); // 의존성 배열을 비워 렌더링 시 한 번만 설정되도록 함

    return (
        <div    ref={popupRef} style={{
            position: 'fixed',
            bottom: '-20%',
            left: '60%', // 화면의 중앙에 위치
            transform: 'translate(-50%, -50%)', // 정확한 중앙 정렬을 위해 변경
            width: '400px',
            height: '300px',
            padding: '20px',
            borderRadius: '30px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 100000 // 다른 요소들 위에 보장되도록 충분히 높은 z-index
        }}>
            <div className="text-center mt-6"></div>
            <div>
                <p className="text-center text-[24px] font-bold mb-4">로그인 후 이용 가능해요</p>
                <p className="text-center text-lg mb-4">그룸을 시작해보세요</p>
                <button
                    onClick={handleLoginClick}
                    className="px-10 flex py-2 w-[300px] mt-10 text-[18px] font-bold h-14 bg-[#56C08C] rounded-[20px]"
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
