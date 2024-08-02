import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SliderSearch({ popular }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <div className="p-4">
      <Slider {...settings}>
        {popular.map((keyword, index) => (
          <div key={index} className="px-2">
            <div
              className="font-bold text-[16px] flex items-center justify-center border-2 border-[#56C08C] rounded-[15px] h-[40px] mx-2"
              style={{
                width: '100px', // 슬라이드 항목의 너비를 조정
              }}
            >
              <h3>{keyword.keyWord}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderSearch;
