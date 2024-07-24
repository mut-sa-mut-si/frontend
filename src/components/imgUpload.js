import React, { useState } from "react";
import picAdd from '../assets/img/picadd.png';

function ImgUpload({onSelectedImg}) {
    const [profileImage, setProfileImage] = useState([]);//선택된 이미지 저장
    const [imgsrc, setImgsrc] = useState([]);//url을 저장하여 미리보기 이미지로 사용
  
    function onChangeImg(e) {//파일 선택시 호출
      
      const files= Array.from(e.target.files);
      const newFiles = files.slice(0,3-profileImage.length);

      setProfileImage(prevImages => [...prevImages, ...newFiles].slice(0,3));
      setImgsrc(prevSrcs => [...prevSrcs, ...newFiles.map(file => URL.createObjectURL(file))].slice(0,3));
      onSelectedImg([...profileImage, ...newFiles].slice(0,3))//콜백
    };

    return (
        <div className="flex items-center mt-4 w-full">
            
            
        {/* 이미지 업로드 버튼 */}
        <div className="imgUpload_btn w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-400 mr-4">
          <img src={picAdd} alt="Add" className="w-12 h-12" />
          <input
            name="imgUpload"
            type="file"
            accept="image/*"
            onChange={onChangeImg}
            multiple
            className="absolute opacity-0 cursor-pointer" // 파일 선택 버튼을 숨기고 클릭 가능하게 설정
          />
        </div>
      
        {/* 이미지 미리보기 */}

        <div className="img_preview flex space-x-2p">
         {imgsrc.map((src,index)=>(
            <img
            key={index}
            alt={`sample-${index}`}
              src={src}
              className="h-24 w-24 object-cover rounded-lg" // 이미지 크기를 컨테이너에 맞게 조절
            />
         ))}
         
       
        </div>
      </div>
      
    );
  }
  
  export default ImgUpload;