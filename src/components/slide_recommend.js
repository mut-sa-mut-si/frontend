import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SliderRecommend(){
    const settings = {
        
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,           // 자동 슬라이드 설정
        autoplaySpeed: 3000,      // 자동 슬라이드 속도 (밀리초 단위)
      };

      return(
        <div>
            <div className="font-bold text-[24px]">
        <h2> 추천 레시피 </h2>
     
        </div>
        <div className="font-bold text-[22px]">
        <h2> 그룸이 오다가 주웠어요 </h2>
        </div>
        <Slider {...settings}>
          <div className=" font-bold text-[24px]">
            <h3>운동 전 스트레칭, 그렇게 하는거 아니에요</h3>
          </div>
          <div className="font-bold text-[24px]">
            <h3>스킨케어는 이렇게 해보세요</h3>
          </div>
          <div className="font-bold text-[24px]">
            <h3>헬스 어떻게 하세요?</h3>
        
          </div>
          <div className="font-bold text-[24px]">
            <h3>건성 피부인 당신, 이제품을 써보세요</h3>
        
          </div>
          <div className="font-bold text-[24px]">
            <h3>현대인이라면 영양제는 필수죠.</h3>
        
          </div>
        </Slider>
      </div>
      )
}

export default SliderRecommend;