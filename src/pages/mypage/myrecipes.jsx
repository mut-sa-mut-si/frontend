import React, { useEffect, useState } from "react";
import Side from "../../components/side";
import Back from '../../assets/img/back_.png';
import Review from '../../assets/img/numcomment.png';
import Star from '../../assets/img/star.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import './MyRecipes.css';
import Footer from "../../components/footer";

const api = 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        findRecipes();
    }, []);

    const findRecipes = async () => {
        const cleanToken = localStorage.getItem('jwt') ? localStorage.getItem('jwt').replace('Token: ', '') : '';
        try {
            // id 값 바꿔야함
            const response = await axios.get(`${api}/api/v1/members/1/recipes`, {
                headers: {
                    'Authorization': `${cleanToken}`,
                },
            });
            setRecipes(response.data.recipes);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            console.log(response);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleRecipeClick = (id) => {
        navigate(`/recipeDetail/${id}`);
    };

    return (
        <div className="fixed w-screen h-screen overflow-hidden cursor-pointer">
            <Side />
            <div name="a" className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-40px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] overflow-y-auto no-scrollbar z-10">
                <div className="sticky top-0 bg-[#F9F8F8] fixed flex flex-col items-center z-20 w-full p-6">
                  <Footer/>
                    <div name="b" className="flex items-center mb-6 w-full">
                    
                        <button className="w-8 h-8 rounded-[30px]">
                            <img src={Back} alt="Back" onClick={handleBackClick} />
                        </button>
                        <h1 className="text-2xl font-bold ml-4">작성 레시피</h1>
                    </div>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="space-y-4 ">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="bg-[#E0E8E0]  rounded-[20px] p-4 shadow-md">
                                    <div className="w-full h-[300px] bg-[#e0e0e0] rounded-[20px] mb-2 animate-skeleton" />
                                    <div className="flex items-center justify-between">
                                        <div className="w-[200px] h-[24px] bg-[#e0e0e0] rounded animate-skeleton" />
                                        <div className="flex items-center space-x-4">
                                            <div className="w-[40px] h-[24px] bg-[#e0e0e0] rounded animate-skeleton" />
                                            <div className="w-[40px] h-[24px] bg-[#e0e0e0] rounded animate-skeleton" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        recipes.length > 0 ? (
                            <div className="space-y-4">
                                {recipes.map((recipe) => (
                                    <div 
                                        key={recipe.id} 
                                        className="bg-[#E0E8E0]  rounded-[20px] p-6  shadow-md cursor-pointer"
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    >
                                        <img src={recipe.image} alt={recipe.title} className="w-full h-[300px] object-cover rounded-[20px] mb-2" />
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-bold flex-1">{recipe.title}</h2>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center text-[#B3B3B3] font-bold">
                                                    <span className="mr-1">{recipe.reviewCount}</span>
                                                    <img src={Review} alt="Reviews" className="w-6 h-5" />
                                                </div>
                                                <div className="flex items-center text-[#B3B3B3] font-bold mr-2">
                                                    <span className="mr-1">{recipe.ratingAverage?.toFixed(1)}</span>
                                                    <img src={Star} alt="Rating" className="w-4 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-lg font-bold text-gray-700 mb-4">작성한 레시피가 없습니다.</p>
                                <button 
                                    onClick={() => navigate('/health/write')}
                                    className="bg-[#56C08C] text-white font-bold py-2 px-4 rounded-[30px]"
                                >
                                    레시피 작성하기
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyRecipes;