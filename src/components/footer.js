import React from "react";
import { Link } from "react-router-dom";
import Footer1 from '../assets/img/footer1.png';
import Footer2 from '../assets/img/footer2.png';
import Footer3 from '../assets/img/footer3.png';
function Footer() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center">
            <footer className="relative w-[512px] h-[90px]   bg-white rounded-[15px] mt-auto">
      
                <div className="absolute ml-[420px] mt-[30px]  w-[30px]  h-[30px]">
                 <img src={Footer1} alt="Footer1"  />
                 <div className="absolute w-[80px] mt-[5px] ml-[-25px]"> 마이페이지</div>
                
                </div>
                <div className="absolute ml-[77px] mt-[30px]  w-[30px]  h-[30px]">
                 <img src={Footer2} alt="Footer2"  />
                 <div className="absolute mt-[5px] ml-[7px]">홈</div>
                </div>
                <div className="absolute ml-[242px] mt-[30px]  w-[30px]  h-[30px]">
                 <img src={Footer3} alt="Footer3"  />
                 <div className="absolute w-[80px] mt-[5px] ml-[-9px]">글쓰기</div>
                </div>


            </footer>
        </div>
    );
}


export default Footer;