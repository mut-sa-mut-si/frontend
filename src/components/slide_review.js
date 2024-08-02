import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from 'react-icons/fa';
import profile from '../assets/img/profile.png'; // 실제 이미지 경로로 수정하세요

function SliderReview({ maindata }) {
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { recipeReviews } = maindata || {}; // maindata가 undefined일 경우 빈 객체로 대체

  console.log(recipeReviews);

  return (
    <div>
      <div className="font-bold text-[24px]">
        <h2> 실시간 레시피 후기 </h2>
      </div>
      
      <Slider {...settings}>
        {recipeReviews && recipeReviews.length > 0 ? (
          recipeReviews.map((review, index) => (
            <div key={index} className="bg-[#E7F2EC] rounded-lg p-4 mt-8 h-[300px] shadow-md">
              <div className="flex items-center mt-4 ml-4">
                <img
                  src={profile}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <p className="ml-2 text-sm font-bold text-gray-600">
                  {review.reviewWriter.name}
                </p>
                
                <div className="ml-40 flex">
                {Array(review.rating).fill().map((_, i) => (
                  <FaStar key={i} size='16' color='gold' className=" " />
                ))}
                </div>
              </div>
           
              <div className="mt-8 ml-6 font-bold text-[22px] text-gray-800">
                {review.content}
              </div>
              <div className="mt-24 ml-4 text-xs text-gray-500">
                -  {review.reviewWriter.name}님의 {review.recipe.title} 레시피에 대한 후기입니다.
              </div>
            </div>
          ))
        ) : (
          <div className="font-bold text-[24px]">
            <h3>실시간 레시피 후기가 없습니다.</h3>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SliderReview;
