import React from 'react';
import Side from '../../components/side';
import profileImage from '../../assets/img/profile.png'; 
import { useParams,useNavigate } from 'react-router-dom';


function PurchashReplace() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/main`);
  }
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />
      
    <div className="fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
     {/* 초록색 박스 */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8 w-full">
            <div className="mb-4">
              <img src={profileImage} alt="Dino" className="w-32 mx-auto" />
            </div>
            <div className="text-2xl font-bold mb-2">결제완료!</div>
            <div className="text-gray-600 mb-4 py-2 ">
              이제 멋사멋사님의 레시피를
              <br />
              전부 열람할 수 있어요
            </div>
            <div className='py-20'>
            <button
              onClick={handleClick}
              className="bg-green-500 text-white py-4 px-20 rounded hover:bg-green-600"
            >
              홈으로 돌아가기
            </button>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}

export default PurchashReplace;