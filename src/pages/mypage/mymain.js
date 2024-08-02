import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Side from '../../components/side';
import styled from 'styled-components';
import profileImg from '../../assets/img/profile.png'; // 프로필 이미지 경로 수정 필요
import recipeIcon from '../../assets/img/main_icon.png'; // 아이콘 이미지 경로 수정 필요
import scrapIcon from '../../assets/img/main_scrap.png'; // 아이콘 이미지 경로 수정 필요
import settingIcon from '../../assets/img/main_setting.png'; // 아이콘 이미지 경로 수정 필요
import pointIcon from '../../assets/img/main_point.png'; // 아이콘 이미지 경로 수정 필요

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
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


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />

      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        <div className="flex flex-col items-center">
          <ProfileImage src={profileImg} alt="프로필 이미지" />
          <h2 className="mt-4 font-bold text-[18px]"></h2>
          <p className="text-gray-500"></p>
          <div className="mt-4 bg-[#E7F2EC] p-4 rounded-[20px] w-full text-center">
            <span className="font-bold"> 포인트</span>
          </div>
        </div>
        <ButtonContainer>
          <Button>
            <img src={recipeIcon} alt="작성 레시피" />
            작성 레시피
          </Button>
          <Button>
            <img src={scrapIcon} alt="스크랩 레시피" />
            스크랩 레시피
          </Button>
          <Button>
            <img src={settingIcon} alt="구독 관리" />
            구독 관리
          </Button>
          <Button>
            <img src={pointIcon} alt="포인트 관리" />
            포인트 관리
          </Button>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default MyMain;