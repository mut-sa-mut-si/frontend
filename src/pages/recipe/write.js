import React, { useState, useEffect } from "react";
import picAdd from '../../assets/img/picadd.png';
import back from '../../assets/img/back.png';
import Header from "../../components/Layout";
import Footer from "../../components/footer";
import axios from "axios";
import styled from 'styled-components';
import ImgUpload from "../../components/imgUpload";
import { useNavigate } from 'react-router-dom'


const TagItem = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5em 0.75em;
  border-radius: 20px;
  background-color: #e2e8f0;
  margin-right: 0.5em;

`;

const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  align-items: center;
  border-radius: 0.7rem;
  border: 1px solid #d2d6dc;
`;


function Write() {
    const [view, setView] = useState(true);
    const [contents, setContent] = useState('');
    const [hashtags, setTags] = useState([]);

    //이미지 업로드
    const [images, setPostImage] = useState("");//업로드된 이미지 저장
    const [imgsrc, setImgsrc] = useState([]);

      function handleImg(selectedImgs) {
        setPostImage(selectedImgs);
        setImgsrc(Array.from(selectedImgs).map(file => URL.createObjectURL(file)));
    }

//컴포넌트에서 전달된 이미지 파일 처리

    let api = 'http://default-grwm-server-serv-5a4ff-25576678-bcc81229602b.kr.lb.naverncp.com:8080';
    const navigate = useNavigate();
   

    console.log(hashtags);

     //axios header 선언
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

      const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({
        title: '',
        category: '',
        tag: '',
        content: '',
       isPublic:true,
      });
    
      const { title, category, content, tag } = groupBuyingRequestDto;
    
      const onChange = (e) => {
        const { value, name } = e.target;
        setGroupBuyingRequestDto({
          ...groupBuyingRequestDto,
          [name]: value
        })
      };


      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newValue = content + `\n• `;
            setContent(newValue);
        }
    };

      const handleChange = (e) => {
        onChange(e);  // 기존 onChange 함수 호출
        setContent(e.target.value); 
      }

      console.log(content);


      const handleCategoryChange = (category) => {
        setGroupBuyingRequestDto({
          ...groupBuyingRequestDto,
          category
        });
      };
  
      const onSubmit = (e) => {
        e.preventDefault();

        if(title.length===0){
            alert("제목을 입력해주세요")
        }
        else if (category.length === 0) {
            alert("카테고리를 선택해주세요")
          }
          else if (content.length === 0) {
            alert("글을 입력해주세요")
          }  
          else if (images.length === 0) {
            alert("사진을 업로드 해주세요")
          }
        
          
          else {
            const { tag, ...dataToSend } = groupBuyingRequestDto;

           
   
            dataToSend.hashtags = hashtags.map(tag => ({ content: tag }));

          
            const form = new FormData()
                images.forEach((image) => {
                form.append('images', image);
            });
            form.append('groupBuyingRequestDto', new Blob([JSON.stringify(groupBuyingRequestDto)], {
                type: "application/json"
            }));

    //postImage를 FormData에 추가하고, 
    //groupBuyingRequestDto를 JSON으로 변환하여 추가
           console.log(dataToSend);
            axios.post(`${api}/api/v1/recipes`, dataToSend,  {headers})
              .then(function (response) {
                console.log(response);
                alert("등록되었습니다");
                navigate('/search');
              }).catch(function (error) {
                console.log(error);
              });
          }
        };


    

    const handleClick = () => {
        setView(!view);
        setGroupBuyingRequestDto({
            ...groupBuyingRequestDto,
            isPublic: !view // 공개 여부 변경
          });
      
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (groupBuyingRequestDto.tag.trim() !== '') {
            const newTags = [...hashtags, groupBuyingRequestDto.tag.trim()];
            setTags(newTags);
            setGroupBuyingRequestDto({
              ...groupBuyingRequestDto,
              hashtags: newTags, // tags 배열 업데이트
              tag: '' // 입력 칸 비우기
            });
          }
        }
      };
      
        
     
      
    //태그 삭제
    const removeTag = (tagIdx) => {
        setTags(hashtags.filter((tag, idx) => idx != tagIdx));
    };


    

    return (
    
        <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[90px] mx-auto flex-grow">
            <Header/>
            <form onSubmit={onSubmit}>
                <div className="flex items-center mb-6">
                    <button className="w-8 h-8">
                        <img src={back} alt="Back" />
                    </button>
                    <h1 className="text-2xl font-bold ml-4">레시피 작성</h1>
                </div>

                <p className="font-semibold text-2xl ml-2 text-gray-300 mb-4">특별한 레시피를 공유해주세요</p>

                <div className="">
          <button type="button" onClick={() => handleCategoryChange('피부미용')} className={`w-32 h-11 p-3 ml-2 font-semibold rounded-lg focus:outline-none focus:ring-2 border ${category === '피부미용' ? 'border-main-color ring-main-color bg-main-color text-white' : ''}`} style={{ fontSize: '15px' }}>
            피부미용
          </button>
          <button type="button" onClick={() => handleCategoryChange('헬스')} className={`w-32 h-11 p-3 ml-8 font-semibold rounded-lg focus:outline-none focus:ring-2 border ${category === '헬스' ? 'border-main-color ring-main-color bg-main-color text-white' : ''}`} style={{ fontSize: '15px' }}>
            헬스
          </button>
          <button type="button" onClick={() => handleCategoryChange('영양제')} className={`w-32 h-11 p-3 ml-8 font-semibold rounded-lg focus:outline-none border ${category === '영양제' ? 'border-main-color focus:ring-main-color bg-main-color text-white' : ''}`} style={{ fontSize: '15px' }}>
            영양제
          </button>
        </div>

                


                <input
                    type="text"
                    onChange={onChange} 
                    value={title}
                     name="title"
                    placeholder="제목을 입력하세요"
                    className="w-full p-3 mb-4 border mt-12 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />

                <textarea
                    placeholder="레시피를 입력하세요"
                    value={content}
                    name="content"
                    onChange={handleChange} 
                    onKeyDown={handleKeyPress}
                   
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color resize-none"
                    style={{ fontSize: '14px', height: '30vh' }}
                />
                 
                <p className="font-semibold text-gray-600 mb-4">해시태그를 추가해 레시피를 알려보세요</p>


                
                <TagInputContainer>

                <div>
                
                {hashtags.map((tag, idx) => (
                    <TagItem key={idx}>
                <span>{tag}</span>
                <span onClick={() => removeTag(idx)}>
                &times;
                </span>
                    </TagItem>
                ))}
                {hashtags.length <= 3 && (
                <input
                
                    type="text"
                    onKeyDown={handleKeyDown}
                    placeholder={hashtags.length == 0 ? "엔터를 입력하여 태그를 등록해주세요" : ""}
                      name="tag"
                    onChange={onChange}
                    value={tag}
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />
            )}

                </div>
                
            
               
            </TagInputContainer>

                
            <p className="font-semibold text-gray-600 mt-4">*이미지는 3개까지 등록 가능합니다</p>
                <div className="flex justify-between mb-4">
                    
                <ImgUpload onSelectedImg={handleImg} />
                </div>

                <div className="flex justify-between mb-4">
                    <button
                        className="w-[45%] p-3 border border-main-color text-main-color font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color"
                        onClick={handleClick}
                        style={{ fontSize: '14px' }}
                    >
                        {view ? "공개" : "비공개"}
                    </button>

                    <button type="submit" className="w-[45%] p-3 bg-main-color text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color" style={{ fontSize: '14px' }}>
            등록하기
          </button>
                </div>
                </form>
                <Footer/>
            </div>
      
    );
}

export default Write;
