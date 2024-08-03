import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Side from '../../components/side';
import styled from 'styled-components';
import profileImg from '../../assets/img/profile.png'; // 프로필 이미지 경로 수정 필요
import recipeIcon from '../../assets/img/main_icon.png'; // 아이콘 이미지 경로 수정 필요
import scrapIcon from '../../assets/img/main_scrap.png'; // 아이콘 이미지 경로 수정 필요
import settingIcon from '../../assets/img/main_setting.png'; // 아이콘 이미지 경로 수정 필요
import pointIcon from '../../assets/img/main_point.png'; // 아이콘 이미지 경로 수정 필요

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;

  justify-content: space-around;
  margin-top: 50px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const MyMain = () => {
  const [userInfo, setUserInfo] = useState(null);
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
  const token = localStorage.getItem('jwt');
  const { id } = useParams();
  const cleanToken = token ? token.replace('Token: ', '') : '';

  console.log(id)
  useEffect(() => {
    const maindata = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/members`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
    
        });
        setUserInfo(response.data);
        console.log(response.data); // 콘솔에 받아온 데이터 전체 출력

      } catch (error) {
        console.error('There was an error', error);
      }
    };

    maindata();
  }, []); // 여기에 selected 추가

  return (
    <div className="relative w-screen h-screen overflow-hidden">
    {/* 배경 디자인 컴포넌트 */}
    <Side />

    <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
    <div className="flex flex-col items-center mt-20">
            <ProfileImage src={profileImg} alt="프로필 이미지" />
            <h2 className="mt-4 font-bold text-[18px]">
              {userInfo ? userInfo.name : '사용자 이름'}
            </h2>
            <p className="text-gray-500">
              {userInfo ? userInfo.email : '이메일'}
            </p>
            <div className="mt-12 bg-[#E7F2EC] p-4 rounded-[20px] w-full text-center">
              <span className="font-bold">
                {userInfo ? `${userInfo.points} 포인트` : '포인트'}
              </span>
            </div>
          </div>
          <ButtonContainer className='mt-16'>
            <Button>
              <img src={recipeIcon} alt="작성 레시피" className="w-10 h-10" />
              작성 레시피
            </Button>
            <Button>
              <img src={scrapIcon} alt="스크랩 레시피" className="w-10 h-10" />
              스크랩 레시피
            </Button>
            <Button>
              <img src={settingIcon} alt="구독 관리" className="w-10 h-10" />
              구독 관리
            </Button>
            <Button>
              <img src={pointIcon} alt="포인트 관리" className="w-10 h-10" />
              포인트 관리
            </Button>
          </ButtonContainer>
        </div>
      </div>

  );
};
export default MyMain;
