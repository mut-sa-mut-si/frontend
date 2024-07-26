import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import kakaoImg  from '../assets/img/kakao.png';
import axios from "axios";


function Side() {
    const location = useLocation();
    const [hasFetched, setHasFetched] = useState(false);

    const KakaoLogin = () => {
        window.location.href = "https://kauth.kakao.com/oauth/authorize?redirect_uri=http://localhost:3000/redirect&client_id=e3743c41d0df1be9ef7bdc6790434cde&response_type=code";
      };
    
      useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
    
        if (code) {
          // 여기에 백엔드로 코드 보내기 로직 추가
          axios.get(`http://27.96.134.123:8080/api/v1/login/kakao/redirect?code=${code}`)
            .then((response) => {
                console.log(response);
                const jwt = response.headers['authorization']; // 소문자로 변경
                if (jwt) {
                  localStorage.setItem('jwt', jwt);
                  console.log('JWT Token:', jwt);
                  setHasFetched(true); // 요청 완료 상태 업데이트
                  }
            })
            .catch(error => {
              console.error('JWT를 가져오는데 실패했습니다!', error);
              setHasFetched(true); // 에러 발생 시에도 상태 업데이트
            });
        }
      }, [location]);
  return (
    <div className="fixed w-screen h-screen bg-white ">
          <div className="absolute w-[500px] h-[500px] bg-green-400 ml-[-600px]  rounded-full blur-3xl opacity-50 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-28 h-28 mt-4 ml-4">
        <img src={Logo} alt='Logo' /> 
        </div>

                <div className="text-[30px] font-bold ml-8">
            새로운 나를 위한
        </div>

        <div className="text-[45px] mt-4 font-bold text-transparent ml-8 bg-clip-text bg-gradient-to-r from-customGreen to-customGreen">
            자기 관리 레시피 플랫폼
        </div>

        <div className="text-[25px] mt-4 text-customGray ml-8 ml-indent">
            일일히 찾아다니지 않아도 괜찮아요
            
        </div>

        <div className="text-[25px] text-customGray ml-8 ml-indent">
           
            나만의 레시피를 만들어보세요!
        </div>

        <div className=" mt-[116px] ml-4  ">
       
       <button className="p-4 w-[450px] h-[75px]" onClick={KakaoLogin} >
         <img src={kakaoImg} alt="Kakao"/>
       </button>
      
     </div>

     <div className="text-[22px] mt-8 text-customGray ml-8 ml-indent">
           
            카카오톡으로 회원가입 없이 그룸을 이용할 수 있어요
        </div>
        <div className="absolute w-[500px] h-[500px] ml-[550px] mt-[400px] bg-[#25CAAC] rounded-full blur-3xl opacity-50 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>



    </div>
  );
}

export default Side;
