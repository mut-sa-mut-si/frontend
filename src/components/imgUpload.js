import React, { useState } from "react";
import picAdd from '../assets/img/picadd.png';

function ImgUpload({onSelectedImg}) {
    const [profileImage, setProfileImage] = useState([]);//���õ� �̹��� ����
    const [imgsrc, setImgsrc] = useState([]);//url�� �����Ͽ� �̸����� �̹����� ���
  
    function onChangeImg(e) {//���� ���ý� ȣ��
      
      const files= Array.from(e.target.files);
      const newFiles = files.slice(0,3-profileImage.length);

      setProfileImage(prevImages => [...prevImages, ...newFiles].slice(0,3));
      setImgsrc(prevSrcs => [...prevSrcs, ...newFiles.map(file => URL.createObjectURL(file))].slice(0,3));
      onSelectedImg([...profileImage, ...newFiles].slice(0,3))//�ݹ�
    };

    return (
        <div className="flex items-center mt-4 w-full">
            
            
        {/* �̹��� ���ε� ��ư */}
        <div className="imgUpload_btn w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-400 mr-4">
          <img src={picAdd} alt="Add" className="w-12 h-12" />
          <input
            name="imgUpload"
            type="file"
            accept="image/*"
            onChange={onChangeImg}
            multiple
            className="absolute opacity-0 cursor-pointer" // ���� ���� ��ư�� ����� Ŭ�� �����ϰ� ����
          />
        </div>
      
        {/* �̹��� �̸����� */}

        <div className="img_preview flex space-x-2p">
         {imgsrc.map((src,index)=>(
            <img
            key={index}
            alt={`sample-${index}`}
              src={src}
              className="h-24 w-24 object-cover rounded-lg" // �̹��� ũ�⸦ �����̳ʿ� �°� ����
            />
         ))}
         
       
        </div>
      </div>
      
    );
  }
  
  export default ImgUpload;