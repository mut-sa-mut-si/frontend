import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Side from '../../components/side';
import styled from 'styled-components';
import profile from '../../assets/img/profile.png';
import { FaStar } from 'react-icons/fa';
import Back from '../../assets/img/back_.png';
import Subpopup from '../../components/sub_popup'; // 팝업 컴포넌트 임포트
import Footer from '../../components/footer';
import lockIcon from '../../assets/img/lockIcon.png';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #E7F2EC;
  border-radius: 15px;
  padding: 10px 20px;
  margin-top: 50px;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
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
const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const PostContainer = styled.div`
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const LockedIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
`;


const MymainOther = () => {
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';
  const [userInfo, setUserInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  useEffect(() => {
    const maindata = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/members/${id}`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
        });
        setUserInfo(response.data);
        setIsSubscribed(response.data.isSubscribed);
        console.log(response.data); // 콘솔에 받아온 데이터 전체 출력
      } catch (error) {
        console.error('There was an error', error);
      }
    };
    maindata();
  }, [id, cleanToken]);

  console.log(userInfo)

  const handleSubscribeClick = () => {
    setIsPopupOpen(true); // 구독하기 버튼 클릭 시 팝업 열기
  };

  const handleClosePopup = () => {
    navigate(`/subpurchase/${id}`);
  };

  const handleCancelSubscription =()=> {
    setIsPopupOpen(false); // 팝업 닫기
  };

 
 return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[765px] w-[512px] h-[calc(100vh-80px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
  
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
          <>
            <ProfileContainer className='h-[140px] mt-40'>
              <ProfileImage src={profile} alt="Profile" />
              <ProfileInfo className='ml-4'>
                <span className="font-bold text-lg">{userInfo.member.name}</span>
                <span className='mt-4 flex' >
                  게시물 {userInfo.recipeCount} · 평균 후기 {userInfo.ratingAverage} <FaStar size="16" color="gold" className='ml-2'/>
                  </span>
              </ProfileInfo>
            </ProfileContainer>
            <div className="mt-4 text-lg font-bold">레시피</div>
            <PostGrid>
              {userInfo.recipes && Array.isArray(userInfo.recipes) && userInfo.recipes.map((recipe, index) => (
                <PostContainer key={index}>
                  <PostImage src={recipe.image} alt={`Recipe ${index}`} className="w-full h-[300px] object-cover rounded-[20px]"  />
                  {!recipe.isPublic && <LockedIcon src={lockIcon} alt="잠금 아이콘" />}
                </PostContainer>
              ))}
            </PostGrid>
          </>
        )}
           <div className='flex flex-col flxed items-center justify-between'>
                    <Footer />
                </div>
      </div>
      {isPopupOpen && (
        <Subpopup
          name={userInfo?.name}
          id={userInfo?.id}
          onClose={handleClosePopup}
          onCancel={handleCancelSubscription}
        />
      )}
    </div>
  );
}

export default MymainOther;