import axios from "axios";
import Footer from "../../components/footer";

import React, { useEffect, useState } from "react";
import Back from '../../assets/img/back_.png';
import profile from '../../assets/img/profile.png';
import Subscribe from '../../assets/img/subscribe.png';

function Mypage(){

    const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '게시물', content: '게시물 내용입니다.' },
    { name: '스크랩', content: '스크랩 내용입니다.' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };
  


    return(
        
        
      <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[0px] mx-auto flex-grow">
            <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2">
                    <img src={Back} alt="Back" />
                </button>
                <div className="flex-grow text-center">
                <div className="text-2xl font-bold mr-8">
                    멋사멋시
                </div>    
            </div>
            </div>

            <div className="flex justify-center mt-6">
                <div className="w-28 h-28">
                <img src={profile} alt="profile"  />
                </div>
            </div>

            <div className="flex items-center justify-between mt-9">
                <div className="text-base font-bold ml-32">
                    게시물
                </div>
                <div className="text-base font-bold">
                    스크랩
                </div>
                <div className="text-base font-bold mr-32">
                    좋아요
                </div>
            </div>

            <div className="flex justify-center mt-12">
            <button className="w-32 h-15" >
            <img src={Subscribe} alt="Subscribe"  />
            </button>
            </div>

            <hr className="my-6 border-t-2  border-gray-300 " />

            <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4 mb-4 ">
          {menuArr.map((menu, index) => (
            <button
            key={index}
            className={`text-base sm:text-lg font-bold py-2 px-16  hover:text-main-color`}
            onClick={() => selectMenuHandler(index)}
            >
              {menu.name}
            </button>
          ))}
        </div>
        
      </div>
            

            <hr className="my-6 border-t-2 border-gray-300 mt-[10px]" />

            <div className="p-4">
          {menuArr[currentTab].content}
        </div>
          



            <Footer/>
        </div>
    )
}
export default Mypage;