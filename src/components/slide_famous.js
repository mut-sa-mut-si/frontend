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

  const { popularRecipers } = maindata || {}; // maindata�� undefined�� ��� �� ��ü�� ��ü

  console.log(popularRecipers);

  return (
    <div>
      <div className="font-bold text-[24px]">
        <h2> �α��ִ� ������ </h2>
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
                <p className="text-main-color">{recipe.recipeCount}��</p>
                <p>�� �����ǿ���</p>
                <p className="text-main-color ml-4">{recipe.reviewCount}��</p>
                <p>�� �ı⸦ �޾Ҿ��</p>
                <p className="text-main-color ml-8 flex">
                  {recipe.ratingAverage} <FaStar size='12' color='gold' className="ml-2 mt-2" />
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="font-bold text-[24px]">
            <h3>�α� �����ǰ� �����ϴ�.</h3>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SliderFamous;
