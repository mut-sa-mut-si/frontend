import React from "react";
import SliderFamous from "../../components/slide_famous";
import SliderRecommend from "../../components/slide_recommend";
import "./main.css"; // CSS 파일이 필요한 경우
import Side from "../../components/side";
import mainIcon from '../../assets/img/main_icon.png';
import mainLogin from '../../assets/img/mainLogin.png';
import SliderReview from "../../components/slide_review";


function Main() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />
      
    <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
      {/* 초록색 박스 */}
      <div className="absolute top-0 left-0 w-full h-[340px] bg-[#24A064] rounded-[30px] p-6">
        <div className="text-white text-[28px] mt-8 font-base">
          그룸에는
        </div>
        <div className="text-white text-[32px] mt-2 font-bold">
          58,000개의
        </div>
        <div className="text-white text-[28px] mt-2 font-base">
          특별한 레시피가 있어요
        </div>

        <div className="mt-[-140px] ml-[340px] absolute w-28 h-28">
      <img src={mainIcon} alt="mainIcon" />
      </div>

      <div className="mt-[20px] ml-[7px] absolute w-[450px] h-[102px]">
        <button>
      <img src={mainLogin} alt="mainLogin" />
      </button>
      </div>


      <div className="absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[370px] h-[220px] bg-white rounded-[30px] p-6">
        <SliderFamous/>
      </div>

      <div className="absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[625px] h-[400px] bg-white rounded-[30px] p-6">
        <SliderRecommend/>
      </div>

      <div className="absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[1060px] h-[500px] bg-white rounded-[30px] p-6">
        <SliderReview/>
      </div>


      </div>

     
     
    </div>
    
    </div>
  );
}

export default Main;
