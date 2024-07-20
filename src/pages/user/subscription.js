import profile from '../../assets/img/profile.png';
import axios from "axios";
import Back from '../../assets/img/back_.png';
import Payment from '../../assets/img/payment.png';
import React, { useEffect, useState } from "react";

function Subscription(){


        return(
            <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[0px] mx-auto flex-grow">
                
                <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2">
                    <img src={Back} alt="Back" />
                </button>
                </div>

                <div className="flex  mt-12">
                <div className="text-3xl font-bold text-main-color ml-4 mt-4">
                    멋사멋시
                </div>
                <div className="text-3xl font-bold ml-4 mt-4">
                    님을
                </div>
    
                </div>
                <div className="text-3xl font-bold ml-4 mt-2">
                    구독할까요?
                </div>
                <div className="flex justify-center items-center mt-12">
                <div className="w-56 h-56">
                    <img src={profile} alt="profile" />
                </div>
                </div>

                <div className="flex  mt-12 font-medium ml-4">
                <div className="text-xl ">
                    멋사멋시 님을 구독하시면,
                </div>
                </div>


                <div className="flex  mt-4 font-medium ml-4">
                <div className="text-xl ">
                멋사멋시님의 비공개 레시피를 자유롭게 열람할 수 있습니다. :D
                </div>
                </div>

                <div className="flex flex-col items-center mt-20">
            <div className="text-[#D9D9D9] font-bold text-center mb-4">
                 익일 10일부터 월 1,900원이 결제됩니다.
                </div>
             <div className="flex justify-center">
              <button className="w-96 mt-4">
             <img src={Payment} alt="Payment" />
             </button>
                  </div>
                </div>


            </div>
        )
}
export default Subscription;