import React, { useState, useEffect } from 'react';

// 사진 가져오기
import GRWMCharacter from '../../assets/img/characterImg.png';

// Import component
import Footer from '../../components/footer';


function ChooseRecipe({ onSelectCategory, onNext, selectedCategories }) {
    const [categories, setCategories] = useState(selectedCategories);

    const handleSelect = (category) => {
        setCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
        onSelectCategory(category);
    };

    useEffect(() => {
        setCategories(selectedCategories);
    }, [selectedCategories]);

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className=' text-3xl font-ultrabold mb-2'>관심있는</h1>
                <h1 className=' text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#14AE63]'>레시피</span>를 골라주세요
                </h1>
            </div>

            <div className='flex justify-center items-center mb-10'>
                <button
                    onClick={() => handleSelect('skin')}
                    className={
                        categories.includes('skin')
                            ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                    }
                >
                    피부
                </button>
                <button
                    onClick={() => handleSelect('health')}
                    className={
                        categories.includes('health')
                            ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                    }
                >
                    헬스
                </button>
                <button
                    onClick={() => handleSelect('nutrients')}
                    className={
                        categories.includes('nutrients')
                            ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                    }
                >
                    영양제
                </button>
            </div>

            <div className='flex justify-center items-center'>
                <img src={GRWMCharacter} className='w-65 h-60 mb-3' alt='Character' />
            </div>
            <div className='flex justify-center items-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bottom-60 bg-[#14AE63] text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full hover:bg-[#0E7B46]'
                >
                    다음
                </button>
            </div>
            <div className='flex flex-col flxed items-center justify-between'>
                    <Footer />
                </div>

        </div>
    );
}

export default ChooseRecipe;