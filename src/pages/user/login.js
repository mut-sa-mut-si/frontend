import React, { useEffect } from "react";
import naverImg from '../../assets/img/naver.png';
import loginLine from '../../assets/img/loginLine.png';
import kakaoImg from '../../assets/img/kakao.png';
import googleImg from '../../assets/img/google.png'
import axios from "axios";


function Login() {

  let api = 'http://27.96.134.123:8080';
  // 카카오
  const KakaoLogin = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get(`${api}/api/v1/login/kakao`,{
        Authorization: `Bearer ${accessToken}`
      });
      window.location.href = response.data.loginUrl;
    } catch (error) {
      console.error('에러가 발생했습니다!', error);
    }
  };


  return (
    <div className="relative w-[50vw] h-[932px]  max-w-[512px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[90px] flex-grow">
      
      <div className="text-2xl font-bold mb-4 mt-[50px] ">
        회원가입하기
      </div>
      
      <div className="text-[18px] font-bold mb-6 text-[#D9D9D9]">
        소셜 로그인으로 가입할 수 있습니다
      </div>
      
      <div className="mb-3  mt-[30px] ">
        <img src={loginLine} alt="Login Line" />
      </div>
      
      <div className="flex flex-col items-center mt-[20px]  ">
       
        <button className="p-4" onClick={KakaoLogin} >
          <img src={kakaoImg} alt="Kakao"/>
        </button>
       
      </div>
    
    </div>
  );
}

export default Login;