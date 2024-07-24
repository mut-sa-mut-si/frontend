import axios from "axios";
import Back from '../../assets/img/back_.png';
import React, { useEffect, useState } from "react";
import profile from '../../assets/img/profile.png';
import KakaoPay from '../../assets/img/kakao_pay.png';

function Payments(){


    return(
        <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[0px] mx-auto flex-grow">
            <div className="flex items-center  justify-between">
                            <button className="w-6 h-6 mr-2">
                                <img src={Back} alt="Back" />
                            </button>
                            <div className="flex-grow ">
                            <div className="text-base font-bold ">
                                결제하기
                            </div>    
                        </div>
                
                        </div>

                        
                        <div className="flex  mt-12">
                            <div className="w-12 h-12">

                            <img src={profile} alt="profile" />
                            </div>
                       
                <div className="text-3xl font-bold text-main-color ml-4 mt-2">
                    멋사멋시
                </div>
                <div className="text-3xl font-bold ml-4 mt-2">
                    님 구독하기
                </div>
                
    
                </div>
                <div className="flex items-center justify-center ">
                <button
                    className="w-[418px] h-[109px] mt-20 rounded-lg focus:outline-none border border-[#A9A9A9] focus:border-main-color"
                >
                            <div className="flex relative justify-between items-center w-full">
                <div className="text-[28px] font-bold ml-4 mb-8">
                    1개월
                </div>
                <div className="text-[28px] font-bold mb-8 mr-4">
                    ₩1,900/월
                </div>
                </div>

                <div className="text-[20px] absolute font-base text-[#A9A9A9] mr-20 ml-4 -mt-4">
                다음 결제일 : 2024. 8. 21
                </div>

                </button>

            
                </div>
                <div className=" items-center justify-center ">
                <button
                    className="w-[418px] h-[109px] mt-4 ml-[23px] rounded-lg focus:outline-none border border-[#A9A9A9] focus:border-main-color"
                >
                <div className="flex relative justify-between items-center w-full">
                <div className="text-[28px] font-bold ml-4 mb-8">
                    1년 결제
                </div>
                <div className="text-[28px] font-bold mb-8 mr-4">
                    ₩2000
                </div>
                </div>

                <div className="text-[20px] absolute font-base text-[#A9A9A9] mr-20 ml-4 -mt-4">
                다음 결제일 : 2024. 8. 21
                </div>

                </button>
                </div>



            </div>
    )
}

export default Payments;