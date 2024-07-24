import React from "react";
import "./main.css"; // CSS 파일이 필요한 경우
import Side from "../../components/side";

function Main() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />
    <div className="fixed top-0 left-[765px] w-[512px] h-[calc(100vh-60px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
      {/* 초록색 박스 */}
      <div className="absolute top-0 left-0 w-full h-[340px] bg-[#24A064] rounded-[30px] p-6">
        <div className="text-white text-[28px] mt-4 font-base">
          그룸에는
        </div>
        <div className="text-white text-[32px] mt-2 font-bold">
          58,000개의
        </div>
        <div className="text-white text-[28px] mt-2 font-base">
          특별한 레시피가 있어요
        </div>
      </div>

      
      <div className="pt-[340px]">
        
      </div>
    </div>
    </div>
  );
}

export default Main;
