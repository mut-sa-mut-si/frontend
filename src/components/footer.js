import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Images
import Footer1 from '../assets/img/footer_recipe.png';
import Footer2 from '../assets/img/footer_search.png';
import Footer3 from '../assets/img/footer_home.png';
import Footer4 from '../assets/img/footer_chat.png';
import Footer5 from '../assets/img/footer_grwm.png';

function Footer() {
    const navigate = useNavigate();

    const handleRecipe = () => {
        navigate(`/recipeList`);
    };

    const handleSearch = () => {
        navigate(`/search`);
    };

    const handleHome = () => {
        navigate(`/main`);
    };

    const handleChat = () => {
        navigate(`/chatroom`);
    };

    const handleMyInform = () => {
        navigate(`/mymain`);
    };

    return (
        <div className='fixed bottom-0 w-[512px] bg-white rounded-[30px]'>
            <footer className='flex justify-around items-center p-4'>
                <button className='flex flex-col items-center w-1/5' onClick={handleRecipe}>
                    <img src={Footer1} alt='Recipe' className='h-8 w-8' />
                    <p className='text-sm font-extrabold mt-1 text-gray-300'>레시피</p>
                </button>
                <button className='flex flex-col items-center w-1/5' onClick={handleSearch}>
                    <img src={Footer2} alt='Search' className='h-8 w-8' />
                    <p className='text-sm font-extrabold mt-1 text-gray-300'>검색</p>
                </button>
                <button className='flex flex-col items-center w-1/5' onClick={handleHome}>
                    <img src={Footer3} alt='Home' className='h-7 w-8' />
                    <p className='text-sm font-extrabold mt-1 text-gray-300'>홈</p>
                </button>
                <button className='flex flex-col items-center w-1/5' onClick={handleChat}>
                    <img src={Footer4} alt='Chat' className='h-8 w-8' />
                    <p className='text-sm font-extrabold mt-1 text-gray-300'>채팅</p>
                </button>
                <button className='flex flex-col items-center w-1/5' onClick={handleMyInform}>
                    <img src={Footer5} alt='MyInfo' className='h-8 w-8' />
                    <p className='text-sm font-extrabold mt-1 text-gray-300'>내정보</p>
                </button>
            </footer>
        </div>
    );
}

export default Footer;
