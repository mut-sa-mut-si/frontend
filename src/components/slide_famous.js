import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import profile from '../assets/img/profile.png';
import { FaStar } from 'react-icons/fa';

function SliderFamous({ maindata }) {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { popularRecipers } = maindata || {}; // maindata가 undefined일 경우 빈 객체로 대체

  console.log(popularRecipers);

  return (
    <div>
      <div className="font-bold text-[24px]">
        <h2> 인기있는 레시피 </h2>
      </div>
      <Slider {...settings}>
        {popularRecipers && popularRecipers.length > 0 ? (
          popularRecipers.map((recipe, index) => (
            <div key={index} className="">
              <div className="flex items-center">
                <h3 className="text-main-color font-bold text-[72px]">{recipe.rank}</h3>
                <p className="text-[24px] font-bold ml-8">{recipe.member.name}</p>
                <img src={profile} alt="profile" className="w-12 h-12 ml-52" />
              </div>
              <div className="flex font-bold text-[17px]">
                <p className="text-main-color">{recipe.recipeCount}개</p>
                <p>의 레시피에서</p>
                <p className="text-main-color ml-4">{recipe.reviewCount}개</p>
                <p>의 후기를 받았어요</p>
                <p className="text-main-color ml-8 flex">
                  {recipe.ratingAverage} <FaStar size='12' color='gold' className="ml-2 mt-2" />
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="font-bold text-[24px]">
            <h3>인기 레시피가 없습니다.</h3>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SliderFamous;
