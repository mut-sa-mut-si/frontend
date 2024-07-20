import React, { useState, useEffect } from "react";
import picAdd from '../../assets/img/picadd.png';
import back from '../../assets/img/back.png';
import Header from "../../components/Layout";
import Footer from "../../components/footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function HealthWrite() {
    const [view, setView] = useState(true);
    const [content, setContent] = useState('');
    let api = 'http://localhost:8080';
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");


    const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      useEffect(() => {
        if (localStorage.getItem('refreshToken') === 'null') {
          alert("로그인을 해주세요.");
          navigate('/login');
        }
      })


      const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({
        title: '',
        category: '',
        tag: '',
        recipe: ''
      });
    
      const { title, category, recipe, tag } = groupBuyingRequestDto;
    
      const onChange = (e) => {
        const { value, name } = e.target;
        setGroupBuyingRequestDto({
          ...groupBuyingRequestDto,
          [name]: value
        })
      };

      const handleChange = (e) => {
        onChange(e);  // 기존 onChange 함수 호출
        setContent(e.target.value); 
      }

      const onSubmit = (e) => {
        e.preventDefault();

        if(title.length===0){
            alert("제목을 입력해주세요")
        }
        else if (category.length === 0) {
            alert("카테고리를 선택해주세요")
          }
          else if (recipe.length === 0) {
            alert("글을 입력해주세요")
          }
        
          else if (tag.length === 0) {
            alert("태그를 입력해주세요")
          }else {
            const form = new FormData()
            form.append('groupBuyingRequestDto', new Blob([JSON.stringify(groupBuyingRequestDto)], {
              type: "application/json"
            }))
            
      axios.post(`${api}/api/v1/recipes`, config)
        .then(function(response) {
          console.log(response)
          alert("등록되었습니다")
          navigate('/search')
        }) .catch(function(error) {
          console.log(error)
        })
      }
      }



    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newValue = content + `\n• `;
            setContent(newValue);
        }
    };

    const handleClick = () => {
        setView(!view);
    }

    
    console.log(groupBuyingRequestDto)

    return (
    
        <div className="relative w-[512px] h-[912px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[80px] mx-auto flex-grow">
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
                <button className="w-32 h-11 p-3 ml-2  font-semibold rounded-lg focus:outline-none focus:ring-2 border border-main-color focus:ring-main-color focus:bg-main-color focus:text-white" style={{ fontSize: '15px' }}>
                        피부미용
                    </button>
                    <button className="w-32 h-11 p-3 ml-8 font-semibold rounded-lg focus:outline-none focus:ring-2 border  border-main-color focus:ring-main-color focus:bg-main-color focus:text-white" style={{ fontSize: '15px' }}>
                        헬스
                    </button>
                    <button className="w-32 h-11 p-3 ml-8 font-semibold rounded-lg focus:outline-none border border-main-color focus:ring-2 focus:ring-main-color focus:bg-main-color focus:text-white" style={{ fontSize: '15px' }}>
                        영양제
                    </button>
                </div>
                


                <input
                    type="text"
                    onChange={onChange} 
                    value={title}
                    placeholder="제목을 입력하세요"
                    className="w-full p-3 mb-4 border mt-12 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />

                <textarea
                    placeholder="레시피를 입력하세요"
                    value={recipe}
                  
                    onChange={handleChange} 
                    onKeyDown={handleKeyPress}
                   
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color resize-none"
                    style={{ fontSize: '14px', height: '30vh' }}
                />
                 
                <p className="font-semibold text-gray-600 mb-4">해시태그를 추가해 레시피를 알려보세요</p>

                <input
                    type="text"
                    placeholder="태그를 입력하세요"
                    onChange={onChange}
                    value={tag}
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />

                <div className="flex justify-between mb-4">
                    <button className="w-1/4 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        <img src={picAdd} alt="Add" className="w-12 h-12" />
                    </button>
                </div>

                <div className="flex justify-between mb-4">
                    <button
                        className="w-[45%] p-3 border border-main-color text-main-color font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color"
                        onClick={handleClick}
                        style={{ fontSize: '14px' }}
                    >
                        {view ? "공개" : "비공개"}
                    </button>

                    <button className="w-[45%] p-3 bg-main-color text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color" style={{ fontSize: '14px' }}>
                        <input type="submit" value="등록하기"/>
                    </button>
                </div>
                </form>
                <Footer/>
            </div>
      
    );
}

export default HealthWrite;
