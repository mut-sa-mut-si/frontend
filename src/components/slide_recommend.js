import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import profile from '../assets/img/profile.png';
import { FaStar } from 'react-icons/fa';
import numcomment from '../assets/img/numcomment.png';

function SliderRecommend({maindata}){
    const settings = {
        
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,           // 자동 슬라이드 설정
        autoplaySpeed: 3000,      // 자동 슬라이드 속도 (밀리초 단위)
      };
    
  const { recommendRecipes } = maindata || {}; // maindata가 undefined일 경우 빈 객체로 대체

  console.log(recommendRecipes);

      return(
        <div>
            <div className="font-bold text-[24px]">
        <h2> 추천 레시피 </h2>
     
        </div>
        <div className="font-bold mt-4  flex">
        <h2 className="text-main-color text-[20px]"> 그룸이 </h2>
        <h2 className="ml-2 text-[20px]"> 오다가 주웠어요 </h2>
        <h2 className="ml-8 text-[16px] mt-1 text-[#D9D9D9] "> 진짜 주운건 아니에요 </h2>
        </div>

        <Slider {...settings}>
        {recommendRecipes && recommendRecipes.length > 0 ? (
          recommendRecipes.map((recipe, index) => (


            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <div className="flex items-center mt-4">
                  <img
                    src={profile}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-4 text-sm font-bold text-gray-600">
                    {recipe.member.name}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    
                  </div>
                  <div className="flex text-sm text-gray-600  items-center">
               
                  {recipe.reviewCount}
                  <img src={numcomment} alt="numcomment" className="w-8 mr-4" />

                    <span className="text-sm text-gray-600">{recipe.ratingAverage}</span>
                    <FaStar size='12' color='gold' className="ml-1" />
                  </div>
                </div>
              </div>
            </div>


           ))
          ) : (
            <div className="font-bold text-[24px]">
              <h3>추천 레시피가 없습니다.</h3>
            </div>
          )}
        </Slider>
      </div>
      )
}

export default SliderRecommend;