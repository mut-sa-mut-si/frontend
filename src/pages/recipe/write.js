import React, { useState } from "react";
import picAdd from '../../assets/img/picadd.png';
import back from '../../assets/img/back_.png';
import axios from "axios";
import styled from 'styled-components';
import ImgUpload from "../../components/imgUpload";
import { useNavigate } from 'react-router-dom';
import Side from "../../components/side";
import Sidebar from "../../components/sidebar";

const TagItem = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: 20px;
  background-color: #d1e7dd; /* Light green background */
  color: #0f5132; /* Dark green text */
  margin-right: 0.5em;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #badbcc; /* Light green border */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #c3e6cb; /* Slightly darker green */
    color: #0c6e3e; /* Darker green text */
  }

  span {
    margin-right: 0.5em;
  }

  span:last-child {
    cursor: pointer;
    color: #dc3545; /* Red color for remove button */
    font-weight: bold;
    font-size: 16px;
  }
`;

// Updated TagInputContainer styled component
const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  align-items: center;
  border-radius: 0.7rem;
  border: 1px solid #d2d6dc;
  padding: 0.5em;
  background-color: #f8f9fa; /* Light gray background */
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
  transition: border-color 0.3s;

  &:focus-within {
    border-color: #56c08c; /* Green border on focus */
  }

  input {
    flex: 1; /* Expand to take available space */
    padding: 0.5em 1em; /* Add padding for better visual appeal */
    border: 1px solid #d2d6dc; /* Match the border color */
    border-radius: 20px; /* Rounded corners */
    background-color: #e7f2ec; /* Light green background */
    color: #495057; /* Dark text color */
    font-size: 14px; /* Adjust font size */
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      border-color: #56c08c; /* Green border on focus */
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
      outline: none; /* Remove default outline */
    }
  }
`;

function Write() {
    const [view, setView] = useState(true);
    const [contents, setContents] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [images, setImages] = useState([]);
    const [imgSrc, setImgSrc] = useState([]);
    const navigate = useNavigate();

    const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({
        recipe: {
            title: '',
            category: '',
            tag: '',
            content: '',
            isPublic: true,
        },
    });

    const { recipe } = groupBuyingRequestDto;
    const { title, category, content, tag } = recipe;

    const onChange = (e) => {
        const { value, name } = e.target;
        setGroupBuyingRequestDto(prevState => ({
            ...prevState,
            recipe: {
                ...prevState.recipe,
                [name]: value
            }
        }));
    };

    const api = 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';

    const handleImg = (selectedImgs) => {
        setImages(Array.from(selectedImgs));
        setImgSrc(Array.from(selectedImgs).map(file => URL.createObjectURL(file)));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupBuyingRequestDto(prevState => ({
            ...prevState,
            recipe: {
                ...prevState.recipe,
                [name]: value,
            },
        }));

        if (name === 'content') {
            setContents(value);
        }
    };

    const handleCategoryChange = (category) => {
        setGroupBuyingRequestDto(prevState => ({
            ...prevState,
            recipe: {
                ...prevState.recipe,
                category,
            },
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setContents(contents + '\n• ');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tag.trim() !== '') {
                const newTags = [...hashtags, tag.trim()];
                setHashtags(newTags);
                setGroupBuyingRequestDto(prevState => ({
                    ...prevState,
                    recipe: {
                        ...prevState.recipe,
                        tag: '',
                    },
                }));
            }
        }
    };

    const removeTag = (tagIdx) => {
        const newTags = hashtags.filter((_, idx) => idx !== tagIdx);
        setHashtags(newTags);
    };

    const handleClick = () => {
        setView(!view);
        setGroupBuyingRequestDto(prevState => ({
            ...prevState,
            recipe: {
                ...prevState.recipe,
                isPublic: !view,
            },
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (title.length === 0) {
            alert("제목을 입력해주세요");
            return;
        }
        if (category.length === 0) {
            alert("카테고리를 선택해주세요");
            return;
        }
        if (content.length === 0) {
            alert("글을 입력해주세요");
            return;
        }
        if (images.length === 0) {
            alert("사진을 업로드 해주세요");
            return;
        }

        const dataToSend = {
            recipe: {
                title,
                content,
                category,
                isPublic: view,
                hashtags: hashtags.map(tag => ({ content: tag })),
            },
            images: []
        };

        const formData = new FormData();
        formData.append('recipe', new Blob([JSON.stringify(dataToSend.recipe)], { type: "application/json" }));

        images.forEach(img => {
            formData.append('images', img);
        });

        const token = localStorage.getItem('jwt');
        console.log(category);

        const cleanToken = token ? token.replace('Token: ', '') : '';
        try {
            const response = await axios.post(`${api}/api/v1/recipes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':  `${cleanToken}`,
                },
            });
            console.log(response.data);
            alert("등록되었습니다");
            navigate('/search');
        } catch (error) {
            console.error(error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };
    console.log(category);
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <Side />
            <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
                <form onSubmit={onSubmit}>
                    <div className="flex items-center mb-6">
                        <button className="w-8 h-8 rounded-[30px]">
                            <img src={back} alt="Back" />
                        </button>
                        <h1 className="text-2xl font-bold ml-4 rounded-[30px]">레시피 작성</h1>
                    </div>
                    <p className="font-semibold text-2xl ml-2 text-gray-300 mb-4">특별한 레시피를 공유해주세요</p>
                    <div className="">
                        <button type="button" onClick={() => handleCategoryChange('SKIN')} className={`w-32 h-11 p-3 ml-2 font-semibold rounded-[30px] focus:outline-none focus:ring-2 border ${category === 'SKIN' ? 'border-[#56C08C] ring-[#56C08C] bg-[#56C08C] text-white' : ''}`} style={{ fontSize: '15px' }}>
                            피부미용
                        </button>
                        <button type="button" onClick={() => handleCategoryChange('HEALTH')} className={`w-32 h-11 p-3 ml-8 font-semibold rounded-[30px] focus:outline-none focus:ring-2 border ${category === 'HEALTH' ? 'border-[#56C08C] ring-[#56C08C] bg-[#56C08C] text-white' : ''}`} style={{ fontSize: '15px' }}>
                            헬스
                        </button>
                        <button type="button" onClick={() => handleCategoryChange('NUTRIENTS')} className={`w-32 h-11 p-3 ml-8 font-semibold rounded-[30px] focus:outline-none border ${category === 'NUTRIENTS' ? 'border-[#56C08C] focus:ring-[#56C08C] bg-[#56C08C] text-white' : ''}`} style={{ fontSize: '15px' }}>
                            영양제
                        </button>
                    </div>
                    <input
                        type="text"
                        onChange={onChange}
                        value={title}
                        name="title"
                        placeholder="제목을 입력하세요"
                        className="w-full p-3 mb-4 h-20  border mt-12 rounded-[30px] bg-[#E7F2EC] focus:outline-none focus:ring-2 focus:ring-[#56C08C]"
                        style={{ fontSize: '14px' }}
                    />
                    <textarea
                        placeholder="레시피를 입력하세요"
                        value={content}
                        name="content"
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        className="w-full p-3 mb-4 border rounded-[30px] bg-[#E7F2EC]  focus:outline-none focus:ring-2 focus:ring-[#56C08C] resize-none"
                        style={{ fontSize: '14px', height: '30vh' }}
                    />
                    <p className="font-semibold text-gray-600 mb-4">해시태그를 추가해 레시피를 알려보세요</p>
                    <TagInputContainer>
                        <div className="w-full">
                            {hashtags.map((tag, idx) => (
                                <TagItem key={idx}>
                                    <span>{tag}</span>
                                    <span onClick={() => removeTag(idx)}>&times;</span>
                                </TagItem>
                            ))}
                            {hashtags.length <= 3 && (
                                <input
                                    type="text"
                                    onKeyDown={handleKeyDown}
                                    placeholder={hashtags.length === 0 ? "엔터를 입력하여 태그를 등록해주세요" : ""}
                                    name="tag"
                                    onChange={onChange}
                                    value={tag}
                                    className="w-[70%] p-3 mb-4 border rounded-[30px] bg-[#E7F2EC]  focus:outline-none focus:ring-2 focus:ring-[#56C08C]"
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
                            className="w-[30%] p-3 border border-[#56C08C] text-main-color font-semibold rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#56C08C]"
                            onClick={handleClick}
                            style={{ fontSize: '14px' }}
                        >
                            {view ? "공개" : "비공개"}
                        </button>
                        <button type="submit" className="w-[65%] h-[70px] p-3 bg-[#56C08C] text-white font-semibold rounded-[30px] focus:outline-none focus:ring-2 focus:ring-main-color" style={{ fontSize: '14px' }}>
                            제출하기
                        </button>
                    </div>
                </form>
            </div>
            <Sidebar />
        </div>
    );
}

export default Write;
