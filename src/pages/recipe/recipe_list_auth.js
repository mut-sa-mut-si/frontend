import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/img/profile.png';
import Side from "../../components/side";
import iconMedicine from "../../assets/img/icon_medicine.png";
import iconSkin from "../../assets/img/icon_skin.png";
import iconHealth from "../../assets/img/icon_health.png";
import Sidebar from "../../components/sidebar";
import { useNavigate } from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import Numcomment from "../../assets/img/numcomment.png";
import ChatPopup from "../../components/chat_popup";
import lockIcon from "../../assets/img/lockIcon.png";

function RecipeListAuth() {
  const [selected, setSelected] = useState("");
  const [recipe, setRecipe] = useState([]);
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';  
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';
  const navigate = useNavigate();

  const handleClick = (type) => {
    setSelected(type.toUpperCase());
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipeDetail/${id}`); // id에 맞는 URL로 이동
  };

  useEffect(() => {
    const recipeList = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/recipes/authentication`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
          params: {
            category: selected,
          },
        });
       
        console.log(response.data);
        setRecipe(response.data.recipes);
        console.log(recipe)
      } catch (error) {
        console.error('There was an error', error);
      }
    };

    recipeList();
  }, [selected]); // 여기에 selected 추가
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />

      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        <div className="font-bold mt-4 ml-2 text-[24px]">레시피</div>

        <div className="flex justify-center mt-4 mr-[83px]">
          <button
            className={`w-28 h-12 font-bold flex items-center justify-center rounded-[20px] border ${selected === "SKIN" ? "border-[#56C08C]" : "border-gray-300"}`}
            onClick={() => handleClick("SKIN")}
          >
            <img src={iconSkin} alt="mainIcon" className="mr-4" />
            <div className="ml-8 absolute">피부</div>
          </button>

          <button
            className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${selected === "HEALTH" ? "border-[#56C08C]" : "border-gray-300"}`}
            onClick={() => handleClick("HEALTH")}
          >
            <img src={iconHealth} alt="mainIcon" className="mr-2" />
            헬스
          </button>

          <button
            className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${selected === "NUTRIENTS" ? "border-[#56C08C]" : "border-gray-300"}`}
            onClick={() => handleClick("NUTRIENTS")}
          >
            <img src={iconMedicine} alt="mainIcon" className="mr-2" />
            영양제
          </button>
        </div>

        <div className="items-center justify-center p-6 ">
        {Array.isArray(recipe) && recipe.map((recipe, index) => (
            <div key={index} 
            onClick={() => handleRecipeClick(recipe.id)} 
            className="flex flex-col  bg-[#E7F2EC] rounded-lg shadow-md p-4 mt-8">

            <div className="relative">
                <img src={recipe.image} alt={`Recipe ${index}`} className="w-full h-[300px] object-cover rounded-[20px]" />
                {!recipe.public && (
                  <div className='flex '>
                    <div className="absolute top-2 left-2 w-[120px] h-[45px] bg-main-color rounded-[15px] flex items-center justify-center">
                    
                  <img src={lockIcon} alt="잠금 아이콘" className=" w-8 h-12 mr-2 " />
                  <p className='font-bold text-[22px] mr-4 mt-1 text-white'>120G</p>
                  
                  </div>
                  </div>
                )}
              </div>


                          
        
                  <div className="mt-4 ml-4 text-lg flex font-bold">{recipe.title}</div>
                    <div className="flex items-center mt-4 ml-3">
                      <img src={profile} alt="profile" className="w-8 h-8 mr-2" />
                      <p className="text-sm text-gray-500 ml-2">{recipe.member.name}</p>
                      <div className="flex items-center ml-auto text-sm text-gray-500">
                        <div className="mr-4 flex items-center">
                          <img src={Numcomment} alt="numcomment" className="w-8 mr-2" />
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

      <Sidebar />
    </div>
  );
}

export default RecipeListAuth;
