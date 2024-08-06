import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/img/profile.png';
import Side from '../../components/side';
import iconMedicine from '../../assets/img/icon_medicine.png';
import iconSkin from '../../assets/img/icon_skin.png';
import iconHealth from '../../assets/img/icon_health.png';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Numcomment from '../../assets/img/numcomment.png';
import LoginPopup from '../../components/login_popup';
import lockIcon from '../../assets/img/lockIcon.png';
import Footer from '../../components/footer';
import pencilIcon from '../../assets/img/pencilIcon.png';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [recipe, setRecipe] = useState([]);

    const isAuthenticated = !!localStorage.getItem('jwt');

    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();

    const handleClick = (type) => {
        setSelected(type.toUpperCase());
    };

    const handleRecipeClick = (recipe) => {
        if (!recipe.public) {
            setIsPopupOpen(true); // 팝업 열기
        } else {
            navigate(`/recipeDetail/${recipe.id}`); // id에 맞는 URL로 이동
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selected === null) {
                    const defaultResponse = await axios.get(
                        `http://${api}/api/v1/recipes/default-recipes/unauthentication`,
                        {
                            headers: {
                                Authorization: `${cleanToken}`,
                            },
                        }
                    );
                    setRecipe(defaultResponse.data.recipes);
                } else {
                    const response = await axios.get(`http://${api}/api/v1/recipes/unauthentication`, {
                        headers: {
                            Authorization: `${cleanToken}`,
                        },
                        params: {
                            category: selected,
                        },
                    });

                    console.log(response.data);
                    setRecipe(response.data.recipes);
                }
            } catch (error) {
                console.error('There was an error', error);
            }
        };

        fetchData();
    }, [selected]);

    const handleWriteRecipe = () => {
        // 로그인 팝업 띄우기
        setIsPopupOpen(true);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            <Side className='hidden sm:block' />
            <div className='fixed top-0 left-0 sm:left-[765px] sm:w-[512px] h-[calc(100vh-3px)] w-full bg-[#F9F8F8] shadow-2xl rounded-[30px] overflow-y-auto no-scrollbar z-10'>
                {/* 초록색 박스 */}
                <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                    <div className='font-bold mt-4 ml-2 text-[24px]'>레시피</div>

                    <div className='flex justify-center mt-4 mr-[83px]'>
                        <button
                            className={`w-28 h-12 font-bold flex items-center justify-center rounded-[20px] border ${
                                selected === 'SKIN' ? 'border-[#56C08C]' : 'border-gray-300'
                            }`}
                            onClick={() => handleClick('SKIN')}
                        >
                            <img src={iconSkin} alt='mainIcon' className='mr-4' />
                            <div className='ml-8 absolute'>피부</div>
                        </button>

                        <button
                            className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${
                                selected === 'HEALTH' ? 'border-[#56C08C]' : 'border-gray-300'
                            }`}
                            onClick={() => handleClick('HEALTH')}
                        >
                            <img src={iconHealth} alt='mainIcon' className='mr-2' />
                            헬스
                        </button>

                        <button
                            className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${
                                selected === 'NUTRIENTS' ? 'border-[#56C08C]' : 'border-gray-300'
                            }`}
                            onClick={() => handleClick('NUTRIENTS')}
                        >
                            <img src={iconMedicine} alt='mainIcon' className='mr-2' />
                            영양제
                        </button>
                    </div>

                    <div className='items-center justify-center p-6 '>
                        {Array.isArray(recipe) &&
                            recipe.map((recipe, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleRecipeClick(recipe)}
                                    className='flex flex-col bg-[#E7F2EC] rounded-lg shadow-md p-4 mt-8'
                                >
                                    <div className='relative'>
                                        <img
                                            src={recipe.image}
                                            alt={`Recipe ${index}`}
                                            className='w-full h-[300px] object-cover rounded-[20px]'
                                        />
                                        {!recipe.public && (
                                            <div className='flex'>
                                                <div className='absolute top-2 left-2 w-[120px] h-[45px] bg-main-color rounded-[15px] flex items-center justify-center'>
                                                    <img src={lockIcon} alt='잠금 아이콘' className='w-8 h-12 mr-2' />
                                                    <p className='font-bold text-[22px] mr-4 mt-1 text-white'>120G</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='mt-4 ml-4 text-lg flex font-bold'>{recipe.title}</div>
                                    <div className='flex items-center mt-4 ml-3'>
                                        <img src={profile} alt='profile' className='w-8 h-8 mr-2' />
                                        <p className='text-sm text-gray-500 ml-2'>{recipe.member.name}</p>
                                        <div className='flex items-center ml-auto text-sm text-gray-500'>
                                            <div className='mr-4 flex items-center'>
                                                <img src={Numcomment} alt='numcomment' className='w-8 mr-2' />
                                                {recipe.reviewCount}
                                            </div>
                                            <div className='mr-4 flex items-center'>
                                                <FaStar color='gold' className='mr-1 w-6 h-6' />
                                                {recipe.ratingAverage}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className='flex flex-col fixed z-20 items-center bottom-20 right-30'>
                        <button onClick={handleWriteRecipe}>
                            <img src={pencilIcon} className='w-[50px] h-[50px] mb-5' />
                        </button>
                    </div>
                    <div className='flex flex-col flxed items-center justify-between'>
                        <Footer />
                    </div>
                </div>
                {isPopupOpen && <LoginPopup onClose={() => setIsPopupOpen(false)} />} {/* 팝업 컴포넌트 */}
            </div>
        </div>
    );
}

export default RecipeList;
