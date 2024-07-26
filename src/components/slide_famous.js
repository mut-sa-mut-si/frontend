import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SliderFamous(){
    const settings = {
        
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,           // 자동 슬라이드 설정
        autoplaySpeed: 3000,      // 자동 슬라이드 속도 (밀리초 단위)
      };

      return(
        <div>
            <div className="font-bold text-[24px]">
        <h2> 인기있는 레시피 </h2>
        </div>
        <Slider {...settings}>
          <div className="text-main-color font-bold text-[72px]">
            <h3>1</h3>
          </div>
          <div className="text-main-color font-bold text-[72px]">
            <h3>2</h3>
          </div>
          <div className="text-main-color font-bold text-[72px]">
            <h3>3</h3>
        
          </div>
        </Slider>
      </div>
      )
}

export default SliderFamous;