import React from "react";
import { Link } from "react-router-dom";
import naverImg from '../../assets/img/naver.png';
import loginLine from '../../assets/img/loginLine.png';
import kakaoImg from '../../assets/img/kakao.png';
import googleImg from '../../assets/img/google.png'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
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
        <button className="p-4">
          <img src={naverImg} alt="Naver"  />
        </button>
        <button className="p-4">
          <img src={kakaoImg} alt="Kakao"/>
        </button>
        <button className="p-4">
          <img src={googleImg} alt="Google"  />
        </button>
      </div>
    </div>
  );
}

export default Login;