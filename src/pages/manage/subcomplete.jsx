import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Import Component
import Side from '../../components/side';

// Import images
import profileImage from '../../assets/img/profile.png';

// axios로 api 가져오기
const api = axios.create({
  baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function SubComplete() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';

  // 구독하고 싶은 사람 이름 불러오기
  useEffect(() => {
    const subName = async () => {
      try {
        const response = await api.get(`api/v1/members/${id}/click-subscribe`);
        setName(response.data);
        console.log('Fetch name: ', response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // 3초 후에 로딩 상태 해제
    const timer = setTimeout(() => {
      subName();
      setLoading(false);
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [id]);

  // 구독 완성 보내기
  const handleClick = () => {
    postSubComplete();
    navigate(`/main`);
  }

  const postSubComplete = async () => {
    try {
      const res = await api.post(`api/v1/members/${id}/payment`, {}, {
        headers: {
          Authorization: `${cleanToken}`
        },
      });
      console.log('Post: Subscribe Complete', res.data);
    } catch (error) {
      console.error(error);
    };
  }

  if (loading) {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
  {/* 배경 디자인 컴포넌트 */}
  <Side />
  <div className="fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#000000] bg-opacity-30 shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10 flex items-center justify-center">
    <div className="text-2xl font-bold text-white">결제 중...</div>
  </div>
</div>

    );
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
            <div className="text-3xl font-bold mb-3">결제완료!</div>
            <div className="text-xl mb-4 py-2 ">
              이제 <span className='text-[#14AE63]'>{name.memberName}</span>님의 레시피를
              <br />
              전부 열람할 수 있어요
            </div>
            <div className='py-20'>
              <button
                onClick={handleClick}
                className="bg-[#14AE63] text-white py-4 px-20 rounded-2xl hover:bg-[#0E7B46]"
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

export default SubComplete;
