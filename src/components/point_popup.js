import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PointPopup = ({ onClose }) => {
    const navigate = useNavigate();
    const popupRef = useRef();

    const handleUsePoints = () => {
        // 포인트 사용 로직 추가
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
        <div ref={popupRef} style={{
            position: 'fixed',
            bottom: '30%',
            left: '75%', // 화면의 중앙에 위치
            transform: 'translate(-50%, 50%)', // 정확한 중앙 정렬을 위해 변경
            width: '400px',
            height: '400px',
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
                <p className="text-center text-[24px] font-bold mb-4"><span className="text-[#56C08C]">120 그룸 포인트</span>를 사용해</p>
                <p className="text-center text-lg mb-4">레시피를 확인해보시겠어요?</p>
                
                <div className="text-center text-sm text-gray-700 mb-4">
                    <p>멋사멋시님을 구독해</p>
                    <p>그룸 포인트 지불 없이 레시피를 볼 수도 있어요</p>

                </div>

                <div className="text-center text-sm text-gray-700 mb-4">
                    <p>보유 그룸 포인트 <span className="text-[#56C08C] font-bold">17,240</span></p>
                </div>
                
                <button
                    onClick={handleUsePoints}
                    className="px-10 py-2 w-[300px] mt-10 text-[18px] font-bold h-14 bg-[#56C08C] text-white rounded-[20px]"
                >
                    그룸 포인트 사용
                </button>
            </div>

              
            </div>
        
    );
};

export default PointPopup;
