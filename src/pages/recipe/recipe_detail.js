import React, { useState } from "react";
import Side from "../../components/side";
import Sidebar from "../../components/sidebar";
import Back from '../../assets/img/back_.png';
import styled from 'styled-components';
import numcomment from '../../assets/img/numcomment.png';

import {FaStar} from 'react-icons/fa';
import imgDetail from '../../assets/img/img_detail.png';
import Review from "../../components/review";

const ReviewContainer = styled.div`
  
  width: 100%;
  height: 600px; /* Adjust height as needed */
  border-radius: 8px;
  padding: 16px;

  margin-top: 20px; /* Adjust margin as needed */
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none;  /* For Internet Explorer and Edge */

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;


function RecipeDetail(){
    const [score, setScore] = useState([false,false,false,false,false]);
    const Array = [0,1,2,3,4];
    const [review, setReview] = useState('');
    const [reviewList, setReviewList] = useState([]);

    const saveReview = e => {
        setReview(e.target.value);
    }

    const pushReviewList = () => {
        if(review.trim()){
            setReviewList([
                ...reviewList,
                {
                    id: reviewList.length+1,
                    user: '김태영',
                    review: review,
                },
            ]);
            setReview('');
        }
      
    };


    const starScore = index => {
        let star = [...score];
        for(let i=0; i<5; i++){
            star[i] = i <= index ? true : false;
        }
        setScore(star);
    }

    
  

    return(
<div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />

      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
      <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2 mb-4">
                    <img src={Back} alt="Back" />
                </button>
        </div>

        <div className="font-bold text-[22px] mt-4">
            운동 전 스트레칭, 그렇게 하는거 아니에요
        </div>

        <div className="flex items-center mt-4 justify-between">
        <img src={imgDetail} alt="imgDetail" />
        </div>


        
        <div className="font-bold text-[18px] flex items-center justify-center w-28 h-12 mt-4 ml-[350px] border bg-[#E7F2EC] rounded-[10px]">
          <button className="w-full h-full flex items-center justify-center">
            1:1채팅
          </button>
        </div>

        <div className="font-bold text-[15px] flex items-center justify-center w-200 h-40 mt-4  border bg-[#E7F2EC] rounded-[10px]">
            텍스트가 들어갈 곳
            </div>

        
            <div className="font-bold text-[15px] flex items-center justify-center w-24 h-12 mt-4  border bg-[#E7F2EC] rounded-[15px]">
            #태그
            </div>

        <div className="flex items-center mt-8 ml-4">
        <div className="font-bold text-[18px]">
            후기 nn개
        </div>
        <img src={numcomment} alt="numcomment" className="w-12 ml-2" />
        </div>



        <ReviewContainer>
          <Review reviewList={reviewList} />
        </ReviewContainer>



        <div className="flex mt-4 ml-4">
            {Array.map((el, index) => (
                <FaStar
                key={index}
                size='24'
                color={score[index] ? 'gold' : 'gray'}
                onClick={()=> starScore(index)}
                 className="cursor-pointer"
                ></FaStar>
            ))}
        </div>


     

        <div className="flex mt-4">
                    <input
                        className="font-bold text-[15px] flex items-center justify-center w-[400px] h-16 border bg-[#E7F2EC] rounded-[30px] mr-4"
                        type="text"
                        placeholder="후기를 입력하세요"
                        onChange={saveReview}
                        value={review}
                    />
                    <button 
                    onClick={pushReviewList}
                    className="w-28 h-16 text-white font-bold bg-[#56C08C] rounded-[30px]">
                        등록
                    </button>
                </div>



        </div>
        <Sidebar/>
      </div>
    )
}

export default RecipeDetail;