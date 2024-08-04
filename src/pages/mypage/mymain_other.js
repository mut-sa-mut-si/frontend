import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Side from '../../components/side';
import styled from 'styled-components';
import profile from '../../assets/img/profile.png';
import { FaStar } from 'react-icons/fa';
import Back from '../../assets/img/back_.png';
import Subpopup from '../../components/sub_popup'; // 팝업 컴포넌트 임포트

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #E7F2EC;
  border-radius: 15px;
  padding: 10px 20px;
  margin-top: 50px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const SubscribeButton = styled.button`
  background-color: #56C08C;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: auto;
`;

const MymainOther = () => {
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';
  const [userInfo, setUserInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const maindata = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/members/${id}`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
        });
        setUserInfo(response.data.member);
        setIsSubscribed(response.data.isSubscribed);
        console.log(response.data); // 콘솔에 받아온 데이터 전체 출력
      } catch (error) {
        console.error('There was an error', error);
      }
    };
    maindata();
  }, [id, cleanToken]);

  const handleSubscribeClick = () => {
    setIsPopupOpen(true); // 구독하기 버튼 클릭 시 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  const handleCancelSubscription = async () => {
    // 구독 취소 로직 구현
    try {
      await axios.post(`http://${api}/api/v1/members/${id}/unsubscribe`, {}, {
        headers: {
          'Authorization': `${cleanToken}`,
        },
      });
      setIsSubscribed(false);
    } catch (error) {
      console.error('구독 취소 중 오류가 발생했습니다', error);
    }
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <img src={Back} alt="Back" className='w-8 h-8' />
          </button>
          {!userInfo?.isMe && (
            <SubscribeButton onClick={handleSubscribeClick}>
              {isSubscribed ? '구독 취소' : '구독하기'}
            </SubscribeButton>
          )}
        </div>
        {userInfo && (
          <ProfileContainer className='h-[140px] mt-40'>
            <ProfileImage src={profile} alt="Profile" />
            <ProfileInfo>
              <span className="font-bold text-lg">{userInfo.name}</span>
              <span>게시물 {userInfo.recipeCount} · 평균 후기 {userInfo.ratingAverage} <FaStar size="12" color="gold" /></span>
            </ProfileInfo>
          </ProfileContainer>
        )}
      </div>
      <div className=' flex items-center '>
      {isPopupOpen && (
        <Subpopup
          name={userInfo ? userInfo.name : ''}
          onClose={handleClosePopup}
          onCancel={handleCancelSubscription}
        />
      )}
      </div>
    </div>
  );
}

export default MymainOther;
