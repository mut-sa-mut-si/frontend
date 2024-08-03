import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Side from '../../components/side';
import styled from 'styled-components';
import profileImg from '../../assets/img/profile.png';

const MymainOther = () => {
    const { id } = useParams();
    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const [userInfo, setUserInfo] = useState(null);
      useEffect(() => {
    const maindata = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/members/${id}/authentication`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
    
        });

        console.log(response.data); // 콘솔에 받아온 데이터 전체 출력

      } catch (error) {
        console.error('There was an error', error);
      }
    };

    maindata();
  }, []); // 여기에 selected 추가*/


  return (
    <div className="relative w-screen h-screen overflow-hidden">
    {/* 배경 디자인 컴포넌트 */}
    <Side />

    <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">





</div>
</div>
  )

}

export default MymainOther;

