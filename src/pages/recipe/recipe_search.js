import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar";
import History from "../../components/history";
import Back from '../../assets/img/back_.png';
import Side from "../../components/side";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import profile from '../../assets/img/profile.png';
import { useNavigate } from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import Numcomment from "../../assets/img/numcomment.png";
import imgDetail from "../../assets/img/img_detail.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function RecipeSearch(){
    const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('keyword');
  const navigate = useNavigate();

  const handleRecipeClick = (id) => {
    navigate(`/recipeDetail/${id}`); // id에 맞는 URL로 이동
  };

  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';

  const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      
        const searchKey = async () => {
          try {
            const response = await axios.get(`http://${api}/api/v1/search/unauthentication`, {
                headers: {
                  'Authorization': `${cleanToken}`,
                },

                params:{
                    keyword:keyword,
                }

          
            });
           
            console.log(response.data);
            setSearchResults(response.data.recipes)
          
          } catch (error) {
            console.error('There was an error', error);
          }

        
        };
    
        searchKey();
      }, [keyword]); 
    
      const handleAddKeyword = (newKeyword) => {
        navigate(`/recipesearch?keyword=${encodeURIComponent(newKeyword)}`);
      };
    

   
        return (
            <div className="relative w-screen h-screen overflow-hidden">
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            
            <div className="fixed top-0 left-[670px] max-w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
          <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2 mb-4">
                    <img src={Back} alt="Back" />
                </button>
                <SearchBar onAddKeyword={handleAddKeyword}/>
                </div>

            <div className="flex mt-6 ml-4">
                <div className="text-[20px] font-bold text-[#56C08C]">{keyword}</div>
               <div className="text-[20px] font-bold"> (으)로 검색한 결과 </div>
               </div>

                <div className="items-center justify-center w-200 h-[300px] mt-[39px] rounded-[20px] bg-[#E7F2EC] ">
        {Array.isArray(searchResults) && searchResults.map((recipe, index) => (
            <div key={index} 
 onClick={() => handleRecipeClick(recipe.id)} 
            className="flex flex-col  bg-[#E7F2EC] rounded-lg shadow-md p-4 mt-8">
                 {recipe.images.map((image, idx) => (
    <div key={idx} className="flex justify-center">
      <img
        src={image}
        alt={`Recipe ${index} - ${idx}`}
        className="w-full h-[300px] object-cover rounded-[20px]" // 수정된 부분
      />
    </div>
  ))}
                <div className="mt-4 ml-4 text-lg font-bold">{recipe.title}</div>
                <div className="flex items-center mt-4 ml-3">
                  <img src={profile} alt="profile" className="w-8 h-8 mr-2" />
                  <div className="text-sm text-gray-500">{recipe.member.name}</div>

                  <div className="flex justify-end ml-52 text-sm text-gray-500">
                 
                  <div className="mr-4 flex items-center">
                 <img src={Numcomment} alt="numcomment" className="w-8" />
                 {recipe.reviewCount}
                    </div>
                  
                  <div className="mr-4 flex items-center">
                  <FaStar color='gold' className="mr-1 w-6 h-6" /> 
                  {recipe.ratingAverage}
                </div>
                  
                </div>
                </div>

               
                </div>
          ))}
        </div>



                


            </div>
            </div>

        )
    

}

export default RecipeSearch;