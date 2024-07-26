import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SliderReview(){
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
        <h2> 실시간 레시피 후기 </h2>
     
        </div>
        
        <Slider {...settings}>
          <div className=" font-bold text-[24px] mt-24">
            <h3>무서워 이것은 정말 무서워. 그러나 우
리는 이것을 모릅니다. 우리가 만약 이
걸 알았더라면 우리는 모른다.</h3>
          </div>
          <div className="font-bold text-[24px] mt-24">
            <h3>스킨케어는 이렇게 해보세요</h3>
          </div>
          <div className="font-bold text-[24px] mt-24">
            <h3>헬스 어떻게 하세요?</h3>
        
          </div>
          <div className="font-bold text-[24px] mt-24">
            <h3>건성 피부인 당신, 이제품을 써보세요</h3>
        
          </div>
          <div className="font-bold text-[24px] mt-24">
            <h3>현대인이라면 영양제는 필수죠.</h3>
        
          </div>
        </Slider>
      </div>
      )
}

export default SliderReview;