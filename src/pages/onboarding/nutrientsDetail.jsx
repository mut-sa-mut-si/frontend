import React, { useState, useEffect } from 'react';

function NutrientsDetail({ nutrients, setNutrients, onNext, button }) {
    const handleSelect = (vitamin) => {
        setNutrients((prev) => (prev.includes(vitamin) ? prev.filter((item) => item !== vitamin) : [...prev, vitamin]));
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>영양제는 먹을 나이는 없어요</h1>
                <p className='font-bold text-gray-300'>갈 때는 순서가 없어요</p>
            </div>

            <div className='mb-4'>
                <p className='text-xl font-bold mb-4'>어떤 영양제를 복용하고 있으신가요?</p>
                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('vitaminA')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminA')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민A
                    </button>
                    <button
                        onClick={() => handleSelect('lutein')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('lutein')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        루테인
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminB')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminB')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민B
                    </button>
                </div>

                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('milkThistle')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('milkThistle')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        밀크씨슬
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminC')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminC')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민C
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminD')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminD')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민D
                    </button>
                </div>

                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('multivitamin')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('multivitamin')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        종합비타민
                    </button>
                    <button
                        onClick={() => handleSelect('chondroitin')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('chondroitin')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        콘드로이친
                    </button>
                    <button
                        onClick={() => handleSelect('magnesium')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('magnesium')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        마그네슘
                    </button>
                </div>

                <div className='flex font-bold mb-4'>
                    <button
                        onClick={() => handleSelect('omega3')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('omega3')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        오메가3
                    </button>
                    <button
                        onClick={() => handleSelect('lacto')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('lacto')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        유산균
                    </button>
                </div>
            </div>

            <div className='flex justify-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#56C08C] bottom-20 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

export default NutrientsDetail;