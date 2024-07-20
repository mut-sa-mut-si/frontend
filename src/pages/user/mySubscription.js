import axios from "axios";
import Footer from "../../components/footer";
import Header from "../../components/Layout";
import Back from '../../assets/img/back_.png';
import React, { useEffect, useState } from "react";
import profile from '../../assets/img/profile.png';

function MySubscription(){

 

    return(      <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[0px] mx-auto flex-grow">
            <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2">
                    <img src={Back} alt="Back" />
                </button>
                <div className="flex-grow text-center">
                <div className="text-2xl font-bold mr-8">
                    구독관리
                </div>    
            </div>
            </div>

            <div className="flex  mt-20">
                <div className="w-16 h-16">
                <img src={profile} alt="profile"  />
                </div>

                <div className="text-xl font-bold ml-4 mt-4">
                    멋사멋시:D
                </div>

                <div className="text-xl text-[#D9D9D9] font-bold ml-28 mt-4">
                    월구독료
                </div>
                <div className="text-xl  font-bold ml-2 mt-4">
                  1,900/월
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300 mt-12" />

<div className="flex flex-col items-center space-y-2"/>

            
            
            <Footer/>
        </div>
    )
}

export default MySubscription;