import React from 'react';
import profile from '../assets/img/profile.png';
import { FaStar } from 'react-icons/fa';

const Review = ({ reviewList }) => {
  return (
    <div>
      {reviewList.map((el) => (
        <div key={el.id} className="items-center mt-4">
          <div className="flex items-center ml-2">
            <img src={profile} alt="profile" className="w-12" />
            {el.member && (
              <div className="font-bold text-[18px] ml-2">{el.member.name}</div>
            )}
            <div className='flex ml-4'>
{[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                size='24'
                color={index < el.rating ? 'gold' : 'gray'}
              />
            ))}
            </div>
          </div>
        
          <div className="font-bold mt-4 text-[15px] ml-2 flex items-start justify-start w-[400px] h-auto border bg-[#E7F2EC] rounded-[30px]">
            <div className="p-4">
              {el.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
