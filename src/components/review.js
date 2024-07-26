import React from "react";
import profile from '../assets/img/profile.png';

const Review = ({ reviewList }) => {
  return (
    <div>
      {reviewList.map((el) => (
        <div key={el.id} className=" items-center mt-4">
          
          <div className="flex items-center ml-2">

          <img src={profile} alt="profile" className="w-12" />
          <div className="font-bold text-[18px] ml-2">{el.user}</div>
          
          </div>
          
          
          <div className="font-bold mt-4 text-[15px] ml-2 flex items-center justify-center w-[400px] h-auto border bg-[#E7F2EC] rounded-[30px]">
           <div className="p-4">
            {el.review}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
